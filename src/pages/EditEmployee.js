import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EmployeeForm.css";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    // Basic Info
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    branch: "",
    role: "USER",

    // Professional Details
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

    // Occupational Details
    occupationalDetails: {
      employmentType: "",
      shiftType: "",
      offerLetterSigned: false,
      offerLetterFile: null,
      hasPassportPhoto: false,
      passportPhotoFile: null,
    },

    // Personal Details
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

    // Salary Details
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

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:8080/api/admin/employees/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data;
        
        // Map the API response to your state structure
        setEmployee({
          // Basic Info
          fullName: data.fullName || "",
          email: data.email || "",
          password: "", // Don't pre-fill password for security
          confirmPassword: "",
          phoneNumber: data.phoneNumber || "",
          branch: data.branch || "",
          role: data.role || "USER",

          // Professional Details
          professionalDetails: {
            highestQualification: data.professionalDetails?.highestQualification || "",
            institution: data.professionalDetails?.institution || "",
            yearOfPassing: data.professionalDetails?.yearOfPassing || "",
            technicalCertificates: data.professionalDetails?.technicalCertificates || "",
            previousEmployers: data.professionalDetails?.previousEmployers || "",
            employmentStartDate: data.professionalDetails?.employmentStartDate || "",
            employmentEndDate: data.professionalDetails?.employmentEndDate || "",
            reasonOfLeaving: data.professionalDetails?.reasonOfLeaving || "",
            totalExperience: data.professionalDetails?.totalExperience || "",
            areasOfExpertise: data.professionalDetails?.areasOfExpertise || "",
            qualificationCertificateFile: null, // Files are handled separately
            certificateFile: null,
            relievingLetterFile: null,
          },

          // Occupational Details
          occupationalDetails: {
            employmentType: data.occupationalDetails?.employmentType || "",
            shiftType: data.occupationalDetails?.shiftType || "",
            offerLetterSigned: data.occupationalDetails?.offerLetterSigned || false,
            offerLetterFile: null,
            hasPassportPhoto: data.occupationalDetails?.hasPassportPhoto || false,
            passportPhotoFile: null,
          },

          // Personal Details
          personalDetails: {
            dateOfBirth: data.personalDetails?.dateOfBirth || "",
            gender: data.personalDetails?.gender || "",
            bloodGroup: data.personalDetails?.bloodGroup || "",
            maritalStatus: data.personalDetails?.maritalStatus || "",
            nationality: data.personalDetails?.nationality || "",
            aadharNumber: data.personalDetails?.aadharNumber || "",
            panNumber: data.personalDetails?.panNumber || "",
            personalEmail: data.personalDetails?.personalEmail || "",
            permanentAddress: data.personalDetails?.permanentAddress || "",
            communicationAddress: data.personalDetails?.communicationAddress || "",
            emergencyContactPerson: data.personalDetails?.emergencyContactPerson || "",
            relationship: data.personalDetails?.relationship || "",
            contactNumber: data.personalDetails?.contactNumber || "",
            aadharFile: null,
            panFile: null,
          },

          // Salary Details
          salaryDetails: {
            basicPay: data.salaryDetails?.basicPay || "",
            hra: data.salaryDetails?.hra || "",
            conveyanceAllowance: data.salaryDetails?.conveyanceAllowance || "",
            specialAllowance: data.salaryDetails?.specialAllowance || "",
            incentivePercent: data.salaryDetails?.incentivePercent || "",
            grossSalary: data.salaryDetails?.grossSalary || "",
            pfDeduction: data.salaryDetails?.pfDeduction || "",
            esiDeduction: data.salaryDetails?.esiDeduction || "",
            totalDeductions: data.salaryDetails?.totalDeductions || "",
            netSalary: data.salaryDetails?.netSalary || "",
            paymentMode: data.salaryDetails?.paymentMode || "",
            bankName: data.salaryDetails?.bankName || "",
            bankAccountNumber: data.salaryDetails?.bankAccountNumber || "",
            ifscCode: data.salaryDetails?.ifscCode || "",
            cancelledChequeFile: null,
          },
        });
      } catch (err) {
        console.error("Error fetching employee:", err);
        alert("Failed to load employee data");
      }
    };

    fetchEmployee();
  }, [id]);

  const handleNestedChange = (section, field, value) => {
    setEmployee((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleBasicChange = (e) => {
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
    if (employee.password) {
      formData.append("password", employee.password);
    }
    if (employee.confirmPassword) {
      formData.append("confirmPassword", employee.confirmPassword);
    }
    formData.append("phoneNumber", employee.phoneNumber);
    formData.append("branch", employee.branch);
    formData.append("role", employee.role);

    // Professional Details
    const prof = employee.professionalDetails;
    formData.append("highestQualification", prof.highestQualification);
    formData.append("institution", prof.institution);
    formData.append("yearOfPassing", prof.yearOfPassing);
    formData.append("technicalCertificates", prof.technicalCertificates);
    formData.append("previousEmployers", prof.previousEmployers);
    formData.append("employmentStartDate", prof.employmentStartDate);
    formData.append("employmentEndDate", prof.employmentEndDate);
    formData.append("reasonOfLeaving", prof.reasonOfLeaving);
    formData.append("totalExperience", prof.totalExperience);
    formData.append("areasOfExpertise", prof.areasOfExpertise);
    if (prof.qualificationCertificateFile) {
      formData.append("qualificationCertificateFile", prof.qualificationCertificateFile);
    }
    if (prof.certificateFile) {
      formData.append("certificateFile", prof.certificateFile);
    }
    if (prof.relievingLetterFile) {
      formData.append("relievingLetterFile", prof.relievingLetterFile);
    }

    // Occupational Details
    const occ = employee.occupationalDetails;
    formData.append("employmentType", occ.employmentType);
    formData.append("shiftType", occ.shiftType);
    formData.append("offerLetterSigned", occ.offerLetterSigned);
    if (occ.offerLetterFile) {
      formData.append("offerLetterFile", occ.offerLetterFile);
    }
    formData.append("hasPassportPhoto", occ.hasPassportPhoto);
    if (occ.passportPhotoFile) {
      formData.append("passportPhotoFile", occ.passportPhotoFile);
    }

    // Personal Details
    const personal = employee.personalDetails;
    formData.append("dateOfBirth", personal.dateOfBirth);
    formData.append("gender", personal.gender);
    formData.append("bloodGroup", personal.bloodGroup);
    formData.append("maritalStatus", personal.maritalStatus);
    formData.append("nationality", personal.nationality);
    formData.append("aadharNumber", personal.aadharNumber);
    formData.append("panNumber", personal.panNumber);
    formData.append("personalEmail", personal.personalEmail);
    formData.append("permanentAddress", personal.permanentAddress);
    formData.append("communicationAddress", personal.communicationAddress);
    formData.append("emergencyContactPerson", personal.emergencyContactPerson);
    formData.append("relationship", personal.relationship);
    formData.append("contactNumber", personal.contactNumber);
    if (personal.aadharFile) {
      formData.append("aadharFile", personal.aadharFile);
    }
    if (personal.panFile) {
      formData.append("panFile", personal.panFile);
    }

    // Salary Details
    const salary = employee.salaryDetails;
    formData.append("basicPay", salary.basicPay);
    formData.append("hra", salary.hra);
    formData.append("conveyanceAllowance", salary.conveyanceAllowance);
    formData.append("specialAllowance", salary.specialAllowance);
    formData.append("incentivePercent", salary.incentivePercent);
    formData.append("grossSalary", salary.grossSalary);
    formData.append("pfDeduction", salary.pfDeduction);
    formData.append("esiDeduction", salary.esiDeduction);
    formData.append("totalDeductions", salary.totalDeductions);
    formData.append("netSalary", salary.netSalary);
    formData.append("paymentMode", salary.paymentMode);
    formData.append("bankName", salary.bankName);
    formData.append("bankAccountNumber", salary.bankAccountNumber);
    formData.append("ifscCode", salary.ifscCode);
    if (salary.cancelledChequeFile) {
      formData.append("cancelledChequeFile", salary.cancelledChequeFile);
    }

    try {
      const res = await axios.put(`http://localhost:8080/api/admin/employees/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        alert("Employee updated successfully!");
        navigate("/admin-dashboard/employees");
      }
    } catch (err) {
      console.error("Error updating employee:", err);
      alert("Failed to update employee. Check console for details.");
    }
  };

  return (
    <div className="container mt-4 employee-form">
      <div className="text-center mb-4">
        <h2>Edit Employee</h2>
      </div>

      <form onSubmit={handleSubmit}>
        {/* ===== Basic Information ===== */}
        <div className="card p-4 mb-4">
          <h4 className="mb-3">Basic Information</h4>
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                name="fullName"
                value={employee.fullName}
                onChange={handleBasicChange}
                placeholder="Full Name"
                className="form-control mb-2"
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="email"
                name="email"
                value={employee.email}
                onChange={handleBasicChange}
                placeholder="Email"
                className="form-control mb-2"
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="password"
                name="password"
                value={employee.password}
                onChange={handleBasicChange}
                placeholder="New Password (leave blank to keep current)"
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <input
                type="password"
                name="confirmPassword"
                value={employee.confirmPassword}
                onChange={handleBasicChange}
                placeholder="Confirm New Password"
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="phoneNumber"
                value={employee.phoneNumber}
                onChange={handleBasicChange}
                placeholder="Phone Number"
                className="form-control mb-2"
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="branch"
                value={employee.branch}
                onChange={handleBasicChange}
                placeholder="Branch"
                className="form-control mb-2"
                required
              />
            </div>
            <div className="col-md-6">
              <select
                name="role"
                value={employee.role}
                onChange={handleBasicChange}
                className="form-control mb-2"
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
          </div>
        </div>

        {/* ===== Professional Details ===== */}
        <div className="card p-4 mb-4">
          <h4 className="mb-3">Professional Details</h4>
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                value={employee.professionalDetails.highestQualification}
                onChange={(e) => handleNestedChange("professionalDetails", "highestQualification", e.target.value)}
                placeholder="Highest Qualification"
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                value={employee.professionalDetails.institution}
                onChange={(e) => handleNestedChange("professionalDetails", "institution", e.target.value)}
                placeholder="Institution"
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                value={employee.professionalDetails.yearOfPassing}
                onChange={(e) => handleNestedChange("professionalDetails", "yearOfPassing", e.target.value)}
                placeholder="Year of Passing"
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                value={employee.professionalDetails.technicalCertificates}
                onChange={(e) => handleNestedChange("professionalDetails", "technicalCertificates", e.target.value)}
                placeholder="Technical Certificates"
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                value={employee.professionalDetails.previousEmployers}
                onChange={(e) => handleNestedChange("professionalDetails", "previousEmployers", e.target.value)}
                placeholder="Previous Employers"
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <input
                type="date"
                value={employee.professionalDetails.employmentStartDate}
                onChange={(e) => handleNestedChange("professionalDetails", "employmentStartDate", e.target.value)}
                placeholder="Employment Start Date"
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <input
                type="date"
                value={employee.professionalDetails.employmentEndDate}
                onChange={(e) => handleNestedChange("professionalDetails", "employmentEndDate", e.target.value)}
                placeholder="Employment End Date"
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                value={employee.professionalDetails.reasonOfLeaving}
                onChange={(e) => handleNestedChange("professionalDetails", "reasonOfLeaving", e.target.value)}
                placeholder="Reason of Leaving"
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                step="0.1"
                value={employee.professionalDetails.totalExperience}
                onChange={(e) => handleNestedChange("professionalDetails", "totalExperience", e.target.value)}
                placeholder="Total Experience (years)"
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                value={employee.professionalDetails.areasOfExpertise}
                onChange={(e) => handleNestedChange("professionalDetails", "areasOfExpertise", e.target.value)}
                placeholder="Areas of Expertise"
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-4">
              <label>Qualification Certificate</label>
              <input
                type="file"
                onChange={(e) => handleFileChange("professionalDetails", "qualificationCertificateFile", e.target.files[0])}
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-4">
              <label>Certificate File</label>
              <input
                type="file"
                onChange={(e) => handleFileChange("professionalDetails", "certificateFile", e.target.files[0])}
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-4">
              <label>Relieving Letter</label>
              <input
                type="file"
                onChange={(e) => handleFileChange("professionalDetails", "relievingLetterFile", e.target.files[0])}
                className="form-control mb-2"
              />
            </div>
          </div>
        </div>

        {/* ===== Occupational Details ===== */}
        <div className="card p-4 mb-4">
          <h4 className="mb-3">Occupational Details</h4>
          <div className="row">
            <div className="col-md-6">
              <select
                value={employee.occupationalDetails.employmentType}
                onChange={(e) => handleNestedChange("occupationalDetails", "employmentType", e.target.value)}
                className="form-control mb-2"
              >
                <option value="">Select Employment Type</option>
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="CONTRACT">Contract</option>
              </select>
            </div>
            <div className="col-md-6">
              <select
                value={employee.occupationalDetails.shiftType}
                onChange={(e) => handleNestedChange("occupationalDetails", "shiftType", e.target.value)}
                className="form-control mb-2"
              >
                <option value="">Select Shift Type</option>
                <option value="DAY">Day</option>
                <option value="NIGHT">Night</option>
                <option value="FLEXIBLE">Flexible</option>
              </select>
            </div>
            <div className="col-md-6">
              <div className="form-check mb-2">
                <input
                  type="checkbox"
                  checked={employee.occupationalDetails.offerLetterSigned}
                  onChange={(e) => handleNestedChange("occupationalDetails", "offerLetterSigned", e.target.checked)}
                  className="form-check-input"
                />
                <label className="form-check-label">Offer Letter Signed</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-check mb-2">
                <input
                  type="checkbox"
                  checked={employee.occupationalDetails.hasPassportPhoto}
                  onChange={(e) => handleNestedChange("occupationalDetails", "hasPassportPhoto", e.target.checked)}
                  className="form-check-input"
                />
                <label className="form-check-label">Has Passport Photo</label>
              </div>
            </div>
            <div className="col-md-6">
              <label>Offer Letter File</label>
              <input
                type="file"
                onChange={(e) => handleFileChange("occupationalDetails", "offerLetterFile", e.target.files[0])}
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <label>Passport Photo</label>
              <input
                type="file"
                onChange={(e) => handleFileChange("occupationalDetails", "passportPhotoFile", e.target.files[0])}
                className="form-control mb-2"
              />
            </div>
          </div>
        </div>

        {/* ===== Personal Details ===== */}
        <div className="card p-4 mb-4">
          <h4 className="mb-3">Personal Details</h4>
          <div className="row">
            <div className="col-md-6">
              <input
                type="date"
                value={employee.personalDetails.dateOfBirth}
                onChange={(e) => handleNestedChange("personalDetails", "dateOfBirth", e.target.value)}
                placeholder="Date of Birth"
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <select
                value={employee.personalDetails.gender}
                onChange={(e) => handleNestedChange("personalDetails", "gender", e.target.value)}
                className="form-control mb-2"
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div className="col-md-6">
              <input
                type="text"
                value={employee.personalDetails.bloodGroup}
                onChange={(e) => handleNestedChange("personalDetails", "bloodGroup", e.target.value)}
                placeholder="Blood Group"
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <select
                value={employee.personalDetails.maritalStatus}
                onChange={(e) => handleNestedChange("personalDetails", "maritalStatus", e.target.value)}
                className="form-control mb-2"
              >
                <option value="">Select Marital Status</option>
                <option value="SINGLE">Single</option>
                <option value="MARRIED">Married</option>
                <option value="DIVORCED">Divorced</option>
              </select>
            </div>
            <div className="col-md-6">
              <input
                type="text"
                value={employee.personalDetails.nationality}
                onChange={(e) => handleNestedChange("personalDetails", "nationality", e.target.value)}
                placeholder="Nationality"
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                value={employee.personalDetails.aadharNumber}
                onChange={(e) => handleNestedChange("personalDetails", "aadharNumber", e.target.value)}
                placeholder="Aadhar Number"
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                value={employee.personalDetails.panNumber}
                onChange={(e) => handleNestedChange("personalDetails", "panNumber", e.target.value)}
                placeholder="PAN Number"
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <input
                type="email"
                value={employee.personalDetails.personalEmail}
                onChange={(e) => handleNestedChange("personalDetails", "personalEmail", e.target.value)}
                placeholder="Personal Email"
                className="form-control mb-2"
              />
            </div>
            <div className="col-12">
              <textarea
                value={employee.personalDetails.permanentAddress}
                onChange={(e) => handleNestedChange("personalDetails", "permanentAddress", e.target.value)}
                placeholder="Permanent Address"
                className="form-control mb-2"
                rows="3"
              />
            </div>
            <div className="col-12">
              <textarea
                value={employee.personalDetails.communicationAddress}
                onChange={(e) => handleNestedChange("personalDetails", "communicationAddress", e.target.value)}
                placeholder="Communication Address"
                className="form-control mb-2"
                rows="3"
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                value={employee.personalDetails.emergencyContactPerson}
                onChange={(e) => handleNestedChange("personalDetails", "emergencyContactPerson", e.target.value)}
                placeholder="Emergency Contact Person"
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                value={employee.personalDetails.relationship}
                onChange={(e) => handleNestedChange("personalDetails", "relationship", e.target.value)}
                placeholder="Relationship"
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                value={employee.personalDetails.contactNumber}
                onChange={(e) => handleNestedChange("personalDetails", "contactNumber", e.target.value)}
                placeholder="Emergency Contact Number"
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <label>Aadhar File</label>
              <input
                type="file"
                onChange={(e) => handleFileChange("personalDetails", "aadharFile", e.target.files[0])}
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <label>PAN File</label>
              <input
                type="file"
                onChange={(e) => handleFileChange("personalDetails", "panFile", e.target.files[0])}
                className="form-control mb-2"
              />
            </div>
          </div>
        </div>

        {/* ===== Salary Details ===== */}
        <div className="card p-4 mb-4">
          <h4 className="mb-3">Salary Details</h4>
          <div className="row">
            <div className="col-md-6">
              <input
                type="number"
                step="0.01"
                value={employee.salaryDetails.basicPay}
                onChange={(e) => handleNestedChange("salaryDetails", "basicPay", e.target.value)}
                placeholder="Basic Pay"
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                step="0.01"
                value={employee.salaryDetails.hra}
                onChange={(e) => handleNestedChange("salaryDetails", "hra", e.target.value)}
                placeholder="HRA"
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                step="0.01"
                value={employee.salaryDetails.conveyanceAllowance}
                onChange={(e) => handleNestedChange("salaryDetails", "conveyanceAllowance", e.target.value)}
                placeholder="Conveyance Allowance"
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                step="0.01"
                value={employee.salaryDetails.specialAllowance}
                onChange={(e) => handleNestedChange("salaryDetails", "specialAllowance", e.target.value)}
                placeholder="Special Allowance"
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                step="0.01"
                value={employee.salaryDetails.incentivePercent}
                onChange={(e) => handleNestedChange("salaryDetails", "incentivePercent", e.target.value)}
                placeholder="Incentive %"
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                step="0.01"
                value={employee.salaryDetails.grossSalary}
                onChange={(e) => handleNestedChange("salaryDetails", "grossSalary", e.target.value)}
                placeholder="Gross Salary"
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                step="0.01"
                value={employee.salaryDetails.pfDeduction}
                onChange={(e) => handleNestedChange("salaryDetails", "pfDeduction", e.target.value)}
                placeholder="PF Deduction"
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                step="0.01"
                value={employee.salaryDetails.esiDeduction}
                onChange={(e) => handleNestedChange("salaryDetails", "esiDeduction", e.target.value)}
                placeholder="ESI Deduction"
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                step="0.01"
                value={employee.salaryDetails.totalDeductions}
                onChange={(e) => handleNestedChange("salaryDetails", "totalDeductions", e.target.value)}
                placeholder="Total Deductions"
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                step="0.01"
                value={employee.salaryDetails.netSalary}
                onChange={(e) => handleNestedChange("salaryDetails", "netSalary", e.target.value)}
                placeholder="Net Salary"
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <select
                value={employee.salaryDetails.paymentMode}
                onChange={(e) => handleNestedChange("salaryDetails", "paymentMode", e.target.value)}
                className="form-control mb-2"
              >
                <option value="">Select Payment Mode</option>
                <option value="BANK_TRANSFER">Bank Transfer</option>
                <option value="CASH">Cash</option>
                <option value="CHEQUE">Cheque</option>
              </select>
            </div>
            <div className="col-md-6">
              <input
                type="text"
                value={employee.salaryDetails.bankName}
                onChange={(e) => handleNestedChange("salaryDetails", "bankName", e.target.value)}
                placeholder="Bank Name"
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                value={employee.salaryDetails.bankAccountNumber}
                onChange={(e) => handleNestedChange("salaryDetails", "bankAccountNumber", e.target.value)}
                placeholder="Bank Account Number"
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                value={employee.salaryDetails.ifscCode}
                onChange={(e) => handleNestedChange("salaryDetails", "ifscCode", e.target.value)}
                placeholder="IFSC Code"
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <label>Cancelled Cheque File</label>
              <input
                type="file"
                onChange={(e) => handleFileChange("salaryDetails", "cancelledChequeFile", e.target.files[0])}
                className="form-control mb-2"
              />
            </div>
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-lg">
            Update Employee
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-lg ms-2"
            onClick={() => navigate("/admin-dashboard/employees")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditEmployee;