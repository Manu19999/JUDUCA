//++++++++++++++++++++++++++  Librería externa  ++++++++++++++++++++++++++
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 



//++++++++++++++++++++++++++  Importaciones de rutas de credenciales  ++++++++++++++++++++++++++
import CredencialRoutes from './src/modules/credenciales/routes/credencialRoutes.js';
import PaisesRoutes from './src/modules/credenciales/routes/PaisesRoutes.js';

//++++++++++++++++++++++++++  Importaciones de rutas de eventos  ++++++++++++++++++++++++++



//++++++++++++++++++++++++++  Importaciones de rutas de fichas  ++++++++++++++++++++++++++



//++++++++++++++++++++++++++  Importaciones de rutas de juegos  ++++++++++++++++++++++++++



//++++++++++++++++++++++++++  Importaciones de rutas de seguridad  ++++++++++++++++++++++++++
import AuthRoutes from './src/modules/seguridad/routes/authRoutes.js';
import Roles from './src/modules/seguridad/routes/rolesRoutes.js';

//++++++++++++++++++++++++++  Importaciones de rutas de vouchers  ++++++++++++++++++++++++++
import VoucherComidaRoutes   from './src/modules/vouchers/routes/voucherComidaRoutes.js';



//++++++++++++++++++++++++++ Configuraciones del servidor ++++++++++++++++++++++++++

dotenv.config(); 
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));



//++++++++++++++++++++++++++ Rutas ++++++++++++++++++++++++++

//Credenciales
app.use('/api/credencial', CredencialRoutes);
app.use('/api/paises', PaisesRoutes);

//Eventos


//Fichas


//Juegos


//Seguridad
app.use('/api/auth', AuthRoutes);
app.use('/api/roles', Roles);

//Vouchers
app.use('/api/voucherComida', VoucherComidaRoutes); 


//++++++++++++++++++++++++++ Inicialización del servidor ++++++++++++++++++++++++++ 
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
