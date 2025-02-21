import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage/homepage';
import DefaultWordle from './pages/defaultwordle/wordle';
import NotFound from './pages/notfound/notfound';
import SignUpPage from './pages/auth/signup';
import LoginPage from './pages/auth/login';
import ProfilePage from './pages/profile/profile';
import ProtectedRoute from './protectedroute';
import Leaderboard from './pages/components/leaderboard';

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

        {/* Auth routes */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
