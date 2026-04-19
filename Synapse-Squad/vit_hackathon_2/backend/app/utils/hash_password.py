from passlib.context import CryptContext
import hashlib


pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

def hash_password(password: str) -> str:
    print("DEBUG: new hash running")
    return pwd_context.hash(password)  

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)