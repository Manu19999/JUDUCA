import express from 'express';
import {obtenerParametros, actualizarParametro} from '../controllers/parametrosController.js';
import checkAuth from "../../../middleware/authMiddleware.js";

const router = express.Router();

router.get('/',checkAuth, obtenerParametros);
router.put('/:idParametro', checkAuth, actualizarParametro);// Actualizar un parametro por su ID (requiere autenticación)

export default router;
