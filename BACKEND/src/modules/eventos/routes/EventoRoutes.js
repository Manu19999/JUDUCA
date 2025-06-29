import express from 'express';
import { ObtenerEventos, insertarEvento, actualizarEvento, obtenerEventoss } from '../controllers/EventoControllers.js'; 
import checkAuth from "../../../middleware/authMiddleware.js";


const router = express.Router();

router.get("/eventosActivos/:activo?", checkAuth, ObtenerEventos);

router.post('/insEventos', checkAuth, insertarEvento);// Insertar

router.put('/updEventos', checkAuth, actualizarEvento);// Actualizar 
router.get('/', checkAuth, obtenerEventoss);

export default router;