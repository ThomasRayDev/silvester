from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, ConfigDict, computed_field

from app.core.config import settings


class AttachmentOut(BaseModel):
  model_config = ConfigDict(from_attributes=True)

  id: UUID
  original_name: str
  content_type: Optional[str] = None
  size: int
  task_id: Optional[int] = None
  project_id: Optional[int] = None
  uploader_id: Optional[int] = None
  created_at: datetime

  @computed_field
  @property
  def download_url(self) -> str:
    base = settings.root_path.rstrip("/")
    pid = self.project_id
    if pid is None:
      return ""
    return f"{base}/projects/{pid}/attachments/{self.id}/file"
