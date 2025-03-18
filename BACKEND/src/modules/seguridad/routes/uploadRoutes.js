// src/modules/seguridad/routes/uploadRoutes.js
import express from 'express';
import upload from '../../../config/uploadConfig.js'; // Importar la configuración de Multer
import { subirImagen } from '../controllers/uploadController.js'; // Importar el controlador

const router = express.Router();

// Definir la ruta para subir imágenes
router.post("/subir-imagen", upload.single("file"), subirImagen);

export default router;