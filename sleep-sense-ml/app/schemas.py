from pydantic import BaseModel
from typing import Optional, List

class SleepRequest(BaseModel):
    bedtime: str
    wakeTime: str
    screenTime: int
    caffeineCups: int
    lastCaffeine: Optional[str]
    stress: int
    activity: int
    nap: bool
    napDuration: int

class SleepResponse(BaseModel):
    sleep_score: int
    sleep_quality: str
    tips: List[str]
