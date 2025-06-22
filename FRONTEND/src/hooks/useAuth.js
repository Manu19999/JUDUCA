// hooks/useAuth.js
import { useState, useEffect } from 'react';

const useAuth = () => {
  const [authState, setAuthState] = useState({
    user: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/auth/check-auth', {
          credentials: 'include'
        });
        
        setAuthState({
          user: res.ok ? await res.json().usuario : null,
          loading: false,
          error: res.ok ? null : 'No autenticado'
        });
      } catch (err) {
        setAuthState({
          user: null,
          loading: false,
          error: 'Error de conexión'
        });
      }
    };

    verifyAuth();
  }, []);

  return authState;
};

export default useAuth;