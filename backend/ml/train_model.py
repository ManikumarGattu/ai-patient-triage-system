import joblib
import pandas as pd
import os
import numpy as np

# Load artifacts
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model.pkl")
ENCODER_PATH = os.path.join(BASE_DIR, "label_encoder.pkl")

model = None
label_encoder = None

try:
    if os.path.exists(MODEL_PATH) and os.path.exists(ENCODER_PATH):
        model = joblib.load(MODEL_PATH)
        label_encoder = joblib.load(ENCODER_PATH)
except Exception as e:
    print(f"Error loading ML models: {e}")

def predict_risk_ml(patient):
    """
    Predicts risk level based on patient data using the trained ML model.
    """
    if not model or not label_encoder:
        print("ML model not loaded, returning default risk")
        return "Low" # Fallback
    
    try:
        # Prepare features matching the training data columns
        data = {
            "age": [patient.age],
            "bp": [patient.blood_pressure],
            "sugar": [patient.sugar_level],
            "oxygen": [patient.oxygen_level]
        }
        features = pd.DataFrame(data)
        
        # Predict probabilities
        probs = model.predict_proba(features)[0]
        
        # specific logic from original snippet intent
        # Map classes to probabilities
        class_probs = {cls: prob for cls, prob in zip(label_encoder.classes_, probs)}
        
        if class_probs.get("High", 0) > 0.6:
            return "High"
        elif class_probs.get("Medium", 0) > 0.5:
            return "Medium"
        else:
            return "Low"
            
    except Exception as e:
        print(f"Prediction error: {e}")
        return "Low"

