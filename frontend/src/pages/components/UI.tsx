import React, { useState } from 'react';
import './ui.css';
import LogOut from './logout';
import { Link } from 'react-router-dom';

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
                    {localStorage.getItem('authToken') ? <LogOut /> : <><Link to="/login">Login</Link> | <Link to="/signup">Sign Up</Link></>}
                </div>
            </div>
    
            {/* Side Menu */}
            {isMenuOpen && (
            <div className="side-menu">
                <div className="menu-content">
                <p><Link to = '/'>Home</Link></p>
                <p><Link to = '/profile'>Profile</Link></p>
                </div>
            </div>
            )}
    
            {/* Dimmed Background */}
            {isMenuOpen && <div className="dimmed-background" onClick={toggleMenu} />}
        </>
    );
}

export default UI;