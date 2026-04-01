import re
import uuid
from pathlib import Path

from app.core.config import settings

MAX_AVATAR_BYTES = 5 * 1024 * 1024
MAX_ATTACHMENT_BYTES = 25 * 1024 * 1024

ALLOWED_AVATAR_CONTENT_TYPES = frozenset({"image/jpeg", "image/png", "image/webp"})


def upload_root() -> Path:
  return Path(settings.upload_dir).resolve()


def save_bytes(rel_key: str, data: bytes) -> None:
  path = upload_root() / rel_key
  path.parent.mkdir(parents=True, exist_ok=True)
  path.write_bytes(data)


def delete_stored(rel_key: str | None) -> None:
  if not rel_key:
    return
  p = upload_root() / rel_key
  if p.is_file():
    p.unlink()


def safe_filename_suffix(original_name: str) -> str:
  ext = Path(original_name).suffix.lower()
  if ext and re.match(r"^\.[a-z0-9]{1,10}$", ext):
    return ext
  return ""


def new_avatar_key(user_id: int, content_type: str) -> str:
  ext_map = {"image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp"}
  ext = ext_map.get(content_type, ".bin")
  return f"avatars/{user_id}/{uuid.uuid4().hex}{ext}"


def new_attachment_key(project_id: int, task_id: int | None, original_name: str) -> str:
  suf = safe_filename_suffix(original_name)
  uid = uuid.uuid4().hex
  if task_id is not None:
    return f"attachments/tasks/{task_id}/{uid}{suf}"
  return f"attachments/projects/{project_id}/{uid}{suf}"


def resolve_stored_path(rel_key: str) -> Path:
  return upload_root() / rel_key
