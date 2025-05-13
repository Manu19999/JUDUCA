import express from "express";
import { ObtenerFichas, insertarFichaRegistroCaracteristicas, obtenerCatalogosFichaRegistro } from "../controllers/fichaController.js";
import checkAuth from "../../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:idEvento", ObtenerFichas); // Añadido idEvento aquí
router.get("/catalogo/CaracteristicasFicha", obtenerCatalogosFichaRegistro); // Añadido idEvento aquí



router.post("/insFichaCaracteristicas",checkAuth,  insertarFichaRegistroCaracteristicas); // Añadido idEvento aquí


export default router;
