import express from 'express';

import { getPaises } from '../controllers/PaisesController.js';

const router = express.Router();


router.get('/getPaises', getPaises);





export default router;