import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons"; // Hamburger icon
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ Check authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const role = localStorage.getItem("role");

    if (!isAuthenticated || role !== "ADMIN") {
      navigate("/login");
    }
  }, [navigate]);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="admin-dashboard">
      {/* ===== Navbar ===== */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
        <div className="container d-flex justify-content-between align-items-center">
          {/* Left side - Logo */}
          <Link className="navbar-brand fw-bold text-primary d-flex align-items-center" to="/admin-dashboard">
            <span className="me-2" style={{ fontSize: "20px" }}>⏱</span>
            <span>Admin</span>
          </Link>

          {/* Right side - Hamburger */}
          <div className="dropdown">
            <button
              className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ width: "40px", height: "40px" }}
            >
              <MenuOutlined />
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <ul className="dropdown-menu dropdown-menu-end show mt-2" style={{ right: 0 }}>
                <li>
                  <Link className="dropdown-item" to="/admin-dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/attendance">Attendance</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/leaves">Leaves</Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link className="dropdown-item" to="/admin-dashboard/employees">Employee Details</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/admin-dashboard/create-employee">Create Employee</Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
               <li>
                  <Link to="#" onClick={(e) => e.preventDefault()} className="dropdown-item"> Profile </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="dropdown-item text-danger">Logout</button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>

      {/* ===== Dashboard Content ===== */}
      <div className="container my-4">
        <h4 className="fw-bold text-dark">Hello, Admin 👋</h4>

        {/* Metric Cards */}
        <div className="row mt-4 g-4">
          <div className="col-md-3">
            <div className="dashboard-card text-center p-4">
              <h6>Total Employees</h6>
              <h3>53</h3>
            </div>
          </div>
          <div className="col-md-3">
            <div className="dashboard-card text-center p-4">
              <h6>Present Today</h6>
              <h3>44</h3>
            </div>
          </div>
          <div className="col-md-3">
            <div className="dashboard-card text-center p-4">
              <h6>Late Today</h6>
              <h3>2</h3>
            </div>
          </div>
          <div className="col-md-3">
            <div className="dashboard-card text-center p-4">
              <h6>On Leave</h6>
              <h3>7</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
