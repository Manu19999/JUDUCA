import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import conexionbd from '../config/db.js';
import sql from 'mssql';

dotenv.config();

/**
 * Middleware para verificar la autenticación mediante cookies HttpOnly
 * Si el token es válido, adjunta los datos del usuario al objeto `req`
 * Si el token es inválido o no se proporciona, devuelve un error
 */

export const checkAuth = async (req, res, next) => {
  // 1. Verificar si es una ruta pública (login, refresh, etc.)
  const publicRoutes = ['/api/auth/login', '/api/auth/refresh', '/api/auth/forgot-password', '/api/auth/reset-password'];
  if (publicRoutes.includes(req.path)) {
    return next();
  }

  // 2. Intentar obtener el access token
  let token = req.cookies.accessToken;
  
  // 3. Si no hay token, denegar acceso inmediatamente
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Acceso no autorizado. Por favor inicie sesión.'
    });
  }

  // 4. Verificar el token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    return next();
  } catch (err) {
    // 5. Manejar token expirado
    if (err.name === 'TokenExpiredError') {
      try {
        // Intentar refrescar el token
        const newToken = await refreshAccessToken(req, res);
        if (newToken) {
          // Adjuntar el nuevo token a la respuesta
          res.cookie('accessToken', newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1800000, // 30 minutos
            path: '/'
          });
          
          // Decodificar el nuevo token y continuar
          const decoded = jwt.verify(newToken, process.env.JWT_SECRET);
          req.usuario = decoded;
          return next();
        }
      } catch (refreshError) {
        console.error('Error al refrescar token:', refreshError);
      }
    }
    
    // 6. Cualquier otro error, limpiar cookies y denegar acceso
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    
    return res.status(401).json({
      success: false,
      message: 'Sesión inválida. Por favor inicie sesión nuevamente.'
    });
  }
};

// Función auxiliar para refrescar el token
const refreshAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  
  if (!refreshToken) {
    throw new Error('No hay refresh token disponible');
  }

  // Verificar el refresh token
  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  
  // Obtener información del usuario
  const pool = await conexionbd();
  const result = await pool.request()
    .input('idUsuario', sql.Int, decoded.idUsuario)
    .execute('Usuarios.splObtenerUsuarioPorId');

  if (result.recordset.length === 0) {
    throw new Error('Usuario no encontrado');
  }

  const user = result.recordset[0];
  
  // Verificar versión del token
  if (decoded.tokenVersion !== (user.tokenVersion || 0)) {
    throw new Error('Token inválido');
  }

  // Generar nuevo access token
  return jwt.sign(
    {
      idUsuario: user.idUsuario,
      email: user.email,
      nombreUsuario: user.nombreUsuario,
      idRol: user.idRol
    },
    process.env.JWT_SECRET,
    { expiresIn: '30m' }
  );
};

export default checkAuth;