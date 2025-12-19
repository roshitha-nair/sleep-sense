from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import desc
import joblib

from app.schemas import SleepRequest, SleepResponse
from app.utils.feature_engineering import build_features
from app.db.database import engine, get_db
from app.db import models
from app.core.auth import get_current_user

app = FastAPI()

# ✅ Create DB tables
models.Base.metadata.create_all(bind=engine)

# ✅ CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://sleep-sense-omega.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Load ML models
score_model = joblib.load("app/ml/sleep_score_model.pkl")
quality_model = joblib.load("app/ml/sleep_quality_model.pkl")
scaler = joblib.load("app/ml/scaler.pkl")


@app.get("/")
def root():
    return {"status": "Sleep Sense API running"}


# ============================
# 🔮 Predict Sleep
# ============================
@app.post("/predict", response_model=SleepResponse)
def predict_sleep(
    data: SleepRequest,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    # 🔧 Feature engineering
    features, sleep_duration = build_features(data)
    X = scaler.transform([features])

    # 🎯 ML predictions
    score = int(score_model.predict(X)[0])
    quality = quality_model.predict(X)[0]

    # 🔥 Severity adjustments
    penalty = 0
    if sleep_duration < 6:
        penalty += 8
    if data.screenTime > 120:
        penalty += 6
    if data.stress >= 4:
        penalty += 6
    if data.caffeineCups >= 3:
        penalty += 5
    if data.nap and data.napDuration > 45:
        penalty += 4

    score = max(30, score - penalty)

    # 🧠 Tips
    tips_with_priority = []

    if sleep_duration < 7:
        tips_with_priority.append((1, "Try to get at least 7 hours of sleep"))
    if data.caffeineCups > 1 or (
        data.lastCaffeine and int(data.lastCaffeine.split(":")[0]) >= 18
    ):
        tips_with_priority.append((2, "Avoid caffeine after 6 PM"))
    if data.screenTime > 60:
        tips_with_priority.append((3, "Reduce screen time before bed"))
    if data.stress >= 4:
        tips_with_priority.append((4, "Practice relaxation techniques"))
    if data.activity < 30:
        tips_with_priority.append((5, "Increase daily physical activity"))
    if data.nap and data.napDuration > 30:
        tips_with_priority.append((6, "Limit naps to under 30 minutes"))

    tips = [tip for _, tip in sorted(tips_with_priority)[:4]]

    # 💾 Save record
    sleep_record = models.SleepRecord(
        user_id=current_user["id"],
        inputs=data.dict(),
        sleep_score=score,
        sleep_quality=quality,
        tips=tips,
    )
    db.add(sleep_record)
    db.commit()
    db.refresh(sleep_record)

    return {
        "sleep_score": score,
        "sleep_quality": quality,
        "tips": tips,
    }


# ============================
# 📊 Fetch Sleep History
# ============================
@app.get("/history")
def get_sleep_history(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    records = (
        db.query(models.SleepRecord)
        .filter(models.SleepRecord.user_id == current_user["id"])
        .order_by(desc(models.SleepRecord.created_at))
        .all()
    )

    return [
        {
            "id": r.id,
            "date": r.created_at.strftime("%Y-%m-%d"),
            "sleep_score": r.sleep_score,
            "sleep_quality": r.sleep_quality,
            "inputs": r.inputs,
            "tips": r.tips,
        }
        for r in records
    ]
