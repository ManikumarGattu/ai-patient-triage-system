import { useEffect, useState } from "react";
import { getAllPatients } from "../services/api";

function TriageQueue() {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  async function fetchPatients() {
    try {
      const data = await getAllPatients();

      // Sort patients by risk priority
      const riskOrder = { High: 1, Medium: 2, Low: 3 };
      data.sort((a, b) => riskOrder[a.risk_level] - riskOrder[b.risk_level]);

      setPatients(data);
    } catch (err) {
      setError("Unable to load triage queue");
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Patient Triage Queue</h1>
      <p className="text-gray-600 mb-6">
        Patients prioritized by AI-based risk assessment
      </p>

      {error && <p className="text-red-600">{error}</p>}

      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-xs font-semibold tracking-wide text-gray-500 uppercase border-b">
                Name
              </th>
              <th className="p-4 text-xs font-semibold tracking-wide text-gray-500 uppercase border-b">
                Age
              </th>
              <th className="p-4 text-xs font-semibold tracking-wide text-gray-500 uppercase border-b">
                Oxygen
              </th>
              <th className="p-4 text-xs font-semibold tracking-wide text-gray-500 uppercase border-b">
                Risk Level
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {patients.map((patient, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors duration-200 text-gray-700"
              >
                <td className="p-4 text-sm font-medium text-gray-900">
                  {patient.name}
                </td>
                <td className="p-4 text-sm text-gray-700">{patient.age}</td>
                <td className="p-4 text-sm text-gray-700">
                  {patient.oxygen_level}%
                </td>
                <td className="p-4 text-sm">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      patient.risk_level === "High"
                        ? "bg-red-100 text-red-700"
                        : patient.risk_level === "Medium"
                        ? "bg-yellow-100 text-yellow-800" // Adjusted for better contrast
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {patient.risk_level}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TriageQueue;
