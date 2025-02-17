import dotenv from "dotenv";
import sql from "mssql";

dotenv.config();

// Configuración del pool de conexiones
const pool = new sql.ConnectionPool({
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT, 10) || 1433,
  authentication: {
    type: process.env.DB_AUTH_TYPE || "default",
    options: {
      domain: process.env.DB_DOMAIN || "",
    },
  },
  options: {
    trustServerCertificate: true,
  },
});

// Función para conectar y retornar el pool
async function conexionbd() {
  try {
    if (!pool.connected) {
      await pool.connect();
      console.log("✅ Conexión establecida con SQL Server");
    }
    return pool;
  } catch (err) {
    console.error("❌ Error en la conexión:", err);
    throw err;
  }
}

export default conexionbd;
