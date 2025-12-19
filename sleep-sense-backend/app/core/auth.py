from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import firebase_admin
from firebase_admin import auth as firebase_auth, credentials
from sqlalchemy.orm import Session

import os
import json

from app.db.database import get_db
from app.db import models

# 🔐 IMPORTANT: disable auto_error
security = HTTPBearer(auto_error=False)

# ================================
# 🔐 Firebase Admin Initialization
# ================================
if not firebase_admin._apps:
    firebase_json = os.getenv("FIREBASE_SERVICE_ACCOUNT")

    if not firebase_json:
        raise RuntimeError("FIREBASE_SERVICE_ACCOUNT environment variable not set")

    cred = credentials.Certificate(json.loads(firebase_json))
    firebase_admin.initialize_app(cred)

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    if credentials is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header missing",
        )

    token = credentials.credentials

    try:
        decoded_token = firebase_auth.verify_id_token(token)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid Firebase token: {str(e)}",
        )

    firebase_uid = decoded_token["uid"]
    email = decoded_token.get("email")

    user = (
        db.query(models.User)
        .filter(models.User.firebase_uid == firebase_uid)
        .first()
    )

    if not user:
        user = models.User(
            firebase_uid=firebase_uid,
            email=email,
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    return {
        "id": user.id,
        "firebase_uid": firebase_uid,
        "email": email,
    }
