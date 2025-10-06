// src/pages/AdminDashboard.js
import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminDashboard.css";

const AdminDashboard = () => {
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
                    <li className="nav-item">
                <Link to="/admin-dashboard/create-employee" className="btn">
                  Create Employee
                </Link>
              </li>
                </ul>
              </li>

              {/* ===== Admin Profile Dropdown ===== */}
              <li className="nav-item dropdown mx-2">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  href="#"
                  id="adminDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {/* <img
                    src="https://via.placeholder.com/35"
                    alt="Admin"
                    className="rounded-circle me-2"
                    width="35"
                    height="35"
                  /> */}
                  <span>Newadmin</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="adminDropdown">
                  <li>
                    <Link className="dropdown-item" to="/admin-profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/login">
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ===== Dashboard Content ===== */}
      <div className="container my-4">
        <h4 className="fw-bold " style={{ color: "white" }}>Hello, Admin 👋</h4>

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

        {/* Employee Lists */}
        <div className="row mt-5 g-4">
          <div className="col-md-6">
            <div className="dashboard-card p-4">
              <h5>Employees Present</h5>
              <ul className="list-group list-group-flush mt-3">
                <li className="list-group-item d-flex align-items-center justify-content-between">
                  <div>
                    <img
                      src="https://via.placeholder.com/40"
                      alt="Emp"
                      className="rounded-circle me-2"
                    />
                    <span>Kitty</span>
                  </div>
                  <span className="text-muted small">09:02 AM</span>
                </li>
                <li className="list-group-item d-flex align-items-center justify-content-between">
                  <div>
                    <img
                      src="https://via.placeholder.com/40"
                      alt="Emp"
                      className="rounded-circle me-2"
                    />
                    <span>Olivia</span>
                  </div>
                  <span className="text-muted small">09:04 AM</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-6">
            <div className="dashboard-card p-4">
              <h5>Employees on Leave</h5>
              <ul className="list-group list-group-flush mt-3">
                <li className="list-group-item d-flex align-items-center justify-content-between">
                  <div>
                    <img
                      src="https://via.placeholder.com/40"
                      alt="Emp"
                      className="rounded-circle me-2"
                    />
                    <span>Peter</span>
                  </div>
                  <span className="text-muted small">2/3 days</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
