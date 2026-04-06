from fastapi import APIRouter, status
from src.projects.model import Projects
from src.projects.schema import ProjectResponseSchema, ProjectSchema
from src.utils.db import get_db
from sqlalchemy.orm import Session
from fastapi import Depends
from src.projects import controller
from src.utils.helper_methods import is_auth
from src.users.model import UserModel

project_routes = APIRouter(prefix='/projects')

# create project
@project_routes.post('/create', status_code=status.HTTP_201_CREATED, response_model=ProjectResponseSchema)
def create_project(body:ProjectSchema, db:Session=Depends(get_db), user:UserModel=Depends(is_auth)):    
    return controller.create_project(body, db, user)

# edit project
@project_routes.put("/update/{project_id}", status_code=status.HTTP_200_OK, response_model=ProjectResponseSchema)
def update_project(project_id:int, body:ProjectSchema, db:Session=Depends(get_db), user:UserModel=Depends(is_auth)):
    return controller.update_project(project_id, body, db, user)

# delete project
@project_routes.delete("/delete/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(project_id:int, db:Session=Depends(get_db), user:UserModel=Depends(is_auth)):
    return controller.delete_project(project_id, db, user)

# get project by id
@project_routes.get("/project/{project_id}", status_code=status.HTTP_200_OK, response_model=ProjectResponseSchema)
def get_project_by_id(project_id:int, db:Session=Depends(get_db), user:UserModel=Depends(is_auth)):
    return controller.get_project_by_id(project_id, db, user)

# get all projects
@project_routes.get("/all", status_code=status.HTTP_200_OK, response_model=list[ProjectResponseSchema])
def get_all_project(db:Session=Depends(get_db), user:UserModel=Depends(is_auth)):
    return controller.get_all_projects(db, user)