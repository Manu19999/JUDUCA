//++++++++++++++++++++++++++  Librería externa  ++++++++++++++++++++++++++
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import path from 'path';
import uploadRoutes from './src/modules/seguridad/routes/uploadRoutes.js'; // Importar las rutas de subida de imágenes
import cookieParser from 'cookie-parser';

//++++++++++++++++++++++++++  Importaciones de rutas de credenciales  ++++++++++++++++++++++++++
import CredencialRoutes from './src/modules/credenciales/routes/credencialRoutes.js';

//++++++++++++++++++++++++++  Importaciones de rutas de eventos  ++++++++++++++++++++++++++
import EventosRoutes from './src/modules/eventos/routes/EventoRoutes.js';


//++++++++++++++++++++++++++  Importaciones de rutas de fichas  ++++++++++++++++++++++++++
import FichasRoutes from "./src/modules/fichas/routes/fichaRoutes.js";

//++++++++++++++++++++++++++  Importaciones de rutas de mantenimientos  ++++++++++++++++++++++++++
import Paises from './src/modules/mantenimientos/routes/paisesRoutes.js';
import Ciudades from './src/modules/mantenimientos/routes/ciudadesRoutes.js';
import Generos from './src/modules/mantenimientos/routes/generosRoutes.js';


//++++++++++++++++++++++++++  Importaciones de rutas de juegos  ++++++++++++++++++++++++++



//++++++++++++++++++++++++++  Importaciones de rutas de seguridad  ++++++++++++++++++++++++++
import AuthRoutes from './src/modules/seguridad/routes/authRoutes.js';
import Roles from './src/modules/seguridad/routes/rolesRoutes.js';
import Universidades from './src/modules/seguridad/routes/universidadesRoutes.js';
import Usuarios from './src/modules/seguridad/routes/usuariosRoutes.js';
import twoFactorRoutes from './src/modules/seguridad/routes/twoFactorRoutes.js';
import Objetos from './src/modules/seguridad/routes/objetosRoutes.js';
import Bitacoras from './src/modules/seguridad/routes/bitacorasRoutes.js';

//++++++++++++++++++++++++++  Importaciones de rutas de vouchers  ++++++++++++++++++++++++++
import VoucherComidaRoutes   from './src/modules/vouchers/routes/voucherComidaRoutes.js';



//++++++++++++++++++++++++++ Configuraciones del servidor ++++++++++++++++++++++++++

dotenv.config(); 
// Definir el puerto de una vez y usarlo en todo el código
const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173', // Permitir sólo desde el frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true, // Para permitir cookies en las solicitudes
}));

// Servir archivos estáticos desde la carpeta "uploads"
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Usar las rutas de subida de imágenes
app.use("/api", uploadRoutes);


//++++++++++++++++++++++++++ Rutas ++++++++++++++++++++++++++

//Credenciales
app.use('/api/credencial', CredencialRoutes);

//Eventos
app.use('/api/eventos', EventosRoutes);

//Fichas
app.use("/api/fichas", FichasRoutes);

//Mantenimientos
app.use('/api/paises', Paises);
app.use('/api/ciudades', Ciudades);
app.use('/api/generos', Generos);


//Juegos


//Seguridad
app.use('/api/auth', AuthRoutes);
app.use('/api/roles', Roles);
app.use('/api/universidades', Universidades);
app.use('/api/usuarios', Usuarios);
app.use('/api/objetos', Objetos);
app.use('/api/twofactor', twoFactorRoutes);
app.use('/api/bitacoras', Bitacoras);


//Vouchers
app.use('/api/voucherComida', VoucherComidaRoutes); 


//++++++++++++++++++++++++++ Inicialización del servidor ++++++++++++++++++++++++++ 
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
