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
    origin: 'http://localhost:5173', // Permitir sólo desde el frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true, // Para permitir cookies en las solicitudes
}));

/*PRUEBA*/
app.get("/", async (req, res) => {
  try {
    const pool = await conexionbd();
    const result = await pool.request().query("SELECT * FROM TBL_SECCIONES");
    res.json(result.recordset); // Enviar los datos como JSON al cliente
  } catch (err) {
    console.error("❌ Error ejecutando la consulta:", err);
    res.status(500).json({ error: "Error al obtener los datos" });
  }
});

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
