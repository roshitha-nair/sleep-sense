from datetime import datetime

def time_to_hour(time_str: str) -> float:
    t = datetime.strptime(time_str, "%H:%M")
    return t.hour + t.minute / 60

def build_features(payload):
    bedtime_hour = time_to_hour(payload.bedtime)
    wakeup_hour = time_to_hour(payload.wakeTime)

    sleep_duration = (
        wakeup_hour - bedtime_hour
        if wakeup_hour > bedtime_hour
        else (24 - bedtime_hour + wakeup_hour)
    )

    features = [
        bedtime_hour,
        wakeup_hour,
        sleep_duration,
        payload.screenTime,
        payload.caffeineCups,
        payload.stress,
        payload.activity,
        int(payload.nap),
        payload.napDuration,
    ]

    return features, sleep_duration
