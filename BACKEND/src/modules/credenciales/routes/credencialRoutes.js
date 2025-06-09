import express from 'express';
import { ObtenerFichas, ObtenerCamposCredencialPorFicha, ObtenerCarateristicaFicha, ObtenerParticipantesPorFicha, ObtenerCredencialesPorFicha,ObtenerDiseñoCredencialPorFicha, ObtenerUbicacionesCampos , InsertarCredencial, insertarCamposCredencial, eliminarCamposCredencial  } from '../controllers/credencialController.js';
import checkAuth from "../../../middleware/authMiddleware.js";


const router = express.Router();

router.get('/fichas',checkAuth, ObtenerFichas);
router.get('/fichaCaracteristica/:idFichaRegistro', ObtenerCarateristicaFicha);
router.get('/participantes/:idEvento/:idFichaRegistro', ObtenerParticipantesPorFicha);
router.get('/credenciales/:idEvento/:idFichaRegistro', ObtenerCredencialesPorFicha);
router.get('/ubicacionCampos', ObtenerUbicacionesCampos);
router.get('/camposCredencial/:idFichaRegistro', ObtenerCamposCredencialPorFicha);
router.get('/diseCredencial/:idFichaRegistro', ObtenerDiseñoCredencialPorFicha);


router.post('/insCredencial', checkAuth, InsertarCredencial);

router.post('/campos', checkAuth, insertarCamposCredencial);

router.post('/deleteCampos', checkAuth, eliminarCamposCredencial);



export default router;
