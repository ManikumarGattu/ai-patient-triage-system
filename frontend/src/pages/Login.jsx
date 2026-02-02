import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Stethoscope } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // User not found or invalid credentials
        if (res.status === 401) {
          setError("User not found. Please sign up.");
        } else {
          setError(data.detail || "Login failed");
        }
        return;
      }

      // ✅ Successful login
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/", { replace: true });

    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-blue-50 p-3 rounded-full mb-4">
              <Stethoscope className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">MedTriage AI</h1>
            <p className="text-gray-500 mt-1">Secure Staff Access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="doctor@hospital.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2
                bg-white text-gray-900 placeholder-gray-400
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-4 py-2
                bg-white text-gray-900 placeholder-gray-400
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Sign Up Redirect */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-medium">
              Sign Up
            </Link>
          </p>
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          &copy; 2024 MedTriage AI System. Restricted Access.
        </p>
      </div>
    </div>
  );
}

export default Login;
