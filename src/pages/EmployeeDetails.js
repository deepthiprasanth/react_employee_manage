import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8080/api/admin/employees", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Raw employee data:", res.data);

      // Ensure array and filter out ADMIN roles
      const nonAdmins = (Array.isArray(res.data) ? res.data : []).filter(
        (emp) => emp.role !== "ADMIN"
      );

      // Flatten nested fields for table display
      const flattened = nonAdmins.map((emp) => ({
        id: emp.id,
        fullName: emp.fullName || "-",
        email: emp.email || "-",
        phoneNumber: emp.phoneNumber || "-",
        branch: emp.branch || "-",
        role: emp.role || "-",
        designation: emp.professionalDetails?.designation || "-",
        experience: emp.professionalDetails?.experience || "-",
        dob: emp.personalDetails?.dob || "-",
        gender: emp.personalDetails?.gender || "-",
        department: emp.occupationalDetails?.department || "-",
      }));

      setEmployees(flattened);
    } catch (err) {
      console.error("Error fetching employees:", err.response?.data || err.message);
    }
  };

  const deleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/api/admin/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (err) {
      console.error("Error deleting employee:", err.response?.data || err.message);
    }
  };

  return (
    <div className="admin-dashboard">
      <button className="btn btn-primary mt-3" onClick={() => navigate("/admin-dashboard")}>
        Back to Employee List
      </button>

      <div className="row justify-content-center">
        <div className="bg-white p-4 rounded shadow-sm mb-4">
          <h2 className="mb-3">Employee List</h2>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Branch</th>
                  <th>Role</th>
                  <th>Designation</th>
                  <th>Experience</th>
                  <th>DOB</th>
                  <th>Gender</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.length > 0 ? (
                  employees.map((emp) => (
                    <tr key={emp.id}>
                      <td>{emp.id}</td>
                      <td>{emp.fullName}</td>
                      <td>{emp.email}</td>
                      <td>{emp.phoneNumber}</td>
                      <td>{emp.branch}</td>
                      <td>{emp.role}</td>
                      <td>{emp.designation}</td>
                      <td>{emp.experience}</td>
                      <td>{emp.dob}</td>
                      <td>{emp.gender}</td>
                      <td>{emp.department}</td>
                      <td>
                        <Link to={`/admin-dashboard/employees/${emp.id}`} className="btn btn-info btn-sm me-1">
                          View
                        </Link>
                        <Link to={`/admin-dashboard/employees/${emp.id}/edit`} className="btn btn-warning btn-sm me-1">
                          Edit
                        </Link>
                        <button className="btn btn-danger btn-sm" onClick={() => deleteEmployee(emp.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12" className="text-center">
                      No employees found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <footer className="text-center py-3">
        <p className="mb-0">&copy; {new Date().getFullYear()} Admin Dashboard</p>
      </footer>
    </div>
  );
};

export default EmployeeDetails;
