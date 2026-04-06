from pydantic import BaseModel
from src.flats.model import FlatType, FlatStatus
from datetime import datetime

class UserMinimal(BaseModel):
    userId:int
    fullName:str

    class Config:
        from_attributes = True

class ProjectMinimal(BaseModel):
    id:int
    name:str

    class Config:
        from_attributes = True # Taake SQLAlchemy object ko JSON bana sake

class FlatResponseSchema(BaseModel):
    id:int
    flatId:str
    ParentProject:ProjectMinimal
    creator:UserMinimal
    flatNumber:int
    floor:int
    size:int
    type:FlatType
    status:bool
    flatStatus:FlatStatus
    description:str
    createdAt:datetime

    class Config:
        from_attributes = True

class FlatCreate(BaseModel):
    project:int
    flatNumber:int
    floor:int
    size:int
    type:FlatType
    flatStatus:FlatStatus
    description:str