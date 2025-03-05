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

// Crear pool de conexiones reutilizable
let pool;

async function getPool() {
  if (!pool) {
    try {
      pool = await sql.connect(config);
      console.log("✅ Conectado a la base de datos");
    } catch (error) {
      console.error("🚨 Error de conexión a la base de datos:", error.message);
      throw error;
    }
  }
  return pool;
}

// Función para ejecutar consultas SQL con manejo de errores categorizados
async function ejecutarConsulta(query, params = {}) {
  try {
    const pool = await getPool();
    const request = pool.request();

    // Agregar parámetros a la consulta si existen
    Object.keys(params).forEach((key) => {
      request.input(key, params[key]);
    });

    const result = await request.query(query);
    return { error: [], data: result.recordset };
  } catch (error) {
    let errorResponse = { error: [], data: [] };

    // ⚠️ Detectamos si es un error relacionado con HASH
    if (error.message.toLowerCase().includes("hash")) {
      console.error("⚠️ HashError:", error.message);
      errorResponse.error.push({ type: "hashError", message: "Hubo un problema con el hash en la consulta." });

    // ⚠️ Detectamos si es un error de datos (Ejemplo: tipos incorrectos o valores nulos)
    } else if (error.message.toLowerCase().includes("data") || error.message.toLowerCase().includes("null")) {
      console.error("⚠️ DataError:", error.message);
      errorResponse.error.push({ type: "dataError", message: "Hubo un problema con los datos enviados." });

    // ⚠️ Si no es ninguno de los anteriores, lo tratamos como error genérico
    } else {
      console.error("⚠️ Error General en SQL:", error.message);
      errorResponse.error.push({ type: "error", message: error.message });
    }

    return errorResponse;
  }
}

// Cerrar conexión cuando se cierre la app
process.on("exit", async () => {
  if (pool) {
    await pool.close();
    console.log("🔌 Conexión cerrada correctamente");
  }
});

export default ejecutarConsulta;
