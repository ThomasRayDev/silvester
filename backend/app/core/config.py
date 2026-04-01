from pydantic_settings import BaseSettings

class Settings(BaseSettings):
  database_url: str

  root_path: str

  """Каталог для загрузок (относительно рабочей директории процесса или абсолютный путь)."""
  upload_dir: str = "uploads"

  secret_key: str
  algorithm: str = "HS256"
  access_token_expire_minutes: int = 60
  refresh_token_expire_days: int = 30

  cookie_secure: bool = False
  cookie_samesite: str = "lax"

  class Config:
    env_file = ".env"
    case_sensitive = False
  
settings = Settings()
