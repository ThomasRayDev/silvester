from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from fastapi import HTTPException, Depends, APIRouter
from datetime import datetime, timezone
from app.core.security import decode_access_token
from app.core.config import settings
from app.models.enums import UserRole
from app.core.security import hash_password
from app.db.database import get_db

from app.models.user import User
from app.schemas.user import UserOut, UserCreate, UserUpdate

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.root_path}/auth/login")
router = APIRouter(prefix="/users", tags=["Users"])

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
  username = decode_access_token(token)
  if username is None:
    raise HTTPException(status_code=401, detail="Invalid token")
  user = db.query(User).filter(User.username == username).first()
  if not user:
    raise HTTPException(status_code=401, detail="User not found")
  return user

def require_manager_or_admin(current_user: User = Depends(get_current_user)):
  """Зависимость для проверки, что пользователь имеет роль manager или admin"""
  if current_user.role not in [UserRole.MANAGER, UserRole.ADMIN]:
    raise HTTPException(
      status_code=403,
      detail="Only managers and admins can perform this action"
    )
  return current_user

def require_admin(current_user: User = Depends(get_current_user)):
  """Зависимость для проверки, что пользователь имеет роль admin"""
  if current_user.role != UserRole.ADMIN:
    raise HTTPException(
      status_code=403,
      detail="Only admins can perform this action"
    )
  return current_user

@router.get("/", response_model=list[UserOut])
def get_all_users(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
  users = db.query(User).all()
  return users

@router.get("/me", response_model=UserOut)
def read_current_user(current_user: User = Depends(get_current_user)):
  return current_user

@router.post("/", response_model=UserOut)
def create_user(user: UserCreate, current_admin: User = Depends(require_admin), db: Session = Depends(get_db)):
  """Создание учетной записи пользователя администратором"""
  # Проверка уникальности username
  existing_username = db.query(User).filter(User.username == user.username).first()
  if existing_username:
    raise HTTPException(status_code=400, detail="Username already exists")
  
  # Проверка уникальности email
  existing_email = db.query(User).filter(User.email == user.email).first()
  if existing_email:
    raise HTTPException(status_code=400, detail="Email already exists")
  
  db_user = User(
    username=user.username,
    email=user.email,
    password_hash=hash_password(user.password),
    role=user.role
  )
  db.add(db_user)
  db.commit()
  db.refresh(db_user)
  return db_user

@router.put("/{user_id}", response_model=UserOut)
def update_user(user_id: int, user_update: UserUpdate, current_admin: User = Depends(require_admin), db: Session = Depends(get_db)):
  """Редактирование учетной записи пользователя администратором"""
  db_user = db.query(User).filter(User.id == user_id).first()
  if not db_user:
    raise HTTPException(status_code=404, detail="User not found")
  
  update_data = user_update.model_dump(exclude_unset=True)
  
  # Проверка уникальности username, если он изменяется
  if "username" in update_data and update_data["username"] != db_user.username:
    existing_username = db.query(User).filter(User.username == update_data["username"]).first()
    if existing_username:
      raise HTTPException(status_code=400, detail="Username already exists")
  
  # Проверка уникальности email, если он изменяется
  if "email" in update_data and update_data["email"] != db_user.email:
    existing_email = db.query(User).filter(User.email == update_data["email"]).first()
    if existing_email:
      raise HTTPException(status_code=400, detail="Email already exists")
  
  # Хеширование пароля, если он изменяется
  if "password" in update_data:
    update_data["password_hash"] = hash_password(update_data.pop("password"))
  
  # Обновление полей
  for key, value in update_data.items():
    setattr(db_user, key, value)
  
  db_user.updated_at = datetime.now(timezone.utc)
  db.commit()
  db.refresh(db_user)
  return db_user
