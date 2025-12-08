from sqlalchemy import Column, Integer, String, Enum, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.db.database import Base
from app.models.enums import TaskStatus, TaskPriority

class Task(Base):
  __tablename__ = "tasks"

  id = Column(Integer, primary_key=True, index=True)
  name = Column(String)
  description = Column(Text)
  status = Column(Enum(TaskStatus), default=TaskStatus.NEW)
  project_id = Column(Integer, ForeignKey("projects.id"))
  assigned_to = Column(Integer, ForeignKey("users.id"), nullable=True)
  created_by = Column(Integer, ForeignKey("users.id"))
  priority = Column(Enum(TaskPriority), default=TaskPriority.LOW)
  deadline = Column(DateTime)
  created_at = Column(DateTime, default=datetime.now(timezone.utc))
  updated_at = Column(DateTime, default=datetime.now(timezone.utc))

  project = relationship("Project", back_populates="tasks")
  author = relationship("User", back_populates="created_tasks", foreign_keys=[created_by])
  assignee = relationship("User", back_populates="assigned_tasks", foreign_keys=[assigned_to])
  comments = relationship("Comment", back_populates="task")
