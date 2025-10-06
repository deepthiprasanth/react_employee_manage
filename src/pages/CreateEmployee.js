// src/pages/CreateEmployee.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateEmployee() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    department: "",
    salary: "",
    role: "USER"
  });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // JWT token
      const res = await fetch("http://localhost:8080/api/admin/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(employee),
      });

      if (res.ok) {
        alert("Employee created successfully!");
        navigate("/admin-dashboard/employees"); // Redirect to dashboard
      } else {
        const data = await res.json();
        alert("Error creating employee: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <input className="form-control mb-2" name="username" placeholder="Username" onChange={handleChange} required />
        <input className="form-control mb-2" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input className="form-control mb-2" type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input className="form-control mb-2" type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input className="form-control mb-2" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
        <input className="form-control mb-2" name="address" placeholder="Address" onChange={handleChange} />
        <input className="form-control mb-2" name="department" placeholder="Department" onChange={handleChange} />
        <input className="form-control mb-2" type="number" name="salary" placeholder="Salary" onChange={handleChange} />
        
        <select className="form-control mb-2" name="role" onChange={handleChange}>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <button type="submit" className="btn btn-primary mt-2">Create Employee</button>
      </form>
    </div>
  );
}

export default CreateEmployee;
