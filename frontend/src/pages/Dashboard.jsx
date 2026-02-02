import { useEffect, useState } from "react";
import { getAllPatients } from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    high: 0,
    medium: 0,
    low: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
  }, []);

  function logout() {
  localStorage.removeItem("user");
  window.location.href = "/login";
  }


  async function loadDashboardData() {
    const patients = await getAllPatients();

    const high = patients.filter(p => p.risk_level === "High").length;
    const medium = patients.filter(p => p.risk_level === "Medium").length;
    const low = patients.filter(p => p.risk_level === "Low").length;

    setStats({
      total: patients.length,
      high,
      medium,
      low,
    });
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Hospital Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Real-time patient triage overview
      </p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card title="Total Patients" value={stats.total} color="bg-blue-600" />
        <Card title="High Risk" value={stats.high} color="bg-red-600" />
        <Card title="Medium Risk" value={stats.medium} color="bg-yellow-500" />
        <Card title="Low Risk" value={stats.low} color="bg-green-600" />
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/register")}
          className="bg-blue-600 text-white px-4 py-2"
        >
          Register Patient
        </button>

        <button
          onClick={() => navigate("/triage")}
          className="bg-gray-800 text-white px-4 py-2"
        >
          View Triage Queue
        </button>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2"
        >
          Logout
        </button>

      </div>
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div className={`${color} text-white p-4`}>
      <p className="text-sm">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}

export default Dashboard;
