import express from "express";
import {
  insertarComedor,
  actualizarComedor,
  eliminarComedor,
  getComedores
} from "../controllers/comedoresController.js";

import checkAuth from "../../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", checkAuth, getComedores);
router.post("/", checkAuth, insertarComedor);
router.put("/actualizar", checkAuth, actualizarComedor);
router.delete("/", checkAuth, eliminarComedor);

export default router;