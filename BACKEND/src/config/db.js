import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const config = {
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10) || 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

// Función para ejecutar consultas SQL con manejo de errores
async function ejecutarConsulta(query) {
  let pool;
  try {
    pool = await sql.connect(config);
    const result = await pool.request().query(query);

    return { error: [], data: result.recordset }; // Si no hay error, error es un arreglo vacío
  } catch (error) {
    console.error("⚠️ Error en la consulta:", error);
    return { error: [{ message: error.message }], data: [] }; // Error en arreglo, data vacía
  } finally {
    if (pool) {
      await pool.close();
      console.log("🔌 Conexión cerrada correctamente");
    }
  }
}

export default ejecutarConsulta;
