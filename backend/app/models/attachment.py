import uuid
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, BigInteger
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.db.database import Base
from app.utils.datetime import utcnow


class Attachment(Base):
    __tablename__ = "attachments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    task_id = Column(Integer, ForeignKey("tasks.id", ondelete="CASCADE"), nullable=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=True, index=True)
    uploader_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)

    original_name = Column(String, nullable=False)
    content_type = Column(String, nullable=True)
    size = Column(BigInteger, nullable=False)

    storage_path = Column(String, nullable=False, unique=True)

    created_at = Column(DateTime, default=utcnow, nullable=False)

    task = relationship("Task", back_populates="attachments")
    project = relationship("Project", back_populates="attachments")
    uploader = relationship("User")
