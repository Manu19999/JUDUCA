import express from 'express';
import {obtenerObjetos, insertarObjeto} from '../controllers/objetosController.js';
import checkAuth from "../../../middleware/authMiddleware.js";

const router = express.Router();

router.get('/',checkAuth, obtenerObjetos);
router.post('/', checkAuth, insertarObjeto);// Insertar un nuevo rol
//router.put('/:idRol', checkAuth, actualizarRol);// Actualizar un rol por su ID (requiere autenticación)
//router.delete("/:idRol", checkAuth, eliminarRol); // Eliminar un rol

export default router;
