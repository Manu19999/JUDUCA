import express from "express";
import {
  getUbicacionesComedores,
  insertarUbicacionComedor,
  actualizarUbicacionComedor,
  eliminarUbicacionComedor
} from "../controllers/ubicacionesComedorController.js";
import checkAuth from "../../../middleware/authMiddleware.js";

const router = express.Router();

// Obtener todas las ubicaciones
router.get("/", getUbicacionesComedores);

// Insertar una nueva ubicación
router.post("/", checkAuth, insertarUbicacionComedor);

// Actualizar una ubicación
router.put("/actuUbicacion", checkAuth, actualizarUbicacionComedor);

// Eliminar una ubicación (requiere ID por params y idObjeto en body)
router.delete("/:id", checkAuth, eliminarUbicacionComedor);

export default router;