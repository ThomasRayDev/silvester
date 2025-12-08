from datetime import datetime
from pydantic import BaseModel
from typing import Optional

from app.models.enums import ProjectStatus
from app.schemas.user import UserOut

class ProjectBase(BaseModel):
  name: str
  description: str
  start_date: datetime
  end_date: datetime
  status: ProjectStatus

class ProjectUpdate(BaseModel):
  name: Optional[str] = None
  description: Optional[str] = None
  start_date: Optional[datetime] = None
  end_date: Optional[datetime] = None
  status: Optional[ProjectStatus] = None

class ProjectOut(ProjectBase):
  id: int
  author: UserOut
  created_at: datetime
  updated_at: datetime

  class Config:
    from_attributes = True
