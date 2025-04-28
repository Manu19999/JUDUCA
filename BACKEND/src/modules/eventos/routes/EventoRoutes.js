import { Router } from 'express';
import { getEventos } from '../../eventos/controllers/EventoCotrollers.js'; // Asegúrate de que la ruta sea correcta

const router = Router();

router.get('/eventos', getEventos);

export default router;