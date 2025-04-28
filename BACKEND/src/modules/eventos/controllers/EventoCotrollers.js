// Obtener eventos
export const getEventos = async (req, res) => {
    try {
      const pool = await conexionbd();
      const result = await pool.request().query('SELECT idEvento, nombreEvento FROM Eventos');
      res.status(200).json(result.recordset);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener eventos' });
    }
  };