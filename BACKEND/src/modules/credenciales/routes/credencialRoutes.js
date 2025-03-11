import express from 'express';
import { ObtenerFichas, ObtenerParticipantesPorFicha, ObtenerEventos } from '../controllers/credencialController.js';

const router = express.Router();

router.get('/', ObtenerEventos);
router.get('/fichas', ObtenerFichas);
router.get('/participantes/:idEvento/:idFichaRegistro', ObtenerParticipantesPorFicha);






export default router;