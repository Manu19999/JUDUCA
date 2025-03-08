import conexionbd from "../../../config/db.js";
import apiResponse from "../../../utils/apiResponse.js";

export const getPaises = async (req, res) => {
  const response = new apiResponse();

  try {
    const pool = await conexionbd(); // Obtener conexión del pool
    const result = await pool.request().query("SELECT * FROM tblPais");

    response.setData(result.recordset);
    res.status(200).json(response.getResponse());
  } catch (error) {
    console.error("Error en getPaises:", error);
    response.setHasError(true);
    response.setErrors([error.message]);
    res.status(500).json(response.getResponse());
  }
};
