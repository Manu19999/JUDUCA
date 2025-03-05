import ejecutarConsulta from "../config/db.js";

export const getUbicacionesCampos = async (req, res) => {
  try {
    const { error, data } = await ejecutarConsulta("SELECT * FROM tblPais");

    res.status(200).json({
      success: true,
      data: data || [],  // Si no hay datos, devuelve un array vacío
      error: error || [], // Si no hay errores, devuelve un array vacío
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: [], // Aseguramos que data esté presente
      error: [{ type: "serverError", message: "Error interno del servidor" }],
    });
  }
};
