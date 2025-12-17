# 🌙 Sleep Sense – Backend (FastAPI + Machine Learning)

Sleep Sense is an AI-powered sleep analysis system that predicts **sleep score**, **sleep quality**, and provides **personalized sleep improvement tips** based on user lifestyle inputs.

This repository contains the **FastAPI backend** integrated with trained **Machine Learning models**.

---

## 🚀 Features

- 🧠 ML-based sleep score prediction (0–100)
- 🏷️ Sleep quality classification (Good / Average / Poor)
- 💡 Rule-based personalized sleep tips (top 4, prioritized)
- ⚡ FastAPI backend with Swagger documentation
- 🌍 CORS-enabled for frontend integration
- 📦 Ready for cloud deployment (Render)

---

## 🏗️ Architecture Overview
sleep-sense-backend/
│
├── app/
│ ├── main.py # FastAPI entry point
│ ├── schemas.py # Pydantic request/response schemas
│ ├── utils/
│ │ └── feature_engineering.py
│ └── ml/
│ ├── sleep_score_model.pkl
│ ├── sleep_quality_model.pkl
│ └── scaler.pkl
│
├── requirements.txt
├── README.md
