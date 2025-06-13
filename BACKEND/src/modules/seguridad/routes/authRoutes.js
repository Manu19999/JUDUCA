import express from 'express';
import {Login,Logout,forgotPassword, resetPassword} from '../controllers/authController.js';
import checkAuth from '../../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', Login);
router.post('/logout', checkAuth, Logout);

router.get('/perfil', checkAuth, (req, res) => {
    console.log('Datos del usuario:', req.usuario); // Para depuración en la terminal
    res.json({ usuario: req.usuario }); // Para ver en Postman
});

router.post('/forgot-password', forgotPassword); // Paso 1: Solicitar recuperación

router.post('/reset-password', resetPassword); // Paso 3: Establecer nueva contraseña


export default router;