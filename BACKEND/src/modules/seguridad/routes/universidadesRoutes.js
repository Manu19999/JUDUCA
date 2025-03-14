import express from 'express';
import {obtenerUniversidades} from '../controllers/universidadesController.js';
//import checkAuth from "../../../middleware/authMiddleware.js";

const router = express.Router();

router.get('/', obtenerUniversidades);

// Insertar una nueva universidad
//router.post('/', checkAuth, insertarRol);

export default router;