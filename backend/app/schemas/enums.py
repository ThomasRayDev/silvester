from pydantic import BaseModel
from app.models.enums import ProjectStatus, TaskStatus, UserRole

class StatusInfo(BaseModel):
    value: str
    label: str


class RoleInfo(BaseModel):
    value: str
    label: str


def get_user_roles() -> list[RoleInfo]:
    return [
        RoleInfo(
            value=role.value,
            label=role.label
        )
        for role in UserRole
    ]

def get_project_statuses() -> list[StatusInfo]:
    return [
        StatusInfo(
            value=status.value,
            label=status.label
        )
        for status in ProjectStatus
    ]

def get_task_statuses() -> list[StatusInfo]:
    return [
        StatusInfo(
            value=status.value,
            label=status.label
        )
        for status in TaskStatus
    ]