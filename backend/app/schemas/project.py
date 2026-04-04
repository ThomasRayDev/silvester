from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional, List

from app.models.enums import ProjectStatus
from app.schemas.user import UserOut

class Address(BaseModel):
  city: Optional[str] = None
  street: Optional[str] = None
  house: Optional[str] = None
  apartment: Optional[str] = None

class ProjectBase(BaseModel):
  name: str
  description: str
  address: Optional[Address] = None
  budget: int
  team: Optional[List[int]] = Field(default_factory=list)
  start_date: datetime
  end_date: datetime
  status: ProjectStatus

class ProjectUpdate(BaseModel):
  name: Optional[str] = None
  description: Optional[str] = None
  budget: Optional[int] = None
  address: Optional[Address] = None
  team: Optional[List[int]] = None
  start_date: Optional[datetime] = None
  end_date: Optional[datetime] = None
  status: Optional[ProjectStatus] = None

class ProjectOut(ProjectBase):
  id: int
  author: UserOut
  spent_budget: int
  progress: float
  team: List[UserOut]
  created_at: datetime
  updated_at: datetime

  class Config:
    from_attributes = True
