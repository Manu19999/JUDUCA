require("dotenv").config(); // Cargar variables de entorno

const mysql = require("mysql2");

function conexionbd() {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  connection.connect((err) => {
    if (err) {
      console.error("Error de conexión:", err);
      return;
    }
  });

  return connection;
}

module.exports = conexionbd;
