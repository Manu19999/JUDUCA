/*                     IMPORTS                                   */

import conexionbd from './src/config/db.js';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import CredencialRoutes from './src/routes/CredencialRoutes.js';
/*                     CONFIGURACIONES BACKEND                                  */

const app = express();
dotenv.config(); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let connection;

const connect = async () => {
  try {
      connection = await conexionbd(); 
      console.log('Base de datos conectada correctamente');
  } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
      process.exit(1); 
  }
};

connect();

app.use(cors({
    origin: 'http://localhost:5173', // Permitir sólo desde el frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true, // Para permitir cookies en las solicitudes
}));


/*                     RUTAS                                  */

app.use('/api/credencial', CredencialRoutes);













/*                     INICIALIZACION DEL SERVIDOR                                  */
const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
