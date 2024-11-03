// ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ requiredRole }) => {
  const token = sessionStorage.getItem('token');

  if (!token) {
    // Redirect to home if token is missing
    return <Navigate to="/" replace />;
  }

  try {
    // Decode the token and check user role
    const decoded = jwtDecode(token);
    const userRole = decoded.role;

    if (userRole === requiredRole) {
      return <Outlet />; // Render the nested route if role matches
    } else {
      console.error("Access denied: Unauthorized role");
      return <Navigate to="/" replace />; // Redirect if role doesn't match
    }
  } catch (error) {
    console.error("Token decoding failed:", error);
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
