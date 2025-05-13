import express from "express";
import { ObtenerFichas, insertarFichaRegistroCaracteristicas, obtenerCatalogosFichaRegistro } from "../controllers/fichaController.js";

const router = express.Router();

router.get("/:idEvento", ObtenerFichas); // Añadido idEvento aquí
router.get("/catalogo/CaracteristicasFicha", obtenerCatalogosFichaRegistro); // Añadido idEvento aquí



router.post("/insFichaCaracteristicas", insertarFichaRegistroCaracteristicas); // Añadido idEvento aquí


export default router;
