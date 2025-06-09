import express from "express";
import { getVouchersComidas, insertVoucherComida, updateVoucherComida } from "../controllers/voucherComidaController.js";
import checkAuth from "../../../middleware/authMiddleware.js";
const router = express.Router();

// Ruta para obtener todos los vouchers
router.get("/", getVouchersComidas); 

// Ruta para insertar un nuevo voucher
router.post("/insVoucher", checkAuth, insertVoucherComida);  // Asegúrate de que esta línea esté correctamente escrita
// Nueva ruta para actualizar un voucher
router.put('/actuVoucher', checkAuth, updateVoucherComida);

export default router;