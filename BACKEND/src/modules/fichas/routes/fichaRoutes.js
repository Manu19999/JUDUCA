import express from "express";
import { ObtenerFichasPorEvento, insertarFichaRegistro, actualizarFichaRegistro, insertarFichaRegistroCaracteristicas, InsertarParticipanteEvento, ObtenerOpcionesCaracteristicas, ObtenerCamposPorFicha,  obtenerCatalogosFichaRegistro } from "../controllers/fichaController.js";
import checkAuth from "../../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/fichasActivas/:activo?", checkAuth, ObtenerFichasPorEvento);
router.get("/catalogo/CaracteristicasFicha", obtenerCatalogosFichaRegistro); // Añadido idEvento aquí
router.get("/catalogo/OpcionesCaracteristicas/:idCatalogoCaracteristica", ObtenerOpcionesCaracteristicas); 
router.get("/camposFicha/:idFichaRegistro", ObtenerCamposPorFicha); 

router.post("/insFichaRegistros",checkAuth,  insertarFichaRegistro); 
router.post("/insFichaCaracteristicas",checkAuth,  insertarFichaRegistroCaracteristicas); 
router.post("/insParticipanteEventos",checkAuth,  InsertarParticipanteEvento); 

router.put("/updFichaRegistros",checkAuth,  actualizarFichaRegistro); 



export default router;
