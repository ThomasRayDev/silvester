from fastapi import APIRouter, Depends, HTTPException, Response, Request
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from datetime import datetime, timezone
from app.db.database import get_db
from app.models.user import User
from app.schemas.user import UserOut, UserCreate, UserUpdate
from app.core.security import hash_password, verify_password, create_access_token, create_refresh_token, decode_access_token
from app.core.config import settings
from app.routers.user import require_admin

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post('/login')
def login(response: Response, form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
  user = db.query(User).filter(User.username == form_data.username).first()
  if not user or not verify_password(form_data.password, user.password_hash):
    raise HTTPException(status_code=401, detail="Invalid credentials")
  
  access_token = create_access_token(data={ "sub": user.username })
  refresh_token = create_refresh_token(data={ "sub": user.username })

  response.set_cookie(
    key="refresh_token",
    value=refresh_token,
    httponly=True,
    secure=settings.cookie_secure,
    samesite=settings.cookie_samesite,
    max_age=60*60*24*settings.refresh_token_expire_days
  )
  return { "access_token": access_token, "token_type": "bearer" }

@router.post('/refresh')
def refresh_token(request: Request):
  refresh_token = request.cookies.get("refresh_token")
  if not refresh_token:
    raise HTTPException(401, "No refresh token")
  try:
    username = decode_access_token(refresh_token)
  except:
    raise HTTPException(401, "Invalid refresh token")
  new_access = create_access_token(data={ "sub": username })
  return { "access_token": new_access, "token_type": "bearer" }