import dotenv from "dotenv";
import sql from "mssql";

dotenv.config();

// Configuración del pool de conexiones
const poolPromise = new sql.ConnectionPool({
  server: process.env.DB_HOST,  
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10) || 1433,
  options: {
    encrypt: false, // Desactiva SSL si no tienes un certificado
    trustServerCertificate: true,
  },
}).connect();  // Al llamar connect() se garantiza la conexión asíncrona

// Función para retornar la promesa de la conexión
async function conexionbd() {
  try {
    const pool = await poolPromise;  // Esperamos la conexión
    console.log("✅ Conexión establecida con SQL Server");
    return pool;  // Retornamos el pool ya conectado
  } catch (err) {
    console.error("❌ Error en la conexión:", err);
    throw err;
  }
}

export default conexionbd;