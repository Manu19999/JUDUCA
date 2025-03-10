import express from 'express';
import {Login} from '../controllers/authController.js';
import checkAuth from '../../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', Login);

router.get('/perfil', checkAuth, (req, res) => {
    console.log('Datos del usuario:', req.usuario); // Para depuración en la terminal
    res.json({ usuario: req.usuario }); // Para ver en Postman
});



export default router;