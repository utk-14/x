# app/main.py
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.routes import auth_routes, alphabet_routes
from app.utils.jwt_handler import get_current_user

# Load environment variables
load_dotenv()

app = FastAPI()

# CORS CONFIG — explicit dev URLs + LAN IPs (e.g. Vite --host) when not using /api proxy
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:4173",
    "http://127.0.0.1:4173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"http://(10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ROUTERS
app.include_router(auth_routes.router)
app.include_router(alphabet_routes.router)

# TEST ROUTES
@app.get("/")
def root():
    return {"message": "Backend running"}

@app.get("/protected")
def protected(user=Depends(get_current_user)):
    return {"message": "You are logged in", "user": user}