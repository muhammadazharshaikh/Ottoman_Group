from sqlalchemy.orm import Session
from src.flats.schema import FlatCreate
from src.users.model import UserModel
from src.flats.model import Flats
from src.utils.helper_methods import generate_flat_id
from fastapi import HTTPException
from datetime import datetime

# create flat
def create_flat(body:FlatCreate, db:Session, user:UserModel):
    new_flat_id = generate_flat_id(db)
    new_flat = Flats(
        flatId = new_flat_id,
        project = body.project,
        createdBy = user.userId,
        flatNumber = body.flatNumber,
        floor = body.floor,
        size = body.size,
        type = body.type,
        flatStatus = body.flatStatus,
        description = body.description
    )
    db.add(new_flat)
    db.commit()
    db.refresh(new_flat)
    return new_flat

# update flat
def update_flat(flat_id:int, body:FlatCreate, db:Session, user:UserModel):
    flat = db.query(Flats).filter(Flats.id == flat_id).first()
    if not flat:
        raise HTTPException(404, detail="Flat Not Found !")
    data = body.model_dump()
    for field, value in data.items():
        setattr(flat, field, value)
    db.add(flat)
    db.commit()
    db.refresh(flat)
    return flat

# delete flat
def delete_flat(flat_id:int, db:Session, user:UserModel):
    flat = db.query(Flats).filter(Flats.id == flat_id).first()
    if not flat:
        raise HTTPException(404, detail="Flat Not Found !")
    flat.status = False
    flat.deletedAt = datetime.now()
    db.add(flat)
    db.commit()
    db.refresh(flat)

    return {"msg":"Deleted Successfully"}

# get flat by id
def get_flat_by_id(flat_id:int, db:Session, user:UserModel):
    flat = db.query(Flats).filter(Flats.id == flat_id).first()
    if not flat:
        raise HTTPException(404, detail="Flat Not Found !")
    return flat

# get all flats
def get_all_flats(db:Session, user:UserModel):
    flats = db.query(Flats).filter(Flats.status == True).all()
    return flats