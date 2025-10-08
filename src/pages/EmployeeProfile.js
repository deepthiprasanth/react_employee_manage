import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeeProfile = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:8080/api/admin/employees/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data;

        // ✅ Flatten nested objects (employee, professional, personal, etc.)
        const flatData = {
          ...data,
          ...data.employee, // brings fullName, phoneNumber, email, etc. to top
          ...data.professionalDetails,
          ...data.occupationalDetails,
          ...data.personalDetails,
          ...data.salaryDetails,
        };

        setEmployee(flatData);
      } catch (error) {
        console.error("Failed to fetch employee details:", error);
      }
    };

    fetchEmployee();
  }, [id]);

  if (!employee) {
    return (
      <div className="text-center mt-5">
        <h4>Loading Employee Profile...</h4>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/admin-dashboard/employees")}
        >
          Back to Employee List
        </button>

      <div className="card p-4">
        <h3 className="mb-4">Employee Profile</h3>

        {/* BASIC INFO */}
        <h5 className="mb-3">Basic Info</h5>
        <table className="table table-bordered">
          <tbody>
            <tr><th>ID</th><td>{employee.id || "-"}</td></tr>
            <tr><th>Full Name</th><td>{employee.fullName || "-"}</td></tr>
            <tr><th>Email</th><td>{employee.email || "-"}</td></tr>
            <tr><th>Phone</th><td>{employee.phoneNumber || "-"}</td></tr>
            <tr><th>Branch</th><td>{employee.branch || "-"}</td></tr>
            <tr><th>Role</th><td>{employee.role || "-"}</td></tr>
          </tbody>
        </table>

        {/* PROFESSIONAL DETAILS */}
        <h5 className="mt-4 mb-3">Professional Details</h5>
        <table className="table table-bordered">
          <tbody>
            <tr><th>Designation</th><td>{employee.designation || "-"}</td></tr>
            <tr><th>Experience</th><td>{employee.totalExperience || "-"}</td></tr>
            <tr><th>Highest Qualification</th><td>{employee.highestQualification || "-"}</td></tr>
            <tr><th>Institution</th><td>{employee.institution || "-"}</td></tr>
            <tr><th>Year of Passing</th><td>{employee.yearOfPassing || "-"}</td></tr>
          </tbody>
        </table>

        {/* OCCUPATIONAL DETAILS */}
        <h5 className="mt-4 mb-3">Occupational Details</h5>
        <table className="table table-bordered">
          <tbody>
            <tr><th>Employment Start Date</th><td>{employee.employmentStartDate || "-"}</td></tr>
            <tr><th>Employment End Date</th><td>{employee.employmentEndDate || "-"}</td></tr>
            <tr><th>Reason of Leaving</th><td>{employee.reasonOfLeaving || "-"}</td></tr>
          </tbody>
        </table>

        {/* PERSONAL DETAILS */}
        <h5 className="mt-4 mb-3">Personal Details</h5>
        <table className="table table-bordered">
          <tbody>
            <tr><th>Gender</th><td>{employee.gender || "-"}</td></tr>
            <tr><th>Date of Birth</th><td>{employee.dateOfBirth || "-"}</td></tr>
            <tr><th>Address</th><td>{employee.address || "-"}</td></tr>
          </tbody>
        </table>

        {/* SALARY DETAILS */}
        <h5 className="mt-4 mb-3">Salary Details</h5>
        <table className="table table-bordered">
          <tbody>
            <tr><th>Basic Pay</th><td>{employee.basicPay || "-"}</td></tr>
            <tr><th>Allowances</th><td>{employee.allowances || "-"}</td></tr>
            <tr><th>Total Salary</th><td>{employee.totalSalary || "-"}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeProfile;
