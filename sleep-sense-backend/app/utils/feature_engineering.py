from datetime import datetime

def time_to_hour(time_str: str) -> float:
    t = datetime.strptime(time_str, "%H:%M")
    return t.hour + t.minute / 60

def build_features(payload):
    bedtime_hour = time_to_hour(payload.bedtime)
    wakeup_hour = time_to_hour(payload.wakeTime)

    # Handle overnight sleep
    sleep_duration = (
        wakeup_hour - bedtime_hour
        if wakeup_hour > bedtime_hour
        else (24 - bedtime_hour + wakeup_hour)
    )

    # Extract last caffeine hour (DEFAULT = 16 if missing)
    last_caffeine_hour = (
        time_to_hour(payload.lastCaffeine)
        if payload.lastCaffeine
        else 16
    )

    features = [
        bedtime_hour,              # 1
        wakeup_hour,               # 2
        sleep_duration,            # 3
        payload.screenTime,        # 4
        payload.caffeineCups,      # 5
        last_caffeine_hour,        # 6 ✅ FIXED
        payload.stress,            # 7
        payload.activity,          # 8
        int(payload.nap),          # 9
        payload.napDuration        # 10
    ]

    return features, sleep_duration
