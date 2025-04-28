import { Router } from 'express';
import { enviarCodigo, verificarCodigo } from '../controllers/twoFactorController.js';

const router = Router();

router.post('/enviarCodigo', enviarCodigo);
router.post('/verificarCodigo', verificarCodigo);

export default router;
