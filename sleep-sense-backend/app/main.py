from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib

from app.schemas import SleepRequest, SleepResponse
from app.utils.feature_engineering import build_features

app = FastAPI()

# ✅ CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","https://sleep-sense-omega.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Load models
score_model = joblib.load("app/ml/sleep_score_model.pkl")
quality_model = joblib.load("app/ml/sleep_quality_model.pkl")
scaler = joblib.load("app/ml/scaler.pkl")

@app.get("/")
def root():
    return {"status": "Sleep Sense API running"}



@app.post("/predict", response_model=SleepResponse)
def predict_sleep(data: SleepRequest):

    # 🔧 Feature engineering
    features, sleep_duration = build_features(data)
    X = scaler.transform([features])

    # 🎯 ML predictions
    score = int(score_model.predict(X)[0])
    quality = quality_model.predict(X)[0]

    # ==================================================
    # 🔥 SEVERITY ADJUSTMENT (HYBRID LOGIC)
    # ==================================================
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

    # ==================================================
    # 🧠 PRIORITIZED RULE-BASED TIPS
    # ==================================================
    tips_with_priority = []

    if sleep_duration < 7:
        tips_with_priority.append(
            (1, "Try to get at least 7 hours of sleep for optimal recovery")
        )

    if data.caffeineCups > 1 or (
        data.lastCaffeine and int(data.lastCaffeine.split(":")[0]) >= 18
    ):
        tips_with_priority.append(
            (2, "Avoid caffeine intake after 6 PM for better sleep")
        )

    if data.screenTime > 60:
        tips_with_priority.append(
            (3, "Reduce screen exposure at least 30 minutes before bedtime")
        )

    if data.stress >= 4:
        tips_with_priority.append(
            (4, "Practice relaxation techniques like deep breathing or meditation before sleep")
        )

    if data.activity < 30:
        tips_with_priority.append(
            (5, "Engaging in light physical activity during the day can improve sleep quality")
        )

    if data.nap and data.napDuration > 30:
        tips_with_priority.append(
            (6, "Limit naps to under 30 minutes to avoid disrupting nighttime sleep")
        )

    # ✅ Top 4 tips only
    tips = [tip for _, tip in sorted(tips_with_priority)[:4]]

    return {
        "sleep_score": score,
        "sleep_quality": quality,
        "tips": tips,
    }
