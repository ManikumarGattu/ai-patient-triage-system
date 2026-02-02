// src/services/api.js

const BASE_URL = "http://localhost:8000";

export async function registerPatient(patientData) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patientData),
  });

  if (!response.ok) {
    throw new Error("Failed to register patient");
  }

  return await response.json();
}

export async function getAllPatients() {
  const response = await fetch("http://localhost:8000/patients");

  if (!response.ok) {
    throw new Error("Failed to fetch patients");
  }

  return await response.json();
}
