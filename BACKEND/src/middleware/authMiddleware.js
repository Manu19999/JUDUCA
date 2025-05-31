import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Middleware para verificar la autenticación mediante cookies HttpOnly
 * Si el token es válido, adjunta los datos del usuario al objeto `req`
 * Si el token es inválido o no se proporciona, devuelve un error
 */
export const checkAuth = (req, res, next) => {
  // 1. Obtener el token de las cookies en lugar del header
  const token = req.cookies.token;
  
  if (!token) {
    console.error('Error: Cookie de autenticación no encontrada');
    return res.status(403).json({
      success: false,
      mensaje: 'Acceso denegado. No autenticado.',
    });
  }

  // 2. Verificar y decodificar el token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Usuario autenticado:', decoded);

    // 3. Adjuntar los datos del usuario al objeto `req`
    req.usuario = decoded;

    // 4. Continuar con la siguiente función middleware o controlador
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error.message);

    // 5. Manejar errores específicos del token
    let mensajeError = 'Token inválido o ha expirado.';
    if (error.name === 'TokenExpiredError') {
      mensajeError = 'La sesión ha expirado. Por favor, inicia sesión nuevamente.';
    } else if (error.name === 'JsonWebTokenError') {
      mensajeError = 'Token de autenticación inválido.';
    }

    // 6. Limpiar la cookie inválida
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    return res.status(401).json({
      success: false,
      mensaje: mensajeError,
    });
  }
};

export default checkAuth;