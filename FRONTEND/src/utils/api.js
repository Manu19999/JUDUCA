// Función para hacer llamadas API con manejo de token expirado
export const fetchWithAuth = async (url, options = {}) => {
    const response = await fetch(url, {
        ...options,
        credentials: 'include'
    });
    
    if (response.status === 401) {
        // Intentar refrescar el token
        const refreshResponse = await fetch('http://localhost:4000/api/auth/refresh', {
            method: 'POST',
            credentials: 'include'
        });
        
        if (refreshResponse.ok) {
            // Reintentar la petición original
            return fetch(url, {
                ...options,
                credentials: 'include'
            });
        } else {
            // Redirigir a login si el refresh falla
            window.location.href = '/login';
            return Promise.reject(new Error('Sesión expirada'));
        }
    }
    
    return response;
};