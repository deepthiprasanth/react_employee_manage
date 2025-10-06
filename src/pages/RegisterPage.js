// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const RegisterPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: "",
//     name: "",
//     email: "",
//     password: "",
//     role: "ADMIN", // fixed
//   });

//   // Check if user is admin or if first admin
//   useEffect(() => {
//     const role = localStorage.getItem("role");
//     axios.get("http://localhost:8080/api/auth/admin-exists").then(res => {
//       const adminExists = res.data.exists;
//       if (adminExists && role !== "ADMIN") {
//         alert("❌ Only Admins can access this page");
//         navigate("/login");
//       }
//     });
//   }, [navigate]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:8080/api/auth/register-admin", formData, {
//         headers: { "Content-Type": "application/json" },
//       });
//       alert("✅ Admin registered successfully!");
//       navigate("/login");
//     } catch (err) {
//       console.error(err.response || err.message);
//       alert("❌ Registration failed: " + (err.response?.data || err.message));
//     }
//   };

//   return (
//     <div className="bg03">
//       <div className="container">
//         <div className="row tm-mt-big">
//           <div className="col-12 mx-auto tm-login-col">
//             <div className="bg-white tm-block p-4">
//               <div className="text-center mb-4">
//                 <i className="fas fa-3x fa-user-plus tm-site-icon"></i>
//                 <h2 className="tm-block-title mt-3">Register Admin</h2>
//               </div>

//               <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label>Username</label>
//                   <input type="text" name="username" className="form-control" value={formData.username} onChange={handleChange} required />
//                 </div>

//                 <div className="form-group mt-3">
//                   <label>Name</label>
//                   <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
//                 </div>

//                 <div className="form-group mt-3">
//                   <label>Email</label>
//                   <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
//                 </div>

//                 <div className="form-group mt-3">
//                   <label>Password</label>
//                   <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
//                 </div>

//                 <div className="text-center mt-4">
//                   <button type="submit" className="btn btn-primary">Register Admin</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;
