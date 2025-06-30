import React from 'react';
import  useAuth  from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const ProtectedComponent = ({ children, objetoNombre, accion = 'consultar', fallback = null }) => {
  const { hasPermission, loading } = useAuth();

  if (loading) return null; // O un spinner si prefieres

  return hasPermission(objetoNombre, accion) ? children : (fallback || <Navigate to="/unauthorized" />);
};

export default ProtectedComponent;