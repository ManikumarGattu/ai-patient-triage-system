import { useState } from "react";
import { registerPatient } from "../services/api";

function PatientRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    blood_pressure: "",
    sugar_level: "",
    oxygen_level: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await registerPatient({
        ...formData,
        age: Number(formData.age),
        blood_pressure: Number(formData.blood_pressure),
        sugar_level: Number(formData.sugar_level),
        oxygen_level: Number(formData.oxygen_level),
      });

      setResult(response);
    } catch (err) {
      setError("Unable to predict risk. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Patient Registration</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Patient Name"
          onChange={handleChange}
          className="w-full border p-2"
          required
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          onChange={handleChange}
          className="w-full border p-2"
          required
        />

        <select
          name="gender"
          onChange={handleChange}
          className="w-full border p-2"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input
          type="number"
          name="blood_pressure"
          placeholder="Blood Pressure"
          onChange={handleChange}
          className="w-full border p-2"
          required
        />

        <input
          type="number"
          name="sugar_level"
          placeholder="Sugar Level"
          onChange={handleChange}
          className="w-full border p-2"
          required
        />

        <input
          type="number"
          name="oxygen_level"
          placeholder="Oxygen Level (%)"
          onChange={handleChange}
          className="w-full border p-2"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2"
          disabled={loading}
        >
          {loading ? "Predicting..." : "Predict Risk & Register"}
        </button>
      </form>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {result && (
        <div
          className={`mt-6 p-4 text-white ${
            result.risk_level === "High"
              ? "bg-red-600"
              : result.risk_level === "Medium"
              ? "bg-yellow-500"
              : "bg-green-600"
          }`}
        >
          <h2 className="text-xl font-bold">
            Risk Level: {result.risk_level}
          </h2>
        </div>
      )}
    </div>
  );
}

export default PatientRegistration;
