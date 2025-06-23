import express from 'express';
import {Login,Logout, RefreshToken, forgotPassword, resetPassword,obtenerPerfilUsuario} from '../controllers/authController.js';
import checkAuth from '../../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', Login);
router.post('/logout', checkAuth, Logout);
router.post('/refresh', RefreshToken);

router.get('/check-auth', checkAuth, (req, res) => {
    res.json({
      success: true,
      usuario: req.usuario
    });
});

router.get('/perfil', checkAuth, obtenerPerfilUsuario);

router.post('/forgot-password', forgotPassword); // Paso 1: Solicitar recuperación

router.post('/reset-password', resetPassword); // Paso 3: Establecer nueva contraseña


export default router;