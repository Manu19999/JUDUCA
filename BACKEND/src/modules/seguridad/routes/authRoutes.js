
import conexionbd from '../../../config/db.js';
import sql from 'mssql';import express from 'express';
import {Login,Logout, RefreshToken, forgotPassword, resetPassword,obtenerPerfilUsuario} from '../controllers/authController.js';
import checkAuth from '../../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', Login);
router.post('/logout', checkAuth, Logout);
router.post('/refresh', RefreshToken);

router.get('/check-auth', checkAuth, async (req, res) => {
  try {
    const pool = await conexionbd();
    const permisosResult = await pool.request()
      .input('idRol', sql.Int, req.usuario.idRol)
      .execute('Seguridad.splObtenerPermisosPorRol');
    
    res.json({
      success: true,
      usuario: req.usuario,
      permisos: permisosResult.recordset
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al verificar autenticación'
    });
  }
});

router.get('/perfil', checkAuth, obtenerPerfilUsuario);

router.post('/forgot-password', forgotPassword); // Paso 1: Solicitar recuperación

router.post('/reset-password', resetPassword); // Paso 3: Establecer nueva contraseña

// Añadir esta ruta
router.get('/permisos', checkAuth, async (req, res) => {
  try {
      const pool = await conexionbd();
      const result = await pool.request()
          .input('idRol', sql.Int, req.usuario.idRol)
          .execute('Seguridad.splObtenerPermisosPorRol');
      
      res.json({
          success: true,
          permisos: result.recordset
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: 'Error al obtener permisos'
      });
  }
});

export default router;