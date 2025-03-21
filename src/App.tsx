// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import Callback from './components/ciudadania/Callback';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      <Route path="/callback" element={<Callback />} />
    </Routes>
  );
};

export default App;
