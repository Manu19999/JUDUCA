import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import conexionbd from '../../../config/db.js';
import sql from 'mssql'; // Asegúrate de importar sql
import apiResponse from '../../../utils/apiResponse.js';
import bcrypt from 'bcrypt';// encriptado de contraseña
dotenv.config();

// Generar tokens
const generateTokens = (user) => {
  const accessToken = jwt.sign(
      {
          idUsuario: user.idUsuario,
          email: user.email,
          nombreUsuario: user.nombreUsuario,
          idRol: user.idRol
      },
      process.env.JWT_SECRET,
      { expiresIn: '30m' } // Access token corto
  );

  const refreshToken = jwt.sign(
      {
          idUsuario: user.idUsuario,
          tokenVersion: user.tokenVersion || 0 // Puedes usar un campo para invalidar tokens
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' } // Refresh token largo
  );

  return { accessToken, refreshToken };
};

export const Login = async (req, res) => {
    const { email, contrasena } = req.body;
    const response = new apiResponse();

    try {
        const pool = await conexionbd();
        
        // 1. Verificar estado del usuario
        const estadoResult = await pool.request()
            .input('email', sql.VarChar, email)
            .execute('Usuarios.splUsuariosAutenticar');

        // 2. Manejar errores
        switch(estadoResult.returnValue) {
            case 1: 
                response.setErrors(['El correo electrónico o la contraseña son incorrectos']);
                response.setHasError(true);
                return res.status(401).json(response.getResponse());
            case 2:
                response.setErrors(['Su cuenta no está activa. Contacte al administrador.']);
                response.setHasError(true);
                return res.status(403).json(response.getResponse());
            case 3:
                const minutos = estadoResult.recordset[0]?.minutosRestantes || 30;
                response.setErrors([`Cuenta bloqueada temporalmente. Intente nuevamente en ${minutos} minutos.`]);
                response.setHasError(true);
                return res.status(429).json(response.getResponse());
            case 4:
                response.setErrors(['Cuenta bloqueada permanentemente. Contacte al administrador.']);
                response.setHasError(true);
                return res.status(403).json(response.getResponse());
        }

        const user = estadoResult.recordset[0];
        
        // 3. Verificar contraseña
        const contraseñaValida = await bcrypt.compare(contrasena, user.contrasena);
        
        if (!contraseñaValida) {
            // Incrementar intentos fallidos
            await pool.request()
                .input('email', sql.VarChar, email)
                .execute('Usuarios.splIncrementarIntentosFallidos');
            
            // Obtener nuevo estado
            const nuevoEstado = await pool.request()
                .input('email', sql.VarChar, email)
                .execute('Usuarios.splUsuariosAutenticar');
                
            response.setErrors([`Credenciales incorrectas. Intentos restantes: ${nuevoEstado.recordset[0]?.intentosRestantes || 0}`]);
            response.setHasError(true);
            return res.status(401).json(response.getResponse());
        }

        // 4. Resetear intentos fallidos si es necesario
        if (user.intentosFallidos > 0) {
            await pool.request()
                .input('email', sql.VarChar, email)
                .execute('Usuarios.splResetearIntentosFallidos');
        }

        // 5. Registrar en bitácora (SOLO si la contraseña es correcta)
        await pool.request()
            .input('idUsuario', sql.Int, user.idUsuario)
            .input('accion', sql.NVarChar, 'Login')
            .input('descripcion', sql.NVarChar, `Inicio de sesión exitoso para el usuario ${user.nombreUsuario}`)
            .execute('Logs.splRegistrarBitacoraLogin');

        // 6. Actualizar última conexión
        await pool.request()
            .input('idUsuario', sql.Int, user.idUsuario)
            .execute('Usuarios.splActualizarUltimaConexion');

        // 7. Generar tokens
        const { accessToken, refreshToken } = generateTokens(user);

        // Configurar cookies...
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1800000,
            path: '/'
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 604800000,
            path: '/api/auth/refresh'
        });

        // Respuesta exitosa usando apiResponse
        response.setData({
            message: 'Autenticación exitosa',
            usuario: {
                idUsuario: user.idUsuario,
                email: user.email,
                nombreUsuario: user.nombreUsuario,
                idRol: user.idRol
            }
        });
        
        return res.status(200).json(response.getResponse());

    } catch (err) {
        console.error('Error en el login:', err);
        response.setErrors(['Error en el servidor. Por favor, inténtalo de nuevo más tarde']);
        response.setHasError(true);
        return res.status(500).json(response.getResponse());
    }
};

export const RefreshToken = async (req, res) => {
  const response = new apiResponse();
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
      response.setErrors(['Refresh token no proporcionado']);
      response.setHasError(true);
      return res.status(401).json(response.getResponse());
  }

  try {
      // Verificar el refresh token
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      
      // Obtener información del usuario (sin almacenar en BD)
      const pool = await conexionbd();
      const result = await pool.request()
          .input('idUsuario', sql.Int, decoded.idUsuario)
          .execute('Usuarios.splObtenerUsuarioPorId');

      if (result.recordset.length === 0) {
          response.setErrors(['Usuario no encontrado']);
          response.setHasError(true);
          return res.status(404).json(response.getResponse());
      }

      const user = result.recordset[0];
      
      // Verificar versión del token si implementas invalidación
      if (decoded.tokenVersion !== (user.tokenVersion || 0)) {
          response.setErrors(['Token inválido']);
          response.setHasError(true);
          return res.status(401).json(response.getResponse());
      }

      // Generar nuevo access token
      const newAccessToken = jwt.sign(
          {
              idUsuario: user.idUsuario,
              email: user.email,
              nombreUsuario: user.nombreUsuario,
              idRol: user.idRol
          },
          process.env.JWT_SECRET,
          { expiresIn: '30m' }
      );

      // Configurar nueva cookie de access token
      res.cookie('accessToken', newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 1800000, // 30 minutos
          path: '/'
      });

      response.setData({ 
          message: 'Token actualizado exitosamente'
      });
      
      return res.status(200).json(response.getResponse());

  } catch (err) {
      console.error('Error al refrescar token:', err);
      
      // Limpiar cookies inválidas
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      
      let mensaje = 'Error al refrescar el token';
      if (err.name === 'TokenExpiredError') {
          mensaje = 'Sesión expirada. Por favor inicie sesión nuevamente';
      } else if (err.name === 'JsonWebTokenError') {
          mensaje = 'Token inválido';
      }
      
      response.setErrors([mensaje]);
      response.setHasError(true);
      return res.status(401).json(response.getResponse());
  }
};

export const Logout = async (req, res) => {
    const response = new apiResponse();

    try {
        // 1. Limpiar la cookie (usando el mismo nombre que en login)
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        
        // 2. Registrar el logout si hay usuario autenticado
        if (req.usuario && req.usuario.idUsuario) {
            const pool = await conexionbd();
            
            await pool.request()
                .input('idUsuario', sql.Int, req.usuario.idUsuario)
                .input('nombreUsuario', sql.NVarChar, req.usuario.nombreUsuario || 'Sistema')
                .execute('Usuarios.splRegistrarLogout');
        }

        // 3. Preparar respuesta exitosa
        response.setData({ 
            message: 'Sesión cerrada correctamente'
        });

        // 4. Enviar respuesta inmediatamente
        return res.status(200).json(response.getResponse());

    } catch (err) {
        console.error('Error en el logout:', err);
        response.setErrors(['Error al cerrar sesión']);
        response.setHasError(true);
        return res.status(500).json(response.getResponse());
    }
};


export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const response = new apiResponse();
  
    try {
      const pool = await conexionbd();
      const result = await pool.request()
        .input('email', sql.VarChar, email)
        .execute('[Usuarios].[splVerificarCorreoRecuperacion]');
  
      // Verificar si el SP retornó resultados
      if (result.recordset.length === 0) {
        response.setErrors(['Error inesperado al verificar el email']);
        return res.status(500).json(response.getResponse());
      }
      
      const spResult = result.recordset[0];
      
      if (spResult.exito === 0) {
        // Email no existe o usuario inactivo
        response.setData({
          success: false,
          message: spResult.mensaje,
          emailExists: false
        });
      } else {
        // Email existe y usuario activo
        response.setData({
          success: true,
          message: spResult.mensaje,
          emailExists: true,
          userId: spResult.idUsuario
        });
      }
      
      return res.status(200).json(response.getResponse());
  
    } catch (err) {
      console.error('Error en forgotPassword:', err);
      response.setErrors(['Error al procesar la solicitud']);
      return res.status(500).json(response.getResponse());
    }
};

export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const response = new apiResponse();

  try {
    const pool = await conexionbd();
    
    // Hashear nueva contraseña
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Actualizar contraseña en BD
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .input('contrasena', sql.VarChar, hashedPassword)
      .execute('Usuarios.splActualizarContrasena');

    // Verificar si el SP retornó error
    if (result.returnValue === -1) {
      const error = result.recordset[0]?.descripcion || 'Error al actualizar la contraseña';
      response.setErrors([error]);
      return res.status(400).json(response.getResponse());
    }

    // Incluir el email en la respuesta para que el frontend pueda usarlo
    response.setData({ 
      message: 'Contraseña actualizada exitosamente',
      email: email
    });
    return res.status(200).json(response.getResponse());

  } catch (err) {
    console.error('Error en resetPassword:', err);
    response.setErrors(['Error al actualizar la contraseña']);
    response.setHasError(true);
    return res.status(500).json(response.getResponse());
  }
};


// controllers/authController.js
export const obtenerPerfilUsuario = async (req, res) => {
  const response = new apiResponse();
  
  try {
      const pool = await conexionbd();
      const result = await pool.request()
          .input('idUsuario', sql.Int, req.usuario.idUsuario)
          .execute('Usuarios.splUsuariosObtener');

      // Verificar si hay errores
      if (result.recordset.length > 0 && result.recordset[0].codigoError) {
          response.setHasError(true);
          response.setErrors([result.recordset[0].descripcion]);
          return res.status(404).json(response.getResponse());
      }

      // Obtener el primer registro (el usuario)
      const usuario = result.recordset[0];
      
      // Eliminar campos sensibles antes de enviar la respuesta
      delete usuario.contraseña;
      
      response.setData({ usuario });
      res.status(200).json(response.getResponse());
  } catch (error) {
      response.setHasError(true);
      response.setErrors(['Error al obtener el perfil del usuario']);
      res.status(500).json(response.getResponse());
  }
};