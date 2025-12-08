from sqlalchemy import Column, Integer, String, DateTime, Enum
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.db.database import Base
from app.models.enums import UserRole

class User(Base):
  __tablename__ = "users"

  id = Column(Integer, primary_key=True, index=True)
  username = Column(String, unique=True, nullable=True)
  email = Column(String, unique=True, nullable=False)
  password_hash = Column(String, nullable=False)
  role = Column(Enum(UserRole, values_callable=lambda x: [e.value for e in x], name='userrole'), default=UserRole.USER)
  created_at = Column(DateTime, default=datetime.now(timezone.utc))
  updated_at = Column(DateTime, default=datetime.now(timezone.utc))

  projects = relationship("Project", back_populates="author")
  created_tasks = relationship("Task", back_populates="author", foreign_keys="[Task.created_by]")
  assigned_tasks = relationship("Task", back_populates="assignee", foreign_keys="[Task.assigned_to]")
  comments = relationship("Comment", back_populates="author")