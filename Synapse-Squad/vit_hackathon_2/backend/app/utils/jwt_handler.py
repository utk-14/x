# from jose import jwt
# from datetime import datetime, timedelta
# import os

# SECRET_KEY = os.getenv("SECRET_KEY")
# ALGORITHM = "HS256"

# def create_token(data: dict):
#     to_encode = data.copy()
#     expire = datetime.utcnow() + timedelta(hours=24)
#     to_encode.update({"exp": expire})
#     return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# def verify_token(token: str):
#     return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

from jose import jwt, JWTError
from datetime import datetime, timedelta
import os

from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"

security = HTTPBearer()


# 🔐 CREATE TOKEN
def create_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=24)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# 🔍 VERIFY TOKEN (LOW LEVEL)
def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")


# 🔥 MAIN DEPENDENCY (THIS WAS MISSING)
def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials
    payload = verify_token(token)
    return payload