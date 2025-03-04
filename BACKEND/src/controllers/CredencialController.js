import ejecutarConsulta from "../config/db.js";

export const getUbicacionesCampos = async (req, res) => {
  const { error, data } = await ejecutarConsulta("SELECT * FROM tblEventos");

  res.json({ error, data }); // Siempre devuelve los dos arreglos
};
