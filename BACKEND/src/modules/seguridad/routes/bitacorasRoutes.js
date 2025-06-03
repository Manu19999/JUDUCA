import express from 'express';
import {obtenerBitacoras} from '../controllers/bitacorasController.js';
import checkAuth from "../../../middleware/authMiddleware.js";

const router = express.Router();

router.get('/',checkAuth, obtenerBitacoras);


export default router;
