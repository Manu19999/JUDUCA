import express from 'express';
import {obtenerUniversidades,insertarUniversidad,actualizarUniversidad} from '../controllers/universidadesController.js';
import checkAuth from "../../../middleware/authMiddleware.js";

const router = express.Router();

router.get('/', checkAuth,obtenerUniversidades);
router.post('/', checkAuth, insertarUniversidad);// Insertar una nueva universidad
router.put('/:idUniversidad', checkAuth, actualizarUniversidad);// Actualizar una universidad por su ID (requiere autenticación)

export default router;