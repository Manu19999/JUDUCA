import express from 'express';
import {obtenerObjetos, insertarObjeto, actualizarObjeto, eliminarObjeto} from '../controllers/objetosController.js';
import checkAuth from "../../../middleware/authMiddleware.js";

const router = express.Router();

router.get('/',checkAuth, obtenerObjetos);
router.post('/', checkAuth, insertarObjeto);// Insertar un nuevo objeto
router.put('/:idObjeto', checkAuth, actualizarObjeto);// Actualizar un objeto por su ID (requiere autenticación)
router.delete("/:idObjeto", checkAuth, eliminarObjeto); // Eliminar un objeto

export default router;
