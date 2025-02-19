import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem('authToken'); // Check for the token

  if (!token) {
    // Redirect to login if no token is found
    alert("No token found, please login to get a token");
    return <Navigate to="/login" replace />;
  }

  // Render the protected component if the token exists
  return <Outlet />;
};

export default ProtectedRoute;