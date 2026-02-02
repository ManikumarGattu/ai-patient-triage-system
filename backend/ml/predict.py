import joblib
import pandas as pd
import os
import numpy as np

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model.pkl")
ENCODER_PATH = os.path.join(BASE_DIR, "label_encoder.pkl")

model = joblib.load(MODEL_PATH)
label_encoder = joblib.load(ENCODER_PATH)

def predict_risk_ml(patient):
    """
    Robust ML-based patient risk prediction with confidence score.
    """

    # Prepare features
    features = pd.DataFrame([{
        "age": patient.age,
        "bp": patient.blood_pressure,
        "sugar": patient.sugar_level,
        "oxygen": patient.oxygen_level
    }])

    # Predict probabilities
    probs = model.predict_proba(features)[0]
    class_index = np.argmax(probs)

    risk_label = label_encoder.inverse_transform([class_index])[0]
    confidence = round(probs[class_index] * 100, 2)

    # 🚑 CLINICAL SAFETY RULE (VERY IMPORTANT)
    if patient.oxygen_level < 90 and risk_label == "Low":
        risk_label = "Medium"

    return risk_label, confidence
