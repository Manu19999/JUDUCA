import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loader from './Loader';

const ProtectedRoute = ({ allowedRoles = [], requiredPermission }) => {
  const { user, loading, error, hasPermission } = useAuth();

  if (loading) return <Loader />;
  if (error) return <Navigate to="/login" state={{ error }} replace />;
  
  // Verificar rol si se especificó
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.idRol)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  // Verificar permiso si se especificó
  if (requiredPermission) {
    if (!hasPermission(requiredPermission.objeto, requiredPermission.accion)) {
      // Opcional: Puedes verificar si al menos tiene permiso de consulta
      const canView = hasPermission(requiredPermission.objeto, 'consultar');
      return canView ? <Outlet /> : <Navigate to="/unauthorized" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;