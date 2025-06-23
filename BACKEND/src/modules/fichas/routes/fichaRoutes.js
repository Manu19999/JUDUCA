import express from "express";
import { ObtenerFichasPorEvento, ObtenerFormularioFicha, eliminarCampoFormulario, insertarFichaRegistro, actualizarFichaRegistro, insertarFichaRegistroCaracteristicas, InsertarParticipanteEvento, ObtenerOpcionesCaracteristicas, ObtenerCamposPorFicha,  obtenerCatalogosFichaRegistro } from "../controllers/fichaController.js";
import checkAuth from "../../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/fichasActivas/:activo?", checkAuth, ObtenerFichasPorEvento);
router.get("/catalogo/CaracteristicasFicha",checkAuth, obtenerCatalogosFichaRegistro); // Añadido idEvento aquí
router.get("/catalogo/OpcionesCaracteristicas/:idCatalogoCaracteristica",checkAuth, ObtenerOpcionesCaracteristicas); 
router.get("/camposFicha/:idFichaRegistro",checkAuth, ObtenerCamposPorFicha); 
router.get("/formularioFicha/:idFichaRegistro",checkAuth, ObtenerFormularioFicha); 


router.post("/insFichaRegistros",checkAuth,  insertarFichaRegistro); 
router.post("/insFichaCaracteristicas",checkAuth,  insertarFichaRegistroCaracteristicas); 
router.post("/delFichasCaracteristicas",checkAuth,  eliminarCampoFormulario); 
router.post("/insParticipanteEventos",checkAuth,  InsertarParticipanteEvento); 

router.put("/updFichaRegistros",checkAuth,  actualizarFichaRegistro); 



export default router;
