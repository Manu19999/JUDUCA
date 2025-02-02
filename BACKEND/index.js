/*                     IMPORTS O REQUIRES                                   */

import conexionbd from './src/config/db.js';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 

/*                     CONFIGURACIONES BACKEND                                  */

const app = express();
dotenv.config(); 
app.use(express.json())
app.use(express.urlencoded())

const connect = async () => {
  try {
      await conexionbd();
      console.log('Base de datos conectada correctamente');
  } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
      process.exit(1); // Salir del proceso si no se puede conectar a la base de datos
  }
};

connect();

app.use(cors({
    origin: 'http://localhost:3000', // Permitir sólo desde el frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true, // Para permitir cookies en las solicitudes
}));




const PORT = 4000;

app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto: ${PORT}`);
});



/*                     CUERPO                                 */





