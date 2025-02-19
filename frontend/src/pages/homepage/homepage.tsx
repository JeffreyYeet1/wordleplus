import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For routing
import './homepage.css';

const HomePage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handlePlayClick = () => {
    navigate('/defaultwordle'); // Route to the play page
  };

  return (
    <div className="home-page">
      {/* Top Bar */}
      <div className="top-bar">
        <button className="hamburger-button" onClick={toggleMenu}>
          ☰
        </button>
        <div className="login-register">
          <a href="/login">Login</a> | <a href="/signup">Sign Up</a>
        </div>
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

      {/* Main Content */}
      <div className="main-content">
        <h1 className="homepage-title">Welcome to Wordle+</h1>
        <button className="play-button" onClick = {handlePlayClick}>
          Play
        </button>
      </div>
    </div>
  );
};

export default HomePage;