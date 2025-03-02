import express from 'express';

import { getUbicacionesCampos } from '../controllers/CredencialController.js';

const router = express.Router();


router.get('/ubicacionescampos', getUbicacionesCampos);





export default router;