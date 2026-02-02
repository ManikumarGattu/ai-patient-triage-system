from sqlalchemy import Column, Integer, String
from database import Base

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    age = Column(Integer)
    gender = Column(String(10))
    blood_pressure = Column(Integer)
    sugar_level = Column(Integer)
    oxygen_level = Column(Integer)
    risk_level = Column(String(20))

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False)