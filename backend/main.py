# main.py
from fastapi import FastAPI, Depends, HTTPException, Response, Request
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from datetime import timedelta, datetime
from typing import Optional

from starlette.responses import PlainTextResponse

import models, schemas
from database import engine, Base
from auth import get_db, hash_password, verify_password, create_access_token
from auth import get_current_user

SECRET_KEY = "yKgR9KytzH_GXR3YapQ6KZqEj7xDlRC7cCNbsQrhwQyLaY9bn4ck4gOzh3jxZ7Sez0e3dD_UZWrVemrjYuhp_xw"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

@app.post("/register", response_model=schemas.Token)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    if db.query(models.User).filter(models.User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pw = hash_password(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_pw)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    token = create_access_token(data={"sub": db_user.email})
    return {"access_token": token}

@app.post("/login")
def login(user: schemas.UserLogin, response: Response, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token(data={"sub": db_user.email})

    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        max_age=3600,
        samesite="Lax",
        secure=False  # Stavi True na HTTPS produkciji
    )
    return {"message": "Login successful"}

@app.get("/me", response_model=schemas.UserOut)
def read_users_me(request: Request, db: Session = Depends(get_db)):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(models.User).filter(models.User.email == email).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    return user

@app.post("/logout")
def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Logged out"}

@app.get("/hello", response_class=PlainTextResponse)
def say_hello(current_user: models.User = Depends(get_current_user)):
    return f"Hey {current_user.email}"
