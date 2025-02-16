import dotenv from "dotenv";
import sql from "mssql";

dotenv.config();

// Configuración del pool de conexiones
const pool = new sql.ConnectionPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT, 10) || 1433,
  options: {
    encrypt: true, // En Azure debe ser `true`
    trustServerCertificate: true, // Para entornos locales
  },
  pool: {
    max: 10, // Máximo de conexiones
    min: 0,
    idleTimeoutMillis: 30000, // 30 segundos de inactividad antes de cerrar la conexión
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
