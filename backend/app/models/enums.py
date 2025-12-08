from enum import Enum

class ProjectStatus(str, Enum):
  NEW = "new"
  IN_PROGRESS = "in_progress"
  COMPLETED = "completed"

  @property
  def label(self) -> str:
    labels = {
      ProjectStatus.NEW: "Новый",
      ProjectStatus.IN_PROGRESS: "В работе",
      ProjectStatus.COMPLETED: "Завершен",
    }
    return labels.get(self, self.value)
    

class UserRole(str, Enum):
  ADMIN = "admin"
  USER = "user"
  MANAGER = "manager"

  @property
  def label(self) -> str:
    labels = {
      UserRole.ADMIN: "Администратор",
      UserRole.USER: "Пользователь",
      UserRole.MANAGER: "Менеджер",
    }
    return labels.get(self, self.value)


class TaskStatus(str, Enum):
  NEW = "new"
  IN_PROGRESS = "in_progress"
  WAITING_RESOURCES = "waiting_resources"
  REVIEW = "review"
  COMPLETED = "completed"

  @property
  def label(self) -> str:
    labels = {
      TaskStatus.NEW: "Новый",
      TaskStatus.IN_PROGRESS: "В работе",
      TaskStatus.WAITING_RESOURCES: "Ожидание ресурсов",
      TaskStatus.REVIEW: "На проверке",
      TaskStatus.COMPLETED: "Завершен",
    }
    return labels.get(self, self.value)


class TaskPriority(str, Enum):
  LOW = "low"
  MEDIUM = "medium"
  HIGH = "high"