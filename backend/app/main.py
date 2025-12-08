from fastapi import FastAPI
from app.db.database import Base, engine
from app.routers import user, auth, project, task, comment, enums

app = FastAPI(title="Silvester backend")

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