import React, { useState } from 'react';
import './ui.css';
import LogOut from './logout';

const UI: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };

    return(
        <>
            {/* Top Bar */}
            <div className="top-bar">
                <button className="hamburger-button" onClick={toggleMenu}>
                    ☰
                </button>
                <div className="login-signup-logout">
                    {localStorage.getItem('authToken') ? <LogOut /> : <><a href="/login">Login</a> | <a href="/signup">Sign Up</a></>}
                </div>
            </div>
    
            {/* Side Menu */}
            {isMenuOpen && (
            <div className="side-menu">
                <div className="menu-content">
                <p><a href = '/'>Home</a></p>
                <p><a href = '/profile'>Profile</a></p>
                <p><a href = 'leaderboard'>Leaderboard</a></p>
                </div>
            </div>
            )}
    
            {/* Dimmed Background */}
            {isMenuOpen && <div className="dimmed-background" onClick={toggleMenu} />}
        </>
    );
}

export default UI;