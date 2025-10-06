import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EmployeeForm.css"; 

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    username: "",
    email: "",
    phoneNumber: "",
    address: "",
    department: "",
    salary: "",
    role: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8080/api/admin/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setEmployee(res.data))
      .catch((err) => console.error("Error fetching employee:", err));
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .put(`http://localhost:8080/api/admin/employees/${id}`, employee, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert("Employee updated successfully!");
        navigate("/admin-dashboard");
      })
      .catch((err) => {
        console.error("Failed to update employee", err);
        alert("Update failed. Check console.");
      });
  };

  return (
    <div className="container mt-4  employee-form">
        <div className="text-center mb-4">
      <h2 >Edit Employee</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={handleChange}
          placeholder="Name"
          className="form-control mb-2"
        />
        <input
          type="text"
          name="username"
          value={employee.username}
          onChange={handleChange}
          placeholder="Username"
          className="form-control mb-2"
        />
        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          placeholder="Email"
          className="form-control mb-2"
        />
        <input
          type="text"
          name="phoneNumber"
          value={employee.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          className="form-control mb-2"
        />
        <input
          type="text"
          name="address"
          value={employee.address}
          onChange={handleChange}
          placeholder="Address"
          className="form-control mb-2"
        />
        <input
          type="text"
          name="department"
          value={employee.department}
          onChange={handleChange}
          placeholder="Department"
          className="form-control mb-2"
        />
        <input
          type="number"
          name="salary"
          value={employee.salary}
          onChange={handleChange}
          placeholder="Salary"
          className="form-control mb-2"
        />
        <select
          name="role"
          value={employee.role}
          onChange={handleChange}
          className="form-control mb-3"
        >
          <option value="">Select Role</option>
          <option value="ADMIN">Admin</option>
          <option value="USER">User</option>
          <option value="MANAGER">Manager</option>
        </select>

        <button type="submit" className="btn btn-primary text-center">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditEmployee;
