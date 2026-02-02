import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PatientRegistration from "./pages/PatientRegistration";
import TriageQueue from "./pages/TriageQueue";
import Layout from "./components/Layout";
import Signup from "./pages/Signup";

function PrivateRoute({ children }) {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/register"
          element={
            <PrivateRoute>
              <Layout>
                <PatientRegistration />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/triage"
          element={
            <PrivateRoute>
              <Layout>
                <TriageQueue />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
