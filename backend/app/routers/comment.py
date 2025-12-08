from datetime import datetime, timezone
from sqlalchemy.orm import Session
from fastapi import HTTPException, Depends, APIRouter

from app.db.database import get_db

from app.models.task import Task
from app.models.project import Project
from app.models.user import User
from app.models.comment import Comment
from app.schemas.comment import CommentBase, CommentOut
from app.routers.user import get_current_user

router = APIRouter(prefix="/projects", tags=["Comments"])

@router.get("/{project_id}/tasks/{task_id}/comments", response_model=list[CommentOut])
def get_comments(project_id: int, task_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
  db_project = db.query(Project).filter(Project.id == project_id).first()
  db_task = db.query(Task).filter(Task.id == task_id).first()
  if not db_project or not db_task:
    raise HTTPException(status_code=404, detail="Task not found")
  return db_task.comments

@router.post("/{project_id}/tasks/{task_id}/comments", response_model=CommentOut)
def create_comment(project_id: int, task_id: int, comment: CommentBase, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
  db_project = db.query(Project).filter(Project.id == project_id).first()
  db_task = db.query(Task).filter(Task.id == task_id).first()
  if not db_project or not db_task:
    raise HTTPException(status_code=404, detail="Task not found")
  db_comment = Comment(
    task_id=db_task.id,
    author_id=current_user.id,
    text=comment.text
  )
  db.add(db_comment)
  db.commit()
  db.refresh(db_comment)
  return db_comment

@router.put("/{project_id}/tasks/{task_id}/comments/{comment_id}", response_model=CommentOut)
def edit_comment(project_id: int, task_id: int, comment_id: int, comment: CommentBase, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
  db_project = db.query(Project).filter(Project.id == project_id).first()
  db_task = db.query(Task).filter(Task.id == task_id).first()
  db_comment = db.query(Comment).filter(Comment.id == comment_id).first()
  if not db_project or not db_task or not db_comment:
    raise HTTPException(status_code=404, detail="Comment not found")
  if db_comment.task_id != task_id:
    raise HTTPException(status_code=404, detail="Comment not found in this task")
  if db_comment.author_id != current_user.id:
    raise HTTPException(status_code=403, detail="You don't have permission to edit this comment")
  db_comment.text = comment.text
  db_comment.updated_at = datetime.now(timezone.utc)
  db.commit()
  db.refresh(db_comment)
  return db_comment

@router.delete("/{project_id}/tasks/{task_id}/comments/{comment_id}")
def delete_comment(project_id: int, task_id: int, comment_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
  db_project = db.query(Project).filter(Project.id == project_id).first()
  db_task = db.query(Task).filter(Task.id == task_id).first()
  db_comment = db.query(Comment).filter(Comment.id == comment_id).first()
  if not db_project or not db_task or not db_comment:
    raise HTTPException(status_code=404, detail="Comment not found")
  if db_comment.task_id != task_id:
    raise HTTPException(status_code=404, detail="Comment not found in this task")
  if db_comment.author_id != current_user.id:
    raise HTTPException(status_code=403, detail="You don't have permission to delete this comment")
  db.delete(db_comment)
  db.commit()
  return { "detail": "Comment deleted" }
