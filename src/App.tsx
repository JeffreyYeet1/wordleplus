import React from 'react';
import './App.css';
import HomePage from './pages/homepage/home';
import Wordle from './pages/defaultwordle/wordle';

function App() {
  return (
    <>
      <div className='appcontainer'>
        <Wordle />
      </div>
    </>
  );
}

export default App;
