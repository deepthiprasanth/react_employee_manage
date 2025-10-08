// src/components/RoleProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const RoleProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // 🔒 Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 🔒 Logged in but not the correct role
  if (role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Authorized
  return children;
};

export default RoleProtectedRoute;
