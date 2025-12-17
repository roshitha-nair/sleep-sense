import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, accuracy_score
import joblib
import os

np.random.seed(42)

N = 2000

data = []

for _ in range(N):
    bedtime = np.random.uniform(21, 1 + 24) % 24
    wakeup = (bedtime + np.random.uniform(5, 9)) % 24

    sleep_duration = np.clip(np.random.normal(7.5, 1.2), 4, 10)
    screen_time = np.clip(np.random.normal(90, 40), 10, 240)
    caffeine = np.random.randint(0, 5)
    last_caffeine_hour = np.random.randint(12, 21)
    stress = np.random.randint(1, 6)
    activity = np.clip(np.random.normal(40, 20), 0, 120)
    naps = np.random.choice([0, 1])
    nap_duration = np.random.randint(10, 60) if naps else 0

    # ---- Sleep Score Formula ----
    score = (
        50
        + sleep_duration * 6
        - screen_time * 0.05
        - caffeine * 3
        - max(0, last_caffeine_hour - 16) * 2
        - stress * 3
        + activity * 0.1
        - naps * 2
    )

    score = int(np.clip(score, 30, 100))

    if score >= 85:
        quality = "Good"
    elif score >= 70:
        quality = "Average"
    else:
        quality = "Poor"

    data.append([
        bedtime,
        wakeup,
        sleep_duration,
        screen_time,
        caffeine,
        last_caffeine_hour,
        stress,
        activity,
        naps,
        nap_duration,
        score,
        quality
    ])

columns = [
    "bedtime_hour",
    "wakeup_hour",
    "sleep_duration",
    "screen_time_minutes",
    "caffeine_cups",
    "last_caffeine_hour",
    "stress_level",
    "physical_activity_minutes",
    "naps",
    "nap_duration",
    "sleep_score",
    "sleep_quality"
]

df = pd.DataFrame(data, columns=columns)

os.makedirs("data", exist_ok=True)
df.to_csv("data/sleep_data.csv", index=False)

print("✅ Dataset generated: data/sleep_data.csv")
print(df.head())

# ================== MODEL TRAINING ==================

X = df.drop(["sleep_score", "sleep_quality"], axis=1)
y_score = df["sleep_score"]
y_quality = df["sleep_quality"]

X_train, X_test, y_score_train, y_score_test = train_test_split(
    X, y_score, test_size=0.2, random_state=42
)

X_train_q, X_test_q, y_train_q, y_test_q = train_test_split(
    X, y_quality, test_size=0.2, random_state=42
)

score_model = RandomForestRegressor(n_estimators=200, random_state=42)
score_model.fit(X_train, y_score_train)

quality_model = RandomForestClassifier(n_estimators=200, random_state=42)
quality_model.fit(X_train_q, y_train_q)

score_pred = score_model.predict(X_test)
quality_pred = quality_model.predict(X_test_q)

print("\n📊 MODEL PERFORMANCE")
print("Sleep Score MAE:", round(mean_absolute_error(y_score_test, score_pred), 2))
print("Sleep Quality Accuracy:", round(accuracy_score(y_test_q, quality_pred) * 100, 2), "%")

os.makedirs("models", exist_ok=True)
joblib.dump(score_model, "models/sleep_score_model.pkl")
joblib.dump(quality_model, "models/sleep_quality_model.pkl")

print("\n✅ Models saved in /models")
