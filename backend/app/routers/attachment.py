from datetime import datetime, timezone
from typing import Optional
from uuid import UUID

from sqlalchemy.orm import Session
from fastapi import HTTPException, Depends, APIRouter, UploadFile, File, Form
from fastapi.responses import FileResponse

from app.db.database import get_db
from app.models.attachment import Attachment
from app.models.project import Project
from app.models.task import Task
from app.models.user import User
from app.models.enums import UserRole
from app.schemas.attachment import AttachmentOut
from app.storage.file_storage import (
  MAX_ATTACHMENT_BYTES,
  delete_stored,
  new_attachment_key,
  save_bytes,
  resolve_stored_path,
)
from app.routers.user import get_current_user, require_manager_or_admin

router = APIRouter(prefix="/projects", tags=["Attachments"])


def _get_project_or_404(project_id: int, db: Session) -> Project:
  project = db.query(Project).filter(Project.id == project_id).first()
  if not project:
    raise HTTPException(status_code=404, detail="Project not found")
  return project


def _ensure_project_access(project_id: int, user: User, db: Session) -> Project:
  project = _get_project_or_404(project_id, db)
  if user.role in [UserRole.ADMIN, UserRole.MANAGER]:
    return project
  has_task = (
    db.query(Task)
    .filter(Task.project_id == project_id, Task.assigned_to == user.id)
    .first()
  )
  if not has_task:
    raise HTTPException(status_code=403, detail="You don't have permission to access this project")
  return project


@router.post("/{project_id}/attachments", response_model=AttachmentOut)
async def upload_attachment(
  project_id: int,
  file: UploadFile = File(...),
  task_id: Optional[int] = Form(None),
  current_user: User = Depends(require_manager_or_admin),
  db: Session = Depends(get_db),
):
  _get_project_or_404(project_id, db)

  resolved_task_id: Optional[int] = None
  if task_id is not None:
    task = (
      db.query(Task)
      .filter(Task.id == task_id, Task.project_id == project_id)
      .first()
    )
    if not task:
      raise HTTPException(status_code=404, detail="Task not found in this project")
    resolved_task_id = task.id

  data = await file.read()
  if len(data) > MAX_ATTACHMENT_BYTES:
    raise HTTPException(status_code=400, detail="File too large")

  original_name = file.filename or "file"
  rel_key = new_attachment_key(project_id, resolved_task_id, original_name)
  save_bytes(rel_key, data)

  att = Attachment(
    task_id=resolved_task_id,
    project_id=project_id,
    uploader_id=current_user.id,
    original_name=original_name,
    content_type=file.content_type,
    size=len(data),
    storage_path=rel_key,
  )
  db.add(att)
  db.commit()
  db.refresh(att)
  return att


@router.get("/{project_id}/attachments", response_model=list[AttachmentOut])
def list_attachments(
  project_id: int,
  task_id: Optional[int] = None,
  current_user: User = Depends(get_current_user),
  db: Session = Depends(get_db),
):
  _ensure_project_access(project_id, current_user, db)
  q = db.query(Attachment).filter(Attachment.project_id == project_id)
  if task_id is not None:
    q = q.filter(Attachment.task_id == task_id)
  return q.order_by(Attachment.created_at.desc()).all()


@router.get("/{project_id}/attachments/{attachment_id}/file")
def download_attachment_file(
  project_id: int,
  attachment_id: UUID,
  current_user: User = Depends(get_current_user),
  db: Session = Depends(get_db),
):
  _ensure_project_access(project_id, current_user, db)
  att = (
    db.query(Attachment)
    .filter(Attachment.id == attachment_id, Attachment.project_id == project_id)
    .first()
  )
  if not att:
    raise HTTPException(status_code=404, detail="Attachment not found")

  path = resolve_stored_path(att.storage_path)
  if not path.is_file():
    raise HTTPException(status_code=404, detail="File missing on server")

  return FileResponse(
    path=path,
    media_type=att.content_type or "application/octet-stream",
    filename=att.original_name,
  )


@router.delete("/{project_id}/attachments/{attachment_id}")
def delete_attachment(
  project_id: int,
  attachment_id: UUID,
  current_user: User = Depends(require_manager_or_admin),
  db: Session = Depends(get_db),
):
  _get_project_or_404(project_id, db)
  att = (
    db.query(Attachment)
    .filter(Attachment.id == attachment_id, Attachment.project_id == project_id)
    .first()
  )
  if not att:
    raise HTTPException(status_code=404, detail="Attachment not found")

  storage_path = att.storage_path
  db.delete(att)
  db.commit()
  delete_stored(storage_path)
  return {"detail": "Attachment deleted"}
