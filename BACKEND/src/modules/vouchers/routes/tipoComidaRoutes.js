import express from "express";
import {
  getTipoComida,
  insertarTipoComida,
  actualizarTipoComida,
  eliminarTipoComida
} from "../controllers/tipoComidaController.js";

import checkAuth from "../../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", checkAuth, getTipoComida);
router.post("/", checkAuth, insertarTipoComida);
router.put("/actualizar", checkAuth, actualizarTipoComida);
router.delete("/:idTipoComida", checkAuth, eliminarTipoComida);


export default router;