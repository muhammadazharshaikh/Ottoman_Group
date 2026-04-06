from sqlalchemy.orm import Session
from src.projects.schema import ProjectSchema
from src.projects.model import Projects
from src.users.model import UserModel
from fastapi import HTTPException
from datetime import datetime
from sqlalchemy.orm import joinedload

# create project
def create_project(body:ProjectSchema, db:Session, user:UserModel):
    new_project = Projects(
    name = body.name,
    location = body.location,
    totalFlats = body.totalFlats,
    totalFloors = body.totalFloors,
    description = body.description,
    createdBy = user.userId
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return new_project

# edit project
def update_project(project_id:int, body:ProjectSchema, db:Session, user:UserModel):
    project = db.query(Projects).filter(Projects.id == project_id).first()
    if not project:
        raise HTTPException(404, "Project Not Found!")
    
    data = body.model_dump()
    for field, value in data.items():
        setattr(project, field, value)

    db.add(project)
    db.commit()
    db.refresh(project)
    return project

# delete project
def delete_project(project_id:int, db:Session, user:UserModel):
    project = db.query(Projects).filter(Projects.id == project_id).first()
    if not project:
        raise HTTPException(404, detail="Project Not Found!")
    project.status = False
    project.deletedAt = datetime.now()
    db.add(project)
    db.commit()
    db.refresh(project)
    return {"msg":"Project Deleted Successfully"}

# Get Project By ID
def get_project_by_id(project_id:int, db:Session, user:UserModel):
    project = db.query(Projects).filter(Projects.id == project_id).options(joinedload(Projects.creator)).first()
    if not project:
        raise HTTPException(404, detail="Project Not Found!")
    return project

# get all projects
def get_all_projects(db:Session, user:UserModel):
    projects = db.query(Projects).filter(Projects.status == True).options(joinedload(Projects.creator)).all()
    return projects
