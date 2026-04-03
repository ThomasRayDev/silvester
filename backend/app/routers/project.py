from datetime import datetime, timezone
from sqlalchemy.orm import Session
from fastapi import HTTPException, Depends, APIRouter

from app.db.database import get_db

from app.models.project import Project
from app.models.task import Task
from app.models.user import User
from app.models.enums import UserRole
from app.models.project_members import project_members
from app.schemas.project import ProjectBase, ProjectOut, ProjectUpdate
from app.routers.user import get_current_user, require_manager_or_admin

router = APIRouter(prefix="/projects", tags=["Projects"])

@router.get("/", response_model=list[ProjectOut])
def get_projects(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
  if current_user.role in [UserRole.ADMIN, UserRole.MANAGER]:
    projects = db.query(Project).all()
  else:
    from_tasks = {
      pid for (pid,) in db.query(Task.project_id)
      .filter(Task.assigned_to == current_user.id)
      .distinct()
    }
    from_team = {
      pid for (pid,) in db.query(project_members.c.project_id)
      .filter(project_members.c.user_id == current_user.id)
      .distinct()
    }
    allowed_ids = from_tasks | from_team
    if not allowed_ids:
      projects = []
    else:
      projects = db.query(Project).filter(Project.id.in_(allowed_ids)).all()
  return projects

@router.get("/{project_id}", response_model=ProjectOut)
def get_one_project(project_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
  db_project = db.query(Project).filter(Project.id == project_id).first()
  if not db_project:
    raise HTTPException(status_code=404, detail="Project not found")
  if current_user.role not in [UserRole.ADMIN, UserRole.MANAGER]:
    has_assigned_tasks = db.query(Task).filter(
      Task.project_id == project_id,
      Task.assigned_to == current_user.id
    ).first()
    in_team = db.query(project_members).filter(
      project_members.c.project_id == project_id,
      project_members.c.user_id == current_user.id,
    ).first()
    if not has_assigned_tasks and not in_team:
      raise HTTPException(status_code=403, detail="You don't have permission to access this project")
  return db_project

@router.post("/", response_model=ProjectOut)
def create_project(project: ProjectBase, current_user: User = Depends(require_manager_or_admin), db: Session = Depends(get_db)):
  db_project = Project(
    name=project.name,
    description=project.description,
    start_date=project.start_date,
    end_date=project.end_date,
    status=project.status,
    author_id=current_user.id,
    address=project.address.model_dump(),
    budget=project.budget,
    spent_budget=0,
    progress=0,
  )
  if project.team:
    users = db.query(User).filter(User.id.in_(project.team)).all()
    db_project.team = users
  db.add(db_project)
  db.commit()
  db.refresh(db_project)
  return db_project

@router.put("/{project_id}", response_model=ProjectOut)
def edit_project(project_id: int, project: ProjectUpdate, current_user: User = Depends(require_manager_or_admin), db: Session = Depends(get_db)):
  db_project = db.query(Project).filter(Project.id == project_id).first()
  if not db_project:
    raise HTTPException(status_code=404, detail="Project not found")
  # Админы могут редактировать все проекты, менеджеры - только свои
  if current_user.role != UserRole.ADMIN and db_project.author_id != current_user.id:
    raise HTTPException(status_code=403, detail="You don't have permission to edit this project")
  update_data = project.model_dump(exclude_unset=True)
  for key, value in update_data.items():
    if key == "team":
      users = db.query(User).filter(User.id.in_(value)).all() if value else []
      db_project.team = users
    elif key == "address":
      db_project.address = value
    else:
      setattr(db_project, key, value)
  db_project.updated_at = datetime.now(timezone.utc)
  db.commit()
  db.refresh(db_project)
  return db_project

# @router.delete("/{project_id}")
# def delete_project(project_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
#   db_project = db.query(Project).filter(Project.id == project_id).first()
#   if not db_project:
#     raise HTTPException(status_code=404, detail="Project not found")
  
#   db.delete(db_project)
#   db.commit()
#   return { "detail": "Project deleted" }
