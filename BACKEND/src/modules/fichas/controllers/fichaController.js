import conexionbd from "../../../config/db.js";
import apiResponse from "../../../utils/apiResponse.js";

// Controlador para obtener las fichas (uno específico o todos)
export const ObtenerFichas = async (req, res) => {
  const { idEvento } = req.params; // Aquí usa idEvento
  const response = new apiResponse();

  try {
    const pool = await conexionbd();

    const result = await pool
      .request()
      .input("idEvento", idEvento ? parseInt(idEvento) : null)
      .execute("Registros.splFichasPorEventoObtener");

    if (result.recordset.length > 0 && result.recordset[0].codigoError) {
      response.setHasError(true);
      response.setErrors([result.recordset[0].descripcion]);
      return res.status(400).json(response.getResponse());
    }

    response.setData(result.recordset);
    res.status(200).json(response.getResponse());
  } catch (error) {
    console.error("Error en ObtenerFichas:", error.message);
    response.setHasError(true);
    response.setErrors(["Error interno del servidor", error.message]);
    res.status(500).json(response.getResponse());
  }
};
