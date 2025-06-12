
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Homestore from './pages/Homestore';
import Addcart from './pages/Addcart';
import Signup from './pages/Signup';

// ProtectedRoute Component
const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated'); // Change logic as needed
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/homestore' element={<ProtectedRoute element={<Homestore />} />} />
        <Route path='/addcart' element={<ProtectedRoute element={<Addcart />} />} />
      </Routes>
    </Router>
  );
};

export default App;
