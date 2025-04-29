import express from 'express';
import { ObtenerFichas, ObtenerCarateristicaFicha, ObtenerParticipantesPorFicha, ObtenerCredencialesPorFicha, ObtenerUbicacionesCampos ,ObtenerEventos, InsertarCredencial } from '../controllers/credencialController.js';

const router = express.Router();

router.get('/', ObtenerEventos);
router.get('/fichas', ObtenerFichas);
router.get('/fichaCaracteristica/:idFichaRegistro', ObtenerCarateristicaFicha);
router.get('/participantes/:idEvento/:idFichaRegistro', ObtenerParticipantesPorFicha);
router.get('/credenciales/:idEvento/:idFichaRegistro', ObtenerCredencialesPorFicha);
router.get('/ubicacionCampos', ObtenerUbicacionesCampos);

router.post('/insCredencial', InsertarCredencial);





export default router;
