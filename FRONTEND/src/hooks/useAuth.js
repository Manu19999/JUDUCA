import { useState, useEffect } from 'react';

const useAuth = () => {
  const [authState, setAuthState] = useState({
    user: null,
    permisos: [],
    loading: true,
    error: null
  });

  const verifyAuth = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/auth/check-auth', {
        credentials: 'include'
      });
      
      if (res.ok) {
        const data = await res.json();
        if (data.usuario) {
          // Obtener permisos directamente del usuario autenticado
          setAuthState({
            user: data.usuario,
            permisos: data.permisos || [], // Asegúrate que el backend envía los permisos
            loading: false,
            error: null
          });
        } else {
          setAuthState({
            user: null,
            permisos: [],
            loading: false,
            error: null
          });
        }
      } else {
        setAuthState({
          user: null,
          permisos: [],
          loading: false,
          error: 'No autenticado'
        });
      }
    } catch (err) {
      setAuthState({
        user: null,
        permisos: [],
        loading: false,
        error: 'Error de conexión'
      });
    }
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  // Función para verificar permisos
  const hasPermission = (objetoNombre, accion = 'consultar') => {
    if (!authState.user) return false;
    
    const permiso = authState.permisos.find(p => p.nombreObjeto === objetoNombre); // Cambiado a nombreObjeto
    
    if (!permiso) return false;
    
    switch(accion.toLowerCase()) {
      case 'consultar': return permiso.consultar;
      case 'insertar': return permiso.insercion;
      case 'actualizar': return permiso.actualizacion;
      case 'eliminar': return permiso.eliminacion;
      default: return false;
    }
  };

  return {
    ...authState,
    verifyAuth,
    hasPermission
  };
};

export default useAuth;