from sqlalchemy.orm import Session
from authentication import hash_password, verify_password
from models import User
import models

def create_patient(db: Session, patient_data, risk):
    patient = models.Patient(
        **patient_data.dict(),
        risk_level=risk
    )
    db.add(patient)
    db.commit()
    db.refresh(patient)
    return patient

def get_all_patients(db: Session):
    return db.query(models.Patient).all()

def get_user_by_email(db, email):
    return db.query(User).filter(User.email == email).first()

def create_user(db, user):
    db_user = User(
        email=user.email,
        password=hash_password(user.password),
        role=user.role
    )
    db.add(db_user)
    db.commit()
    return db_user

def authenticate_user(db, email, password):
    user = get_user_by_email(db, email)
    if not user:
        return None
    if not verify_password(password, user.password):
        return None
    return user

