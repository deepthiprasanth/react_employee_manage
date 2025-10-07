// src/pages/AdminDashboard.js
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // ✅ Check authentication on page load
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const role = localStorage.getItem("role");

    if (!isAuthenticated || role !== "ADMIN") {
      navigate("/login"); // redirect to login if not admin or not logged in
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
        <div className="container">
          <Link className="navbar-brand fw-bold text-primary" to="/admin-dashboard">
            Admin
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item mx-2">
                <Link className="nav-link" to="/admin-dashboard">
                  Dashboard
                </Link>
              </li>

              <li className="nav-item mx-2">
                <Link className="nav-link" to="/attendance">
                  Attendance
                </Link>
              </li>

              <li className="nav-item mx-2">
                <Link className="nav-link" to="/leaves">
                  Leaves
                </Link>
              </li>

              {/* ===== Employee Dropdown ===== */}
              <li className="nav-item dropdown mx-2">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="employeeDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Employee Management
                </a>
                <ul className="dropdown-menu" aria-labelledby="employeeDropdown">
                  <li>
                    <Link className="dropdown-item" to="/admin-dashboard/employees">
                      Employee Details
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin-dashboard/create-employee">
                      Create Employee
                    </Link>
                  </li>
                </ul>
              </li>

              {/* ===== Admin Profile Dropdown ===== */}
              <li className="nav-item dropdown mx-2">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="adminDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span>Admin</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="adminDropdown">
                  <li>
                    <Link className="dropdown-item" to="/admin-profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="dropdown-item">
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ===== Dashboard Content ===== */}
      <div className="container my-4">
        <h4 className="fw-bold" style={{ color: "white" }}>
          Hello, Admin 👋
        </h4>

        {/* Metric Cards */}
        <div className="row mt-4 g-4">
          <div className="col-md-3">
            <div className="dashboard-card text-center p-4">
              <i className="fas fa-users fa-2x text-primary mb-2"></i>
              <h6>Total Employees</h6>
              <h3>53</h3>
            </div>
          </div>
          <div className="col-md-3">
            <div className="dashboard-card text-center p-4">
              <i className="fas fa-user-check fa-2x text-success mb-2"></i>
              <h6>Present Today</h6>
              <h3>44</h3>
            </div>
          </div>
          <div className="col-md-3">
            <div className="dashboard-card text-center p-4">
              <i className="fas fa-user-clock fa-2x text-warning mb-2"></i>
              <h6>Late Today</h6>
              <h3>2</h3>
            </div>
          </div>
          <div className="col-md-3">
            <div className="dashboard-card text-center p-4">
              <i className="fas fa-user-times fa-2x text-danger mb-2"></i>
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
