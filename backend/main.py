from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
import schemas, crud
from ml.predict import predict_risk_ml

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/register", response_model=schemas.PatientResponse)
def register_patient(
    patient: schemas.PatientCreate,
    db: Session = Depends(get_db)
):
    # ✅ ML prediction FIRST (using request data)
    risk, confidence = predict_risk_ml(patient)

    # ✅ Save patient ONCE with predicted risk
    return crud.create_patient(db, patient, risk)

@app.get("/patients")
def get_patients(db: Session = Depends(get_db)):
    return crud.get_all_patients(db)

@app.post("/signup")
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    if crud.get_user_by_email(db, user.email):
        raise HTTPException(status_code=400, detail="User already exists")
    crud.create_user(db, user)
    return {"message": "Signup successful"}

@app.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    auth_user = crud.authenticate_user(db, user.email, user.password)
    if not auth_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {
        "email": auth_user.email,
        "role": auth_user.role
    }
