import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import AdminLogin from './AdminLogin';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

export default function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const { state, dispatch } = useApp();

  useEffect(() => {
    // Check if admin is already authenticated from localStorage
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth === 'true') {
      dispatch({ type: 'SET_ADMIN_AUTH', payload: true });
    }
  }, [dispatch]);

  if (!state.isAdminAuthenticated) {
    return <AdminLogin />;
  }

  return <>{children}</>;
}