import express from 'express';
import {obtenerCiudades} from '../controllers/ciudadesController.js';
//import checkAuth from "../../../middleware/authMiddleware.js";

const router = express.Router();

//router.get('/',checkAuth, obtenerCiudades);
router.get('/', obtenerCiudades);

// Insertar una nueva ciudad
//router.post('/', checkAuth, insertarCiudades);

export default router;