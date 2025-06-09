import express from 'express';
import { insertarEvento, obtenerEventos } from '../../eventos/controllers/EventoCotrollers.js'; 
import checkAuth from "../../../middleware/authMiddleware.js";


const router = express.Router();

router.post('/insEventos', checkAuth, insertarEvento);// Insertar un nuevo usuario
router.get('/', checkAuth, obtenerEventos);

export default router;