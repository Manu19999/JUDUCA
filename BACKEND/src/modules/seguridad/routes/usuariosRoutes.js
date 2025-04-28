import express from 'express';
import {obtenerUsuarios} from '../controllers/usuariosController.js';
import checkAuth from "../../../middleware/authMiddleware.js";

const router = express.Router();

router.get('/',checkAuth, obtenerUsuarios);
//router.post('/', checkAuth, insertarUsuario);// Insertar un nuevo usuario
//router.put('/:idUsuario', checkAuth, actualizarUsuario);// Actualizar un usuario por su ID (requiere autenticación)


export default router;
