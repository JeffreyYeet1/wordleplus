import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AxiosAPI from './axiosapi'; // Your Axios API instance

const ProtectedRoute: React.FC = () => {
  const [isValid, setIsValid] = useState<boolean | null>(null); // State to track token validity
  const token = localStorage.getItem('authToken'); // Get the token from localStorage

  useEffect(() => {
    if (!token) {
      // If no token is found, redirect to login
      setIsValid(false);
      return;
    }

    // Check if token is valid by calling the backend
    AxiosAPI.get('/api/auth/validate-token', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setIsValid(true); // Token is valid
      })
      .catch((error) => {
        setIsValid(false); // Token is invalid
        console.error("Token validation failed:", error);
      });
  }, [token]);

  if (isValid === null) {
    // Show loading while checking token validity
    return <div>Loading...</div>;
  }

  if (isValid === false) {
    // If the token is invalid, redirect to login
    alert("Invalid token, please log in again");
    localStorage.removeItem('authToken');
    return <Navigate to="/login" replace />;
  }

  // Render the protected component if the token is valid
  return <Outlet />;
};

export default ProtectedRoute;
