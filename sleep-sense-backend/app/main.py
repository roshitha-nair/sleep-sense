from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------- Request schema ----------
class SleepRequest(BaseModel):
    bedtime: str
    wakeTime: str
    screenTime: int
    caffeineCups: int
    lastCaffeine: str | None
    stress: int
    activity: int
    nap: bool
    napDuration: int

# ---------- Response schema ----------
class SleepResponse(BaseModel):
    sleep_score: int
    sleep_quality: str
    tips: list[str]

# ---------- Predict endpoint ----------
@app.post("/predict", response_model=SleepResponse)
def predict_sleep(data: SleepRequest):
    # TEMP LOGIC (we’ll replace with ML later)
    score = 80

    if data.screenTime > 60:
        score -= 10
    if data.stress >= 4:
        score -= 10
    if data.caffeineCups >= 3:
        score -= 10

    if score >= 75:
        quality = "Good"
    elif score >= 50:
        quality = "Average"
    else:
        quality = "Poor"

    tips = []
    if data.screenTime > 60:
        tips.append("Reduce screen time before bed")
    if data.caffeineCups >= 3:
        tips.append("Avoid caffeine late in the day")
    if data.stress >= 4:
        tips.append("Try relaxation techniques before sleep")

    return {
        "sleep_score": score,
        "sleep_quality": quality,
        "tips": tips,
    }
