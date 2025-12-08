from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from app.models.enums import UserRole

class UserBase(BaseModel):
  username: str
  email: str

class UserCreate(UserBase):
  password: str
  role: UserRole = UserRole.USER

class UserUpdate(BaseModel):
  username: Optional[str] = None
  email: Optional[str] = None
  password: Optional[str] = None
  role: Optional[UserRole] = None

class UserOut(UserBase):
  id: int
  role: UserRole
  created_at: datetime
  updated_at: datetime

  class Config:
    from_attributes = True