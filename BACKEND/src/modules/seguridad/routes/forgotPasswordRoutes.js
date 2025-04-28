import { Router } from 'express';
import { solicitarRecuperacion } from '../controllers/forgotPasswordController.js';

const router = Router();

router.post('/forgot-password', solicitarRecuperacion);

export default router;
