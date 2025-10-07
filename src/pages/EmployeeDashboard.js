// src/pages/EmployeeDashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  const [employee, setEmployee] = useState({
    id: "EMP001",
    name: "John Doe",
    email: "john.doe@example.com",
    department: "IT",
    role: "Employee",
    phone: "9876543210",
    joiningDate: "2023-01-15",
  });

  const navigate = useNavigate();

  // ✅ Check authentication on page load
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const role = localStorage.getItem("role");

    if (!isAuthenticated || role !== "EMPLOYEE") {
      navigate("/login"); // redirect to login if not employee or not logged in
    }
  }, [navigate]);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="bg02">
      <div className="container">
        {/* Navbar */}
        <div className="row">
          <div className="col-12">
            <nav className="navbar navbar-expand-xl navbar-light bg-light">
              <a className="navbar-brand" href="#">
                <i className="fas fa-3x fa-user-tie tm-site-icon"></i>
                <h1 className="tm-site-title mb-0">Employee Dashboard</h1>
              </a>
              <button
                className="navbar-toggler ml-auto mr-0"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <button onClick={handleLogout} className="btn nav-link d-flex">
                      <i className="far fa-user mr-2 tm-logout-icon"></i>
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>

        {/* Employee Details */}
        <div className="row tm-mt-big">
          <div className="col-xl-8 col-lg-10 col-md-12 col-sm-12 mx-auto">
            <div className="bg-white tm-block h-100 p-4 rounded shadow-sm">
              <h2 className="tm-block-title">Employee Details</h2>
              <div className="row mt-4">
                <div className="col-md-6">
                  <p><strong>ID:</strong> {employee.id}</p>
                  <p><strong>Name:</strong> {employee.name}</p>
                  <p><strong>Email:</strong> {employee.email}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Department:</strong> {employee.department}</p>
                  <p><strong>Role:</strong> {employee.role}</p>
                  <p><strong>Phone:</strong> {employee.phone}</p>
                  <p><strong>Joining Date:</strong> {employee.joiningDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="row tm-mt-small">
          <div className="col-12 font-weight-light">
            <p className="d-inline-block tm-bg-black text-white py-2 px-4">
              Copyright © 2025 Employee Dashboard.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
