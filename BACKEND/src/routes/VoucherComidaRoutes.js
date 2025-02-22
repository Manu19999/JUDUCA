import express from "express";
import { getVouchersComidas, insertVoucherComida } from "../controllers/VoucherComidaController.js";

const router = express.Router();

// Ruta para obtener todos los vouchers
router.get("/", getVouchersComidas); 

// Ruta para insertar un nuevo voucher
router.post("/insVoucher", insertVoucherComida);  // Asegúrate de que esta línea esté correctamente escrita

export default router;