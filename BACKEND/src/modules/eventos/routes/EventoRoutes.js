import express from 'express';
import { insertarEvento, actualizarEvento } from '../controllers/EventoControllers.js'; 
import checkAuth from "../../../middleware/authMiddleware.js";


const router = express.Router();

router.post('/insEventos', checkAuth, insertarEvento);// Insertar

router.put('/updEventos', checkAuth, actualizarEvento);// Actualizar 


export default router;