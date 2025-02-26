import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogOut: React.FC = () => {
    const handleLogout = async () => {
        try {
            const navigate = useNavigate();
            // Get the token from localStorage
            const token = localStorage.getItem('authToken');
            // Make the logout request with the token for token blacklisting
            // WIP


            // Remove the token from localStorage after successful logout
            localStorage.removeItem('authToken');

            // Notify the user and redirect
            alert("Logout successful");
            const Redirect = () => {
                navigate('/login');
            };
            Redirect();
        } catch (error) {
            console.error("Logout unsuccessful", error);
            alert("Logout failed. Please try again.");
        }
    };

    return (
        <a onClick={handleLogout}>Log Out</a>
    );
};

export default LogOut;