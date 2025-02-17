import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage';
import DefaultWordle from './pages/defaultwordle/wordle';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './pages/notfound/notfound';

function App() {
  return (
    <Router>
      <Routes>
        {/* Homepage route */}
        <Route path="/" element={<HomePage />} />

        {/* Default Wordle route */}
        <Route path="/defaultwordle" element={<DefaultWordle />} />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
