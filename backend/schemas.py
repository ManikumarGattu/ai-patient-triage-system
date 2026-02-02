from pydantic import BaseModel

class PatientCreate(BaseModel):
    name: str
    age: int
    gender: str
    blood_pressure: int
    sugar_level: int
    oxygen_level: int

class PatientResponse(PatientCreate):
    risk_level: str

class UserCreate(BaseModel):
    email: str
    password: str
    role: str

class UserLogin(BaseModel):
    email: str
    password: str


