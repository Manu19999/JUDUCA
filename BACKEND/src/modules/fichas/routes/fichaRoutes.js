import express from "express";
import { ObtenerFichas } from "../controllers/fichaController.js";

const router = express.Router();

router.get("/:idEvento", ObtenerFichas); // Añadido idEvento aquí

export default router;
