from pydantic import BaseModel
from typing import Dict, List
from datetime import datetime

class SleepRecordCreate(BaseModel):
    input_data: Dict
    sleep_score: float
    sleep_quality: str
    tips: List[str]

class SleepRecordResponse(SleepRecordCreate):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
