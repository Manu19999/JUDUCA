// multerConfig.js
import multer from 'multer';
import path from 'path';

// Configurar multer para guardar las imágenes en la carpeta "uploads"
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Guardar en la carpeta "uploads"
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Nombre único para el archivo
    },
});

const upload = multer({ storage });

export default upload;