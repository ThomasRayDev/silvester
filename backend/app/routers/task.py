from datetime import datetime, timezone
from sqlalchemy.orm import Session
from fastapi import HTTPException, Depends, APIRouter

from app.db.database import get_db

from app.models.task import Task
from app.models.project import Project
from app.models.user import User
from app.models.enums import UserRole
from app.schemas.task import TaskBase, TaskOut, TaskUpdate
from app.routers.user import get_current_user, require_manager_or_admin

router = APIRouter(prefix="/projects", tags=["Tasks"])

@router.get("/{project_id}/tasks", response_model=list[TaskOut])
def get_tasks(project_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
  project = db.query(Project).filter(Project.id == project_id).first()
  if not project:
    raise HTTPException(status_code=404, detail="Project not found")
  if current_user.role not in [UserRole.ADMIN, UserRole.MANAGER]:
    has_access = db.query(Task).filter(
      Task.project_id == project_id,
      Task.assigned_to == current_user.id
    ).first()
    if not has_access:
      raise HTTPException(status_code=403, detail="You don't have permission to access this project")
  if current_user.role in [UserRole.ADMIN, UserRole.MANAGER]:
    tasks = project.tasks
  else:
    tasks = db.query(Task).filter(
      Task.project_id == project_id,
      Task.assigned_to == current_user.id
    ).all()
  return tasks

@router.get("/{project_id}/tasks/{task_id}", response_model=TaskOut)
def get_one_task(project_id: int, task_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
  db_project = db.query(Project).filter(Project.id == project_id).first()
  db_task = db.query(Task).filter(Task.id == task_id).first()
  if not db_project or not db_task:
    raise HTTPException(status_code=404, detail="Task not found")
  if db_task.project_id != project_id:
    raise HTTPException(status_code=404, detail="Task not found in this project")
  if current_user.role not in [UserRole.ADMIN, UserRole.MANAGER] and db_task.assigned_to != current_user.id:
    raise HTTPException(status_code=403, detail="You don't have permission to access this task")
  return db_task

@router.post("/{project_id}/tasks", response_model=TaskOut)
def create_task(project_id: int, task: TaskBase, current_user: User = Depends(require_manager_or_admin), db: Session = Depends(get_db)):
  project = db.query(Project).filter(Project.id == project_id).first()
  if not project:
    raise HTTPException(status_code=404, detail="Project not found")
  db_task = Task(
    name=task.name,
    description=task.description,
    status=task.status,
    project_id=project_id,
    assigned_to=task.assigned_to,
    created_by=current_user.id,
    priority=task.priority,
    deadline=task.deadline
  )
  db.add(db_task)
  db.commit()
  db.refresh(db_task)
  return db_task

@router.put("/{project_id}/tasks/{task_id}", response_model=TaskOut)
def edit_task(project_id: int, task_id: int, task: TaskUpdate, current_user: User = Depends(require_manager_or_admin), db: Session = Depends(get_db)):
  db_project = db.query(Project).filter(Project.id == project_id).first()
  db_task = db.query(Task).filter(Task.id == task_id).first()
  if not db_project or not db_task:
    raise HTTPException(status_code=404, detail="Task not found")
  if db_task.project_id != project_id:
    raise HTTPException(status_code=404, detail="Task not found in this project")
  # Админы могут редактировать все задачи, менеджеры - только свои
  if current_user.role != UserRole.ADMIN and db_task.created_by != current_user.id:
    raise HTTPException(status_code=403, detail="You don't have permission to edit this task")
  update_data = task.model_dump(exclude_unset=True)
  for key, value in update_data.items():
    setattr(db_task, key, value)
  db_task.updated_at = datetime.now(timezone.utc)
  db.commit()
  db.refresh(db_task)
  return db_task
