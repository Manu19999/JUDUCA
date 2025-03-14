import express from 'express';
import {obtenerPaises} from '../controllers/paisesController.js';
//import checkAuth from "../../../middleware/authMiddleware.js";

const router = express.Router();

//router.get('/',checkAuth, obtenerPaises);
router.get('/', obtenerPaises);

// Insertar un nuevo pais
//router.post('/', checkAuth, insertarPais);

export default router;