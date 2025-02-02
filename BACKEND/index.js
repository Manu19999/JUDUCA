const express = require('express');
const db = require('./SRC/CONFIG/db');
const cors = require('cors');


/*                     IMPORTS O REQUIRE                                   */

const app = express();
app.use(express.json())
app.use(express.urlencoded())


app.use(cors({
    origin: 'http://localhost:3000', // Permitir sólo desde el frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true, // Para permitir cookies en las solicitudes
}));



app.get("/", (req, res) => {
    db.query("SELECT * FROM TBL_USUARIOS", (err, results) => {
      if (err) {
        res.status(500).send("Error en la base de datos: " + err.message);
        return;
      }
      res.json(results); // Devuelve los eventos en formato JSON
    });
  });
  

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto: ${PORT}`);
});