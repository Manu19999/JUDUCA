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
    // Manejamos el error específico relacionado con hashes (si existe)
    if (error.message.toLowerCase().includes('hash')) {
      console.error("⚠️ Error relacionado con Hash:", error.message);
      return { error: [{ message: "Hubo un problema con el hash en la consulta." }], data: [] };
    }

    // Manejamos otros tipos de error
    console.error("⚠️ Error en la consulta:", error);
    return { error: [{ message: error.message }], data: [] }; // Error genérico
  } finally {
    if (pool) {
      await pool.close();
      console.log("🔌 Conexión cerrada correctamente");
    }
  }
}

export default ejecutarConsulta;
