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
            {localStorage.getItem('authToken') ? (<LogOut />) : ( 
            <div className="login-signup">
                <a href="/login">Login</a> | <a href="/signup">Sign Up</a>
            </div>)}
            </div>
    
            {/* Side Menu */}
            {isMenuOpen && (
            <div className="side-menu">
                <div className="menu-content">
                <p>Menu Item 1</p>
                <p>Menu Item 2</p>
                <p>Menu Item 3</p>
                </div>
            </div>
            )}
    
            {/* Dimmed Background */}
            {isMenuOpen && <div className="dimmed-background" onClick={toggleMenu} />}
        </>
    );
}

export default UI;