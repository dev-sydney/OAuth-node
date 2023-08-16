// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import WelcomePage from './pages/WelcomePage';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/welcome" exact element={<WelcomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
