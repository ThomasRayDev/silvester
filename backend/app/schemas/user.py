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
  firstname: str
  secondname: str
  position: str

class UserUpdate(BaseModel):
  username: Optional[str] = None
  firstname: Optional[str] = None
  secondname: Optional[str] = None
  position: Optional[str] = None
  email: Optional[str] = None
  password: Optional[str] = None
  role: Optional[UserRole] = None

class UserChangePassword(BaseModel):
  old_password: str
  new_password: str

class UserOut(UserBase):
  id: int
  firstname: str
  secondname: str
  position: str
  role: UserRole
  password_updated: datetime
  created_at: datetime
  updated_at: datetime

  class Config:
    from_attributes = True