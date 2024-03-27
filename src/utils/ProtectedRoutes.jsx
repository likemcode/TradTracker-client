import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
  // Check if user is authenticated (you might want to replace this logic with your own)
  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    isAuthenticated.token? <Outlet/>: <Navigate to="/Login" />
  );
};

export default ProtectedRoutes;