import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployeeProfile from "./pages/EmployeeProfile";
import CreateEmployee from "./pages/CreateEmployee";
import EditEmployee from "./pages/EditEmployee";
import EmployeeDetails from "./pages/EmployeeDetails";
import RoleProtectedRoute from "./pages/RoleProtectedRoute";

// 👇 Create these two files in src/components:
// ✅ ProtectedRoute.js (for general protection)
// ✅ RoleProtectedRoute.js (for role-based protection)

function App() {
  return (
    <Router>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ----------------- ADMIN ROUTES ----------------- */}
        <Route
          path="/admin-dashboard"
          element={
            <RoleProtectedRoute allowedRole="ADMIN">
              <AdminDashboard />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard/create-employee"
          element={
            <RoleProtectedRoute allowedRole="ADMIN">
              <CreateEmployee />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard/employees/:id"
          element={
            <RoleProtectedRoute allowedRole="ADMIN">
              <EmployeeProfile />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard/employees/:id/edit"
          element={
            <RoleProtectedRoute allowedRole="ADMIN">
              <EditEmployee />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard/employees"
          element={
            <RoleProtectedRoute allowedRole="ADMIN">
              <EmployeeDetails />
            </RoleProtectedRoute>
          }
        />
       

        {/* ----------------- EMPLOYEE ROUTE ----------------- */}
        <Route
          path="/employee-dashboard"
          element={
            <RoleProtectedRoute allowedRole="USER">
              <EmployeeDashboard />
            </RoleProtectedRoute>
          }
        />

        {/* Catch-all (redirect unknown paths) */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
