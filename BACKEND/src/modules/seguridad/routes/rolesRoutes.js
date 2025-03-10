import express from 'express';
import {obtenerRoles, insertarRol} from '../controllers/rolesController.js';
import checkAuth from "../../../middleware/authMiddleware.js";

const router = express.Router();

router.get('/', obtenerRoles);

// Insertar un nuevo rol
router.post('/', checkAuth, insertarRol);

export default router;