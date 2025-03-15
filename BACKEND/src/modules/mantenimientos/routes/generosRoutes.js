import express from 'express';
import {obtenerGeneros} from '../controllers/generosController.js';
//import checkAuth from "../../../middleware/authMiddleware.js";

const router = express.Router();

//router.get('/',checkAuth, obtenerGeneros);
router.get('/', obtenerGeneros);

// Insertar un nuevo genero
//router.post('/', checkAuth, insertarGeneros);

export default router;