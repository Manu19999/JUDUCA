//++++++++++++++++++++++++++  Librería externa  ++++++++++++++++++++++++++
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 



//++++++++++++++++++++++++++  Importaciones de rutas de credenciales  ++++++++++++++++++++++++++
import CredencialRoutes from './src/modules/credenciales/routes/credencialRoutes.js';

//++++++++++++++++++++++++++  Importaciones de rutas de eventos  ++++++++++++++++++++++++++



//++++++++++++++++++++++++++  Importaciones de rutas de fichas  ++++++++++++++++++++++++++


//++++++++++++++++++++++++++  Importaciones de rutas de mantenimientos  ++++++++++++++++++++++++++
import Paises from './src/modules/mantenimientos/routes/paisesRoutes.js';
import Ciudades from './src/modules/mantenimientos/routes/ciudadesRoutes.js';
import Generos from './src/modules/mantenimientos/routes/generosRoutes.js';


//++++++++++++++++++++++++++  Importaciones de rutas de juegos  ++++++++++++++++++++++++++



//++++++++++++++++++++++++++  Importaciones de rutas de seguridad  ++++++++++++++++++++++++++
import AuthRoutes from './src/modules/seguridad/routes/authRoutes.js';
import Roles from './src/modules/seguridad/routes/rolesRoutes.js';
import Universidades from './src/modules/seguridad/routes/universidadesRoutes.js';

//++++++++++++++++++++++++++  Importaciones de rutas de vouchers  ++++++++++++++++++++++++++
import VoucherComidaRoutes   from './src/modules/vouchers/routes/voucherComidaRoutes.js';



//++++++++++++++++++++++++++ Configuraciones del servidor ++++++++++++++++++++++++++

dotenv.config(); 
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
    origin: 'http://localhost:5173', // Permitir sólo desde el frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true, // Para permitir cookies en las solicitudes
}));


//++++++++++++++++++++++++++ Rutas ++++++++++++++++++++++++++

//Credenciales
app.use('/api/credencial', CredencialRoutes);

//Eventos


//Fichas


//Mantenimientos
app.use('/api/paises', Paises);
app.use('/api/ciudades', Ciudades);
app.use('/api/generos', Generos);


//Juegos


//Seguridad
app.use('/api/auth', AuthRoutes);
app.use('/api/roles', Roles);
app.use('/api/Universidades', Universidades);

//Vouchers
app.use('/api/voucherComida', VoucherComidaRoutes); 


//++++++++++++++++++++++++++ Inicialización del servidor ++++++++++++++++++++++++++ 
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
