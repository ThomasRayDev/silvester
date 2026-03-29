from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.db.database import Base
from utils.datetime import utcnow

class Comment(Base):
  __tablename__ = "comments"

  id = Column(Integer, primary_key=True, index=True)
  task_id = Column(Integer, ForeignKey("tasks.id"))
  author_id = Column(Integer, ForeignKey("users.id"))
  text = Column(String, nullable=False)
  created_at = Column(DateTime, default=utcnow)
  updated_at = Column(DateTime, default=utcnow, onupdate=utcnow)

  task = relationship("Task", back_populates="comments")
  author = relationship("User", back_populates="comments")