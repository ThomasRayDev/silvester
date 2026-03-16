from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import Base, engine
from app.core.config import settings
from app.routers import user, auth, project, task, comment, enums

app = FastAPI(title="Silvester backend", root_path=settings.root_path)

origins = [
  "http://localhost:5173",
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(user.router)
app.include_router(auth.router)
app.include_router(project.router)
app.include_router(task.router)
app.include_router(comment.router)
app.include_router(enums.router)

@app.get('/')
def read_root():
  return { "message": "раззъезд чушпаны" }
