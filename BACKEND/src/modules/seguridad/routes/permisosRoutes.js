import express from 'express';
import {obtenerPermisos, insertarPermiso, actualizarPermiso} from '../controllers/permisosController.js';
import checkAuth from "../../../middleware/authMiddleware.js";

const router = express.Router();

router.get('/',checkAuth, obtenerPermisos);
router.post('/', checkAuth, insertarPermiso);// Insertar un nuevo permiso
router.put('/:idPermiso', checkAuth, actualizarPermiso);// Actualizar un permiso por su ID (requiere autenticación)

export default router;
