import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Middleware para verificar la autenticación mediante un token JWT.
 * Si el token es válido, adjunta los datos del usuario al objeto `req`.
 * Si el token es inválido o no se proporciona, devuelve un error.
 */
export const checkAuth = (req, res, next) => {
  // 1. Verificar si el encabezado Authorization está presente
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.error('Error: Encabezado Authorization no encontrado');
    return res.status(403).json({
      success: false,
      mensaje: 'Acceso denegado. Token no proporcionado.',
    });
  }

  // 2. Extraer el token del encabezado Authorization
  const token = authHeader.split(' ')[1]; // Formato: "Bearer <token>"
  if (!token) {
    console.error('Error: Token no proporcionado en el encabezado Authorization');
    return res.status(403).json({
      success: false,
      mensaje: 'Acceso denegado. Token no proporcionado.',
    });
  }

  // 3. Verificar y decodificar el token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificar el token
    console.log('Token decodificado:', decoded);

    // 4. Adjuntar los datos del usuario al objeto `req`
    req.usuario = decoded;

    // 5. Continuar con la siguiente función middleware o controlador
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error.message);

    // 6. Manejar errores específicos del token
    let mensajeError = 'Token inválido o ha expirado.';
    if (error.name === 'TokenExpiredError') {
      mensajeError = 'El token ha expirado. Por favor, inicia sesión nuevamente.';
    } else if (error.name === 'JsonWebTokenError') {
      mensajeError = 'Token inválido.';
    }

    return res.status(401).json({
      success: false,
      mensaje: mensajeError,
    });
  }
};

export default checkAuth;