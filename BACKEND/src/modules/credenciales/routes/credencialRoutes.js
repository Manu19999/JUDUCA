import express from 'express';
import { getUbicacionesCampos } from '../controllers/credencialController.js';

const router = express.Router();


router.get('/ubicacionescampos', getUbicacionesCampos);





export default router;