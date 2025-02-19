import conexionbd from "../config/db.js";
const pool = conexionbd();

// Controlador para obtener las credenciales
export const getUbicacionesCampos = async (req, res) => {
  try {
    const pool = await conexionbd();
    const result = await pool.request().query("SELECT * FROM tblUbicacionesCampos");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};