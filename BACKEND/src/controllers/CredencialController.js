import ejecutarConsulta from "../config/db.js";

export const getUbicacionesCampos = async (req, res) => {
  try {
    const { error, data } = await ejecutarConsulta("SELECT * FROM tblCredencialesParticipantes");

    res.status(200).json({
      error: {
        hashError: [],  // Siempre presente, aunque vacío
        otherErrors: error || [], // Otros errores, si los hay
      },
      data: data || [],  // Siempre devuelve un array, aunque esté vacío
    });
  } catch (err) {
    res.status(500).json({
      error: {
        hashError: [],
        otherErrors: [{ type: "serverError", message: "Error interno del servidor" }],
      },
      data: [],
    });
  }
};
