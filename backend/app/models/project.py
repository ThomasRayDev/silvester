from sqlalchemy import Column, Integer, String, Enum, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.db.database import Base
from app.models.enums import ProjectStatus

class Project(Base):
  __tablename__ = 'projects'

  id = Column(Integer, primary_key=True, index=True)
  name = Column(String)
  description = Column(String)
  start_date = Column(DateTime)
  end_date = Column(DateTime)
  status = Column(Enum(ProjectStatus), default=ProjectStatus.NEW)
  author_id = Column(Integer, ForeignKey("users.id"))
  created_at = Column(DateTime, default=datetime.now(timezone.utc))
  updated_at = Column(DateTime, default=datetime.now(timezone.utc))

  author = relationship("User", back_populates="projects")
  tasks = relationship("Task", back_populates="project")