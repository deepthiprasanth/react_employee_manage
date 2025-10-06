// src/pages/AdminDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";


const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token); // ✅ debug token

    const res = await axios.get("http://localhost:8080/api/admin/employees", {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Response data:", res.data); // ✅ see what backend returns
    setEmployees(res.data);
  } catch (err) {
    console.error("Error fetching employees:", err);
    if (err.response) {
      console.log("Status code:", err.response.status); // 403
      console.log("Response data:", err.response.data); // backend message
      console.log("Response headers:", err.response.headers);
    }
  }
};

  const deleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/api/admin/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(employees.filter((emp) => emp.id !== id));
    } catch (err) {
      console.error("❌ Error deleting employee:", err.response?.data || err.message);
    }
  };

  return (
        <div className="admin-dashboard">

        {/* Employee Table */}
        <div className=" row justify-content-center">
          {/* <div className="col-12 col-md-11 col-lg-10"> */}
            <div className="bg-white p-4 rounded shadow-sm mb-4">
              <h2 className="mb-3">Employee List</h2>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Username</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Department</th>
                      <th>Salary</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.length > 0 ? (
                      employees.map((emp) => (
                        <tr key={emp.id}>
                          <td>{emp.id}</td>
                          <td>{emp.username}</td>
                          <td>{emp.name}</td>
                          <td>{emp.email}</td>
                          <td>{emp.department}</td>
                          <td>{emp.salary}</td>
                          <td>{emp.role}</td>
                          <td>
                            <Link
                            to={`/admin-dashboard/employees/${emp.id}`}
                            className="btn btn-info btn-sm me-1"
                          >
                            View
                          </Link>

                          <Link
                            to={`/admin-dashboard/employees/${emp.id}/edit`}
                            className="btn btn-warning btn-sm me-1"
                          >
                            Edit
                          </Link>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteEmployee(emp.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center">
                          No employees found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          {/* </div> */}
        </div>

        {/* Footer */}
        <footer className="text-center  py-3">
          <p className="mb-0">&copy; {new Date().getFullYear()} Admin Dashboard</p>
        </footer>
      </div>
   
  );
};

export default EmployeeDetails;