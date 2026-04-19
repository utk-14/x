from fastapi import APIRouter
from app.models.user_model import UserSignup, UserLogin
from app.services.auth_service import signup_user, login_user

router = APIRouter()

@router.post("/signup")
def signup(user: UserSignup):
    return signup_user(user)

@router.post("/login")
def login(user: UserLogin):
    return login_user(user)