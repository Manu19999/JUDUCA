// components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loader from './Loader';

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { user, loading, error } = useAuth();

  if (loading) return <Loader />;
  if (error) return <Navigate to="/login" state={{ error }} replace />;
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.idRol)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />; // Renderiza hijos anidados
};

export default ProtectedRoute;