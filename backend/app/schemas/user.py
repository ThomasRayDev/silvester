from pydantic import BaseModel, computed_field
from datetime import datetime
from typing import Optional
from app.models.enums import UserRole
from app.core.config import settings

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
  avatar_path: Optional[str] = None
  avatar_content_type: Optional[str] = None
  password_updated: datetime
  created_at: datetime
  updated_at: datetime

  @computed_field
  @property
  def avatar_url(self) -> str | None:
    if not self.avatar_path:
      return None
    base = settings.root_path.rstrip("/")
    return f"{base}/users/{self.id}/avatar?v={self.updated_at.isoformat()}"

  class Config:
    from_attributes = True