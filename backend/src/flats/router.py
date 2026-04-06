from fastapi import APIRouter, status, Depends
from sqlalchemy.orm import Session
from src.utils.db import get_db
from src.utils.helper_methods import is_auth
from src.flats.schema import FlatCreate, FlatResponseSchema
from src.flats import controller
from src.users.model import UserModel

flat_routes = APIRouter(prefix="/flats")

# create Flat
@flat_routes.post("/create", status_code=status.HTTP_201_CREATED, response_model=FlatResponseSchema)
def create_flat(body:FlatCreate, db:Session = Depends(get_db), user:UserModel=Depends(is_auth)):
    return controller.create_flat(body, db, user)

# update Flat
@flat_routes.put("/update/{flat_id}", status_code=status.HTTP_200_OK, response_model=FlatResponseSchema)
def update_flat(flat_id:int, body:FlatCreate, db:Session=Depends(get_db), user:UserModel=Depends(is_auth)):
    return controller.update_flat(flat_id, body, db, user)

# delete Flat
@flat_routes.delete("/delete/{flat_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_flat(flat_id:int, db:Session=Depends(get_db), user:UserModel=Depends(is_auth)):
    return controller.delete_flat(flat_id, db, user)

# get Flat by id
@flat_routes.get("/flat/{flat_id}", status_code=status.HTTP_200_OK, response_model=FlatResponseSchema)
def get_flat_by_id(flat_id:int, db:Session=Depends(get_db), user:UserModel=Depends(is_auth)):
    return controller.get_flat_by_id(flat_id, db, user)

# get all Flats
@flat_routes.get("/all", status_code=status.HTTP_200_OK, response_model=list[FlatResponseSchema])
def get_all_flats(db:Session=Depends(get_db), user:UserModel=Depends(is_auth)):
    return controller.get_all_flats(db, user)