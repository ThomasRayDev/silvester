from datetime import datetime
from pydantic import BaseModel

from app.schemas.user import UserOut

class CommentBase(BaseModel):
  text: str

class CommentOut(CommentBase):
  id: int
  task_id: int
  author: UserOut
  created_at: datetime
  updated_at: datetime
