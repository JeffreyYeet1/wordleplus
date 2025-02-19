import React from 'react';
import axios from 'axios';

const LogOut: React.FC = () => {
    const handleLogout = async () => {
        try {
            // Get the token from localStorage
            const token = localStorage.getItem('authToken');
            // Make the logout request with the token
            // await axios.post('http://localhost:5001/api/auth/logout', {}, {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            // });

            // Remove the token from localStorage after successful logout
            localStorage.removeItem('authToken');

            // Notify the user and redirect
            alert("Logout successful");
            window.location.href = '/login'; // Redirect to the login page
        } catch (error) {
            console.error("Logout unsuccessful", error);
            alert("Logout failed. Please try again.");
        }
    };

    return (
        <button onClick={handleLogout}>Log Out</button>
    );
};

export default LogOut;