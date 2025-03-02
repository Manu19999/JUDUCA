/* IMPORTS */
import express from "express";
import dotenv from "dotenv";
import cors from "cors"; 
import CredencialRoutes from "./src/routes/CredencialRoutes.js";
import VoucherComidaRoutes from "./src/routes/VoucherComidaRoutes.js";

/* CONFIGURACIÓN */
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

/* RUTAS */
app.use("/api/credencial", CredencialRoutes);
app.use("/api/voucherComida", VoucherComidaRoutes);

/* INICIALIZACIÓN DEL SERVIDOR */
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
