import express from 'express';
import { ObtenerFichas, ObtenerCarateristicaFicha, ObtenerParticipantesPorFicha, ObtenerCredencialesPorFicha, ObtenerUbicacionesCampos ,ObtenerEventos, InsertarCredencial, insertarCamposCredencial  } from '../controllers/credencialController.js';
import checkAuth from "../../../middleware/authMiddleware.js";


const router = express.Router();

router.get('/', ObtenerEventos);
router.get('/fichas', ObtenerFichas);
router.get('/fichaCaracteristica/:idFichaRegistro', ObtenerCarateristicaFicha);
router.get('/participantes/:idEvento/:idFichaRegistro', ObtenerParticipantesPorFicha);
router.get('/credenciales/:idEvento/:idFichaRegistro', ObtenerCredencialesPorFicha);
router.get('/ubicacionCampos', ObtenerUbicacionesCampos);

router.post('/insCredencial', InsertarCredencial);

router.post('/campos', checkAuth, insertarCamposCredencial);





export default router;
