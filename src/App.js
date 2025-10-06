import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import RegisterPage from "./pages/RegisterPage";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployeeProfile from "./pages/EmployeeProfile";
import CreateEmployee from "./pages/CreateEmployee";
import EditEmployee from "./pages/EditEmployee";
import EmployeeDetails from "./pages/EmployeeDetails";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Admin routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-dashboard/create-employee" element={<CreateEmployee />} />
        <Route path="/admin-dashboard/employees/:id" element={<EmployeeProfile />} />
        <Route path="/admin-dashboard/employees/:id/edit" element={<EditEmployee />} />
        <Route path="/admin-dashboard/employees" element={<EmployeeDetails />} />

        {/* Employee (self-service) */}
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
