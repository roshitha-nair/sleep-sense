from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np

from app.schemas import SleepRequest, SleepResponse
from app.utils.feature_engineering import build_features

app = FastAPI()

# ✅ CORS (already working, but keep it)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
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

@app.post("/predict", response_model=SleepResponse)
def predict_sleep(data: SleepRequest):

    features, sleep_duration = build_features(data)

    X = scaler.transform([features])

    # 🎯 Predict
    score = int(score_model.predict(X)[0])
    quality = quality_model.predict(X)[0]

    # 🧠 Simple rule-based tips (for now)
    tips = []

    if sleep_duration < 7:
        tips.append("Try to increase your sleep duration to at least 7 hours")

    if data.screenTime > 60:
        tips.append("Reduce screen time at least 30 minutes before bed")

    if data.stress >= 4:
        tips.append("Consider relaxation or breathing exercises before sleep")

    if data.caffeineCups > 1:
        tips.append("Limit caffeine intake later in the day")

    return {
        "sleep_score": score,
        "sleep_quality": quality,
        "tips": tips,
    }
