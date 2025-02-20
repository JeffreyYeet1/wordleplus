import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For routing
import './homepage.css';
import UI from '../components/UI';

const HomePage: React.FC = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handlePlayClick = () => {
    navigate('/defaultwordle'); // Route to the play page
  };

  return (
    <div className="home-page">
      <UI />
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