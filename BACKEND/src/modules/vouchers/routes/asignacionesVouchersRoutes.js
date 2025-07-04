import express from "express";
import { getAsignacionesVouchers, insertarAsignacionVoucher, actualizarAsignacionVoucher, eliminarAsignacionVoucher} from "../../vouchers/controllers/asignacionesVouchersController.js";
import checkAuth from "../../../middleware/authMiddleware.js";

const router = express.Router();

// Rutas protegidas
router.get("/", checkAuth, getAsignacionesVouchers);
router.post("/insAsignacion", checkAuth, insertarAsignacionVoucher);
router.put("/actuAsignacion", checkAuth, actualizarAsignacionVoucher);
router.delete("/", checkAuth, eliminarAsignacionVoucher);


export default router;