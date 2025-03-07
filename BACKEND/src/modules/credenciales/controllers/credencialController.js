import conexionbd from "../../../config/db.js";
import apiResponse from "../../../utils/apiResponse.js";

// Controlador para obtener las credenciales
export const getUbicacionesCampos = async (req, res) => {
  const response = new apiResponse(); // Crear una instancia de apiResponse
  try {
    const pool = await conexionbd(); // Obtener el pool de conexiones
    const result = await pool.request().query("SELECT * FROM tblUbicacionesCampos");

    // Asignar los datos a la respuesta
    response.setData(result.recordset);

    // Enviar la respuesta exitosa
    res.status(200).json(response.getResponse());
  } catch (error) {
    // Manejar el error
    response.setHasError(true);
    response.setErrors([error.message]);

    // Enviar la respuesta con error
    res.status(500).json(response.getResponse());
  }
};