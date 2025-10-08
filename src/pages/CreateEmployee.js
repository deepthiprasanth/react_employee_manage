// src/pages/CreateEmployee.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateEmployee() {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    branch: "",
    role: "USER",

    professionalDetails: {
      highestQualification: "",
      institution: "",
      yearOfPassing: "",
      technicalCertificates: "",
      previousEmployers: "",
      employmentStartDate: "",
      employmentEndDate: "",
      reasonOfLeaving: "",
      totalExperience: "",
      areasOfExpertise: "",
      qualificationCertificateFile: null,
      certificateFile: null,
      relievingLetterFile: null,
    },

    occupationalDetails: {
      employmentType: "",
      shiftType: "",
      offerLetterSigned: false,
      offerLetterFile: null,
      hasPassportPhoto: false,
      passportPhotoFile: null,
    },

    personalDetails: {
      dateOfBirth: "",
      gender: "",
      bloodGroup: "",
      maritalStatus: "",
      nationality: "",
      aadharNumber: "",
      panNumber: "",
      personalEmail: "",
      permanentAddress: "",
      communicationAddress: "",
      emergencyContactPerson: "",
      relationship: "",
      contactNumber: "",
      aadharFile: null,
      panFile: null,
    },

    salaryDetails: {
      basicPay: "",
      hra: "",
      conveyanceAllowance: "",
      specialAllowance: "",
      incentivePercent: "",
      grossSalary: "",
      pfDeduction: "",
      esiDeduction: "",
      totalDeductions: "",
      netSalary: "",
      paymentMode: "",
      bankName: "",
      bankAccountNumber: "",
      ifscCode: "",
      cancelledChequeFile: null,
    },
  });

  const handleNestedChange = (section, field, value) => {
    setEmployee((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (section, field, file) => {
    handleNestedChange(section, field, file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();

    // Basic Info
    formData.append("fullName", employee.fullName);
    formData.append("email", employee.email);
    formData.append("password", employee.password);
    formData.append("confirmPassword", employee.confirmPassword);
    formData.append("phoneNumber", employee.phoneNumber);
    formData.append("branch", employee.branch);
    formData.append("role", employee.role);

    // ProfessionalDetails
    Object.entries(employee.professionalDetails).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value instanceof File ? value : value);
      }
    });

    // OccupationalDetails
    Object.entries(employee.occupationalDetails).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value instanceof File ? value : value);
      }
    });

    // PersonalDetails
    Object.entries(employee.personalDetails).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value instanceof File ? value : value);
      }
    });

    // SalaryDetails
    Object.entries(employee.salaryDetails).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value instanceof File ? value : value);
      }
    });

    try {
      const res = await fetch("http://localhost:8080/api/admin/employees", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        alert("Employee created successfully!");
        navigate("/admin-dashboard/employees");
      } else {
        const data = await res.json();
        alert("Error: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        {/* ===== Basic Info ===== */}
        <h4>Basic Info</h4>
        <input className="form-control mb-2" name="fullName" placeholder="Full Name" onChange={handleChange} required />
        <input className="form-control mb-2" type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input className="form-control mb-2" type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input className="form-control mb-2" type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
        <input className="form-control mb-2" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required />
        <input className="form-control mb-2" name="branch" placeholder="Branch" onChange={handleChange} required />
        <select className="form-control mb-2" name="role" onChange={handleChange}>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        {/* ===== Professional Details ===== */}
        <h4>Professional Details</h4>
        <input className="form-control mb-2" placeholder="Highest Qualification" onChange={(e) => handleNestedChange("professionalDetails", "highestQualification", e.target.value)} />
        <input className="form-control mb-2" placeholder="Institution" onChange={(e) => handleNestedChange("professionalDetails", "institution", e.target.value)} />
        <input type="number" className="form-control mb-2" placeholder="Year of Passing" onChange={(e) => handleNestedChange("professionalDetails", "yearOfPassing", e.target.value)} />
        <input className="form-control mb-2" placeholder="Technical Certificates" onChange={(e) => handleNestedChange("professionalDetails", "technicalCertificates", e.target.value)} />
        <input className="form-control mb-2" placeholder="Previous Employers" onChange={(e) => handleNestedChange("professionalDetails", "previousEmployers", e.target.value)} />
        <input type="date" className="form-control mb-2" placeholder="Employment Start Date" onChange={(e) => handleNestedChange("professionalDetails", "employmentStartDate", e.target.value)} />
        <input type="date" className="form-control mb-2" placeholder="Employment End Date" onChange={(e) => handleNestedChange("professionalDetails", "employmentEndDate", e.target.value)} />
        <input className="form-control mb-2" placeholder="Reason of Leaving" onChange={(e) => handleNestedChange("professionalDetails", "reasonOfLeaving", e.target.value)} />
        <input type="number" className="form-control mb-2" placeholder="Total Experience" onChange={(e) => handleNestedChange("professionalDetails", "totalExperience", e.target.value)} />
        <input className="form-control mb-2" placeholder="Areas of Expertise" onChange={(e) => handleNestedChange("professionalDetails", "areasOfExpertise", e.target.value)} />
        <input type="file" className="form-control mb-2" onChange={(e) => handleFileChange("professionalDetails", "qualificationCertificateFile", e.target.files[0])} />
        <input type="file" className="form-control mb-2" onChange={(e) => handleFileChange("professionalDetails", "certificateFile", e.target.files[0])} />
        <input type="file" className="form-control mb-2" onChange={(e) => handleFileChange("professionalDetails", "relievingLetterFile", e.target.files[0])} />

        {/* ===== Occupational Details ===== */}
        <h4>Occupational Details</h4>
        <input className="form-control mb-2" placeholder="Employment Type" onChange={(e) => handleNestedChange("occupationalDetails", "employmentType", e.target.value)} />
        <input className="form-control mb-2" placeholder="Shift Type" onChange={(e) => handleNestedChange("occupationalDetails", "shiftType", e.target.value)} />
        <label>
          Offer Letter Signed:
          <input type="checkbox" className="ms-2" onChange={(e) => handleNestedChange("occupationalDetails", "offerLetterSigned", e.target.checked)} />
        </label>
        <input type="file" className="form-control mb-2" onChange={(e) => handleFileChange("occupationalDetails", "offerLetterFile", e.target.files[0])} />
        <label>
          Passport Photo:
          <input type="checkbox" className="ms-2" onChange={(e) => handleNestedChange("occupationalDetails", "hasPassportPhoto", e.target.checked)} />
        </label>
        <input type="file" className="form-control mb-2" onChange={(e) => handleFileChange("occupationalDetails", "passportPhotoFile", e.target.files[0])} />

        {/* ===== Personal Details ===== */}
        <h4>Personal Details</h4>
        <input type="date" className="form-control mb-2" onChange={(e) => handleNestedChange("personalDetails", "dateOfBirth", e.target.value)} />
        <input className="form-control mb-2" placeholder="Gender" onChange={(e) => handleNestedChange("personalDetails", "gender", e.target.value)} />
        <input className="form-control mb-2" placeholder="Blood Group" onChange={(e) => handleNestedChange("personalDetails", "bloodGroup", e.target.value)} />
        <input className="form-control mb-2" placeholder="Marital Status" onChange={(e) => handleNestedChange("personalDetails", "maritalStatus", e.target.value)} />
        <input className="form-control mb-2" placeholder="Nationality" onChange={(e) => handleNestedChange("personalDetails", "nationality", e.target.value)} />
        <input className="form-control mb-2" placeholder="Aadhar Number" onChange={(e) => handleNestedChange("personalDetails", "aadharNumber", e.target.value)} />
        <input className="form-control mb-2" placeholder="PAN Number" onChange={(e) => handleNestedChange("personalDetails", "panNumber", e.target.value)} />
        <input className="form-control mb-2" placeholder="Personal Email" onChange={(e) => handleNestedChange("personalDetails", "personalEmail", e.target.value)} />
        <input className="form-control mb-2" placeholder="Permanent Address" onChange={(e) => handleNestedChange("personalDetails", "permanentAddress", e.target.value)} />
        <input className="form-control mb-2" placeholder="Communication Address" onChange={(e) => handleNestedChange("personalDetails", "communicationAddress", e.target.value)} />
        <input className="form-control mb-2" placeholder="Emergency Contact Person" onChange={(e) => handleNestedChange("personalDetails", "emergencyContactPerson", e.target.value)} />
        <input className="form-control mb-2" placeholder="Relationship" onChange={(e) => handleNestedChange("personalDetails", "relationship", e.target.value)} />
        <input className="form-control mb-2" placeholder="Contact Number" onChange={(e) => handleNestedChange("personalDetails", "contactNumber", e.target.value)} />
        <input type="file" className="form-control mb-2" onChange={(e) => handleFileChange("personalDetails", "aadharFile", e.target.files[0])} />
        <input type="file" className="form-control mb-2" onChange={(e) => handleFileChange("personalDetails", "panFile", e.target.files[0])} />

        {/* ===== Salary Details ===== */}
        <h4>Salary Details</h4>
        <input type="number" className="form-control mb-2" placeholder="Basic Pay" onChange={(e) => handleNestedChange("salaryDetails", "basicPay", e.target.value)} />
        <input type="number" className="form-control mb-2" placeholder="HRA" onChange={(e) => handleNestedChange("salaryDetails", "hra", e.target.value)} />
        <input type="number" className="form-control mb-2" placeholder="Conveyance Allowance" onChange={(e) => handleNestedChange("salaryDetails", "conveyanceAllowance", e.target.value)} />
        <input type="number" className="form-control mb-2" placeholder="Special Allowance" onChange={(e) => handleNestedChange("salaryDetails", "specialAllowance", e.target.value)} />
        <input type="number" className="form-control mb-2" placeholder="Incentive Percent" onChange={(e) => handleNestedChange("salaryDetails", "incentivePercent", e.target.value)} />
        <input type="number" className="form-control mb-2" placeholder="Gross Salary" onChange={(e) => handleNestedChange("salaryDetails", "grossSalary", e.target.value)} />
        <input type="number" className="form-control mb-2" placeholder="PF Deduction" onChange={(e) => handleNestedChange("salaryDetails", "pfDeduction", e.target.value)} />
        <input type="number" className="form-control mb-2" placeholder="ESI Deduction" onChange={(e) => handleNestedChange("salaryDetails", "esiDeduction", e.target.value)} />
        <input type="number" className="form-control mb-2" placeholder="Total Deductions" onChange={(e) => handleNestedChange("salaryDetails", "totalDeductions", e.target.value)} />
        <input type="number" className="form-control mb-2" placeholder="Net Salary" onChange={(e) => handleNestedChange("salaryDetails", "netSalary", e.target.value)} />
        <input className="form-control mb-2" placeholder="Payment Mode" onChange={(e) => handleNestedChange("salaryDetails", "paymentMode", e.target.value)} />
        <input className="form-control mb-2" placeholder="Bank Name" onChange={(e) => handleNestedChange("salaryDetails", "bankName", e.target.value)} />
        <input className="form-control mb-2" placeholder="Bank Account Number" onChange={(e) => handleNestedChange("salaryDetails", "bankAccountNumber", e.target.value)} />
        <input className="form-control mb-2" placeholder="IFSC Code" onChange={(e) => handleNestedChange("salaryDetails", "ifscCode", e.target.value)} />
        <input type="file" className="form-control mb-2" onChange={(e) => handleFileChange("salaryDetails", "cancelledChequeFile", e.target.files[0])} />

        <button type="submit" className="btn btn-primary mt-3">Create Employee</button>
      </form>
    </div>
  );
}

export default CreateEmployee;  