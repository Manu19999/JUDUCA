import express from 'express';
import { ObtenerFichas, ObtenerCamposCredencialPorFicha, ObtenerCarateristicaFicha, ObtenerParticipantesPorFicha, ObtenerCredencialesPorFicha,ObtenerDiseñoCredencialPorFicha, ObtenerUbicacionesCampos , InsertarCredencial, insertarCamposCredencial, eliminarCamposCredencial  } from '../controllers/credencialController.js';
import checkAuth from "../../../middleware/authMiddleware.js";


const router = express.Router();

router.get('/fichas',checkAuth, ObtenerFichas);
router.get('/fichaCaracteristica/:idFichaRegistro',checkAuth, ObtenerCarateristicaFicha);
router.get('/participantes/:idEvento/:idFichaRegistro',checkAuth, ObtenerParticipantesPorFicha);
router.get('/credenciales/:idEvento/:idFichaRegistro',checkAuth, ObtenerCredencialesPorFicha);
router.get('/ubicacionCampos',checkAuth,ObtenerUbicacionesCampos);
router.get('/camposCredencial/:idFichaRegistro',checkAuth, ObtenerCamposCredencialPorFicha);
router.get('/diseCredencial/:idFichaRegistro',checkAuth, ObtenerDiseñoCredencialPorFicha);


router.post('/insCredencial', checkAuth, InsertarCredencial);

router.post('/campos', checkAuth, insertarCamposCredencial);

router.post('/deleteCampos', checkAuth, eliminarCamposCredencial);



export default router;
