from fastapi import APIRouter
from app.schemas.enums import StatusInfo, get_project_statuses, get_task_statuses, RoleInfo, get_user_roles

router = APIRouter(prefix="/enums", tags=["Enums"])

@router.get("/projects", response_model=list[StatusInfo])
def get_project_statuses_endpoint():
    return get_project_statuses()

@router.get("/tasks", response_model=list[StatusInfo])
def get_task_statuses_endpoint():
    return get_task_statuses()

@router.get("/roles", response_model=list[RoleInfo])
def get_user_roles_endpoint():
    return get_user_roles()