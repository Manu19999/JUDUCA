/*                     IMPORTS O REQUIRES                                   */

import conexionbd from './src/config/db.js';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 

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
    origin: 'http://localhost:3000', // Permitir sólo desde el frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true, // Para permitir cookies en las solicitudes
}));

/*PRUEBA*/
app.get('/', async (req, res) => {
    const query = 'SELECT * FROM TBL_USUARIOS';
  
    try {
        const [results] = await connection.query(query); 
        res.json(results); 
    } catch (err) {
        console.error('Error ejecutando la consulta:', err);
        res.status(500).send('Error en la consulta');
    }
});

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
