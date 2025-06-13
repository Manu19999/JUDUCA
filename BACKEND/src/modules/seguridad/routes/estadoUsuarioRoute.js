import express from 'express';
import {obtenerEstadosUsuario} from '../controllers/estadoUsuarioController.js';
import checkAuth from "../../../middleware/authMiddleware.js";

const router = express.Router();

router.get('/',checkAuth, obtenerEstadosUsuario);
//router.post('/', checkAuth, insertarRol);// Insertar un nuevo rol
//router.put('/:idRol', checkAuth, actualizarRol);// Actualizar un rol por su ID (requiere autenticación)
//router.delete("/:idRol", checkAuth, eliminarRol); // Eliminar un rol

export default router;
