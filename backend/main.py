from dotenv import load_dotenv
from fastapi import FastAPI
from src.utils.db import Base, engine
from src.users.model import UserModel
from src.users import router as user_router
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

try:
    Base.metadata.create_all(engine)
    print("Database tables created successfully.")
except Exception as e:
    print(f"Error creating database tables: {e}")
    
app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # allow all origins to access the API
    allow_credentials=True, # allow cookies and other credentials to be included in cross-origin requests
    allow_methods=["*"], # allow all HTTP methods (GET, POST, PUT, DELETE, etc.) in cross-origin requests
    allow_headers=["*"], # allow all headers in cross-origin requests
)

app.include_router(user_router.user_routes)