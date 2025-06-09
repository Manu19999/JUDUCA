import express from 'express';
import { ObtenerEventos, insertarEvento, actualizarEvento, obtenerEventos } from '../controllers/EventoControllers.js'; 
import checkAuth from "../../../middleware/authMiddleware.js";


const router = express.Router();
router.get('/', checkAuth, obtenerEventos);
router.get("/eventosActivos/:activo?", checkAuth, ObtenerEventos);

router.post('/insEventos', checkAuth, insertarEvento);// Insertar

router.put('/updEventos', checkAuth, actualizarEvento);// Actualizar 


export default router;