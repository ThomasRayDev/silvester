"""
Скрипт для создания суперпользователя (администратора) в базе данных.
Запуск: python -m app.db.create_superuser
"""
import sys
from pathlib import Path

# Добавляем корневую директорию проекта в путь
project_root = Path(__file__).parent.parent.parent.parent
sys.path.insert(0, str(project_root))

from sqlalchemy.orm import Session
from datetime import datetime, timezone
from app.db.database import SessionLocal
from app.models.user import User
from app.models.enums import UserRole
from app.core.security import hash_password


def create_superuser(
    email: str = "admin@example.com",
    username: str = "admin",
    password: str = "admin123"
):
    """
    Создает суперпользователя с административными правами.
    
    Args:
        email: Email адрес администратора
        username: Имя пользователя
        password: Пароль администратора
    """
    db: Session = SessionLocal()
    try:
        # Проверка существования пользователя с таким email
        existing_user_by_email = db.query(User).filter(User.email == email).first()
        if existing_user_by_email:
            print(f"❌ Пользователь с email '{email}' уже существует!")
            return False
        
        # Проверка существования пользователя с таким username
        if username:
            existing_user_by_username = db.query(User).filter(User.username == username).first()
            if existing_user_by_username:
                print(f"❌ Пользователь с username '{username}' уже существует!")
                return False
        
        # Создание нового пользователя-администратора
        admin_user = User(
            username=username,
            email=email,
            password_hash=hash_password(password),
            role=UserRole.ADMIN,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        )
        
        db.add(admin_user)
        db.commit()
        db.refresh(admin_user)
        
        print(f"✅ Суперпользователь успешно создан!")
        print(f"   ID: {admin_user.id}")
        print(f"   Email: {admin_user.email}")
        print(f"   Username: {admin_user.username}")
        print(f"   Role: {admin_user.role.value}")
        
        return True
        
    except Exception as e:
        db.rollback()
        print(f"❌ Ошибка при создании суперпользователя: {e}")
        return False
    finally:
        db.close()


if __name__ == "__main__":
    print("=" * 50)
    print("Создание суперпользователя (администратора)")
    print("=" * 50)
    
    # Можно изменить значения по умолчанию или сделать интерактивный ввод
    email = input("Введите email (по умолчанию: admin@example.com): ").strip() or "admin@example.com"
    username = input("Введите username (по умолчанию: admin): ").strip() or "admin"
    password = input("Введите пароль (по умолчанию: admin123): ").strip() or "admin123"
    
    print()
    create_superuser(email=email, username=username, password=password)

