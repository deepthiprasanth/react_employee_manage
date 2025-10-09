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

      // Debug: Check the actual structure
      console.log("=== EMPLOYEE DATA STRUCTURE ===");
      console.log("Main object:", res.data);
      console.log("Professional details:", res.data.professionalDetails);
      console.log("Personal details:", res.data.personalDetails);
      console.log("Occupational details:", res.data.occupationalDetails);
      console.log("Salary details:", res.data.salaryDetails);
      
      setEmployee(res.data);
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
            <tr>
              <th>Highest Qualification</th>
              <td>{employee.professionalDetails?.highestQualification || "-"}</td>
            </tr>
            <tr>
              <th>Institution</th>
              <td>{employee.professionalDetails?.institution || "-"}</td>
            </tr>
            <tr>
              <th>Year of Passing</th>
              <td>{employee.professionalDetails?.yearOfPassing || "-"}</td>
            </tr>
            <tr>
              <th>Total Experience</th>
              <td>{employee.professionalDetails?.totalExperience || "-"}</td>
            </tr>
            <tr>
              <th>Areas of Expertise</th>
              <td>{employee.professionalDetails?.areasOfExpertise || "-"}</td>
            </tr>
          </tbody>
        </table>

        {/* OCCUPATIONAL DETAILS */}
        <h5 className="mt-4 mb-3">Occupational Details</h5>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>Employment Type</th>
              <td>{employee.occupationalDetails?.employmentType || "-"}</td>
            </tr>
            <tr>
              <th>Shift Type</th>
              <td>{employee.occupationalDetails?.shiftType || "-"}</td>
            </tr>
            <tr>
              <th>Offer Letter Signed</th>
              <td>{employee.occupationalDetails?.offerLetterSigned ? "Yes" : "No"}</td>
            </tr>
          </tbody>
        </table>

        {/* PERSONAL DETAILS */}
        <h5 className="mt-4 mb-3">Personal Details</h5>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>Date of Birth</th>
              <td>{employee.personalDetails?.dateOfBirth || "-"}</td>
            </tr>
            <tr>
              <th>Gender</th>
              <td>{employee.personalDetails?.gender || "-"}</td>
            </tr>
            <tr>
              <th>Blood Group</th>
              <td>{employee.personalDetails?.bloodGroup || "-"}</td>
            </tr>
            <tr>
              <th>Marital Status</th>
              <td>{employee.personalDetails?.maritalStatus || "-"}</td>
            </tr>
            <tr>
              <th>Aadhar Number</th>
              <td>{employee.personalDetails?.aadharNumber || "-"}</td>
            </tr>
            <tr>
              <th>PAN Number</th>
              <td>{employee.personalDetails?.panNumber || "-"}</td>
            </tr>
          </tbody>
        </table>

        {/* SALARY DETAILS */}
        <h5 className="mt-4 mb-3">Salary Details</h5>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>Basic Pay</th>
              <td>{employee.salaryDetails?.basicPay || "-"}</td>
            </tr>
            <tr>
              <th>HRA</th>
              <td>{employee.salaryDetails?.hra || "-"}</td>
            </tr>
            <tr>
              <th>Gross Salary</th>
              <td>{employee.salaryDetails?.grossSalary || "-"}</td>
            </tr>
            <tr>
              <th>Net Salary</th>
              <td>{employee.salaryDetails?.netSalary || "-"}</td>
            </tr>
            <tr>
              <th>Bank Name</th>
              <td>{employee.salaryDetails?.bankName || "-"}</td>
            </tr>
            <tr>
              <th>Account Number</th>
              <td>{employee.salaryDetails?.bankAccountNumber || "-"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeProfile;