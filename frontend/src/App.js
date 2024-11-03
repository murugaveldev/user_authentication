// AppRoutes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import UserLogin from './components/UserLogin';
import AdminLogin from './components/AdminLogin';
import UserPage from './components/UserPage';
import AdminPage from './components/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';
import UserRegister from './components/UserRegister';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user-register" element={<UserRegister />} />
      <Route path="/login-user" element={<UserLogin />} />
      <Route path="/login-admin" element={<AdminLogin />} />

      {/* Protected routes for user and admin */}
      <Route element={
        <ProtectedRoute requiredRole="user" />
      }>
        <Route path="/user" element={<UserPage />} />
      </Route>

      <Route element={
        <ProtectedRoute requiredRole="admin" />
      }>
        <Route path="/admin" element={<AdminPage />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRoutes;
