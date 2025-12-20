# 💤 Sleep Sense — AI-Powered Sleep Quality Analyzer

Sleep Sense is a full-stack web application that helps users analyze, track, and improve their sleep quality using machine learning insights, interactive dashboards, and personalized reports.

---

## 🚀 Features

- 🔐 **Secure Authentication**
  - Email & password authentication using Firebase
  - Protected routes for authenticated users

- 🧠 **AI-Based Sleep Analysis**
  - Predicts personalized sleep score and sleep quality (Good / Average / Poor)
  - Uses trained machine learning models for analysis

- 📊 **Interactive Sleep Dashboard**
  - Latest score, average score, and sleep quality summary
  - Sleep score trends (line chart)
  - Sleep duration visualization (bar chart)
  - Sleep quality distribution (pie chart)
  - Recent sleep history with delete option

- ⏱ **Date-Range Filters**
  - View sleep data for:
    - Last 7 days
    - Last 30 days
    - All time

- 📄 **PDF Sleep Report Export**
  - Professionally styled report
  - Includes summary, statistics, and personalized tips
  - Downloadable directly from the dashboard

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Material UI (MUI)
- Recharts
- Firebase Authentication

### Backend
- FastAPI
- Python
- Scikit-learn
- ReportLab

### Deployment
- Frontend: Vercel
- Backend: Render

---

## 🧠 Machine Learning Details

- Trained models to predict:
  - Sleep Score
  - Sleep Quality category
- Feature preprocessing and scaling included
- Models integrated into backend APIs

---

## 📁 Project Structure

```bash
sleep-sense/
├── sleep-sense-backend/              # FastAPI backend
│   ├── app/
│   │   ├── assets/                   # Backend static assets
│   │   │   └── logo.png
│   │   ├── core/                     # Core backend logic
│   │   │   ├── auth.py               # Authentication logic
│   │   │   └── firebase.py           # Firebase admin setup
│   │   ├── db/                       # Database layer
│   │   │   ├── database.py           # DB connection
│   │   │   ├── models.py             # ORM models
│   │   │   └── schemas.py            # Pydantic schemas
│   │   ├── ml/                       # ML models used in API
│   │   │   ├── scaler.pkl
│   │   │   ├── sleep_quality_model.pkl
│   │   │   └── sleep_score_model.pkl
│   │   ├── utils/                    # Utility functions
│   │   │   ├── feature_engineering.py
│   │   │   └── pdf_report.py
│   │   ├── main.py                   # FastAPI entry point
│   │   └── schemas.py                # API request/response schemas
│   │
│   ├── .env                          # Backend environment variables
│   ├── requirements.txt              # Backend dependencies
│   ├── sleep-sense-57e04-firebase-adminsdk-*.json
│   └── README.md
│
├── sleep-sense-frontend/             # React (Vite) frontend
│   ├── public/                       # Public static files
│   ├── src/
│   │   ├── assets/                   # Images & icons
│   │   │   ├── logo.png
│   │   │   ├── logo(1).png
│   │   │   └── react.svg
│   │   ├── components/
│   │   │   ├── common/               # Reusable components
│   │   │   │   ├── AppButton.jsx
│   │   │   │   ├── AppCard.jsx
│   │   │   │   └── LogoutButton.jsx
│   │   │   ├── home/
│   │   │   │   └── FeatureCard.jsx
│   │   │   └── layout/
│   │   │       ├── Navbar.jsx
│   │   │       ├── ProtectedLayout.jsx
│   │   │       ├── AuthRedirect.jsx
│   │   │       └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx       # Auth state management
│   │   ├── pages/                    # Application pages
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Signup.jsx
│   │   │   ├── Analyze.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Result.jsx
│   │   │   └── Welcome.jsx
│   │   ├── services/
│   │   │   └── api.js                # API service calls
│   │   ├── App.jsx                   # Root component
│   │   ├── main.jsx                  # App bootstrap
│   │   ├── firebase.js               # Firebase client config
│   │   └── theme.js                  # MUI theme configuration
│   │
│   ├── .env                          # Frontend environment variables
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── README.md
│
├── sleep-sense-ml/                   # Machine Learning workspace
│   ├── data/
│   │   └── sleep_data.csv            # Dataset
│   ├── models/
│   │   ├── scaler.pkl
│   │   ├── sleep_quality_model.pkl
│   │   └── sleep_score_model.pkl
│   ├── notebooks/                   # Experiment notebooks
│   ├── train.py                     # Model training script
│   ├── runtime.txt
│   └── README.md
│
└── README.md                         # Root project documentation
```


---

## 🔮 Future Enhancements

- Full mobile-first responsiveness

- Advanced sleep recommendations

- Wearable device integration

- Multi-language support

---

## 👩‍💻 Author

Roshitha B Nair
