import express from 'express';
import {obtenerEstadosUsuario,insertarEstadoUsuario, actualizarEstadoUsuario, eliminarEstadoUsuario} from '../controllers/estadoUsuarioController.js';
import checkAuth from "../../../middleware/authMiddleware.js";

const router = express.Router();

router.get('/',checkAuth, obtenerEstadosUsuario);
router.post('/', checkAuth, insertarEstadoUsuario);// Insertar un nuevo estado-usuario
router.put('/:idEstadoUsuario', checkAuth, actualizarEstadoUsuario);// Actualizar un estado usuario por su ID (requiere autenticación)
router.delete("/:idEstadoUsuario", checkAuth, eliminarEstadoUsuario); // Eliminar un estado usuario

export default router;
