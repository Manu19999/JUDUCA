import { Router } from 'express';
import { enviarCodigo, verificarCodigo,verificarCodigoReset , enviarCodigoReset} from '../controllers/twoFactorController.js';

const router = Router();

router.post('/enviarCodigo', enviarCodigo);
router.post('/verificarCodigo', verificarCodigo);

router.post('/verificarCodigoReset', verificarCodigoReset);
router.post('/enviarCodigoReset', enviarCodigoReset);
export default router;
