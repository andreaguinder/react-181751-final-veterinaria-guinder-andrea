import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loader from '../Loader/Loader';


const ADMIN_EMAIL = 'admin@gmail.com'; 

function AdminRoute({ children }) {
  const { user, isLoggedIn, loading } = useAuth();
  const location = useLocation();


  if (loading) {
    return <Loader />;
  }


  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }


  if (user?.email !== ADMIN_EMAIL) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;