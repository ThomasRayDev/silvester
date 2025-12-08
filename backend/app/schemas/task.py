from datetime import datetime
from pydantic import BaseModel
from typing import Optional

from app.models.enums import TaskStatus, TaskPriority
from app.schemas.user import UserOut

class TaskBase(BaseModel):
  name: str
  description: str
  status: TaskStatus
  assigned_to: Optional[int] = None
  priority: TaskPriority
  deadline: datetime

class TaskUpdate(BaseModel):
  name: Optional[str] = None
  description: Optional[str] = None
  status: Optional[TaskStatus] = None
  assigned_to: Optional[int] = None
  priority: Optional[TaskPriority] = None
  deadline: Optional[datetime] = None

class TaskOut(TaskBase):
  id: int
  project_id: int
  author: UserOut
  assignee: Optional[UserOut] = None
  created_at: datetime
  updated_at: datetime
