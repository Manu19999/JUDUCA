import conexionbd from "../../../config/db.js";
import sql from 'mssql';



// obtener todos los tipos de comida o uno específico
export const getTipoComida = async (req, res) => {
  try {
    const pool = await conexionbd();
    const result = await pool.request().execute("Comedores.splTipoComidaListar");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Error al obtener tipos de comida:", error);
    res.status(500).json({
      mensaje: "No se pudieron obtener los tipos de comida",
      detalles: error.message
    });
  }
};



// Insertar un nuevo tipo de comida

export const insertarTipoComida = async (req, res) => {
  try {
    const {
      tiempoComida,
      horaInicio,
      horaFinal,
      idObjeto
    } = req.body;

    const idUsuario = req.usuario?.idUsuario;
    const nombreUsuario = req.usuario?.nombreUsuario;

    if (!idUsuario || !nombreUsuario) {
      return res.status(401).json({ mensaje: "Usuario no autenticado correctamente" });
    }

    // 🔧 Convertir string "HH:mm:ss" en objeto Date
    const parseHora = (cadena) => {
      const [h, m, s] = cadena.split(":");
      const d = new Date();
      d.setHours(parseInt(h), parseInt(m), parseInt(s || 0), 0);
      return d;
    };

    const pool = await conexionbd();
    const result = await pool
      .request()
      .input("tiempoComida", sql.NVarChar(100), tiempoComida)
      .input("horaInicio", sql.Time, parseHora(horaInicio)) // 🟢 Corregido
      .input("horaFinal", sql.Time, parseHora(horaFinal))   // 🟢 Corregido
      .input("usuarioRegistro", sql.NVarChar(90), nombreUsuario)
      .input("idUsuario", sql.Int, idUsuario)
      .input("idObjeto", sql.Int, idObjeto)
      .execute("Comedores.splTipoComidaInsertar");

    res.status(200).json({
      mensaje: "Tipo de comida registrado correctamente",
      datos: result.recordset[0]
    });
  } catch (error) {
    console.error("Error al insertar tipo de comida:", error);
    res.status(500).json({
      mensaje: "No se pudo insertar el tipo de comida",
      detalles: error.message
    });
  }
};




// Actualizar un tipo de comida existente   



export const actualizarTipoComida = async (req, res) => {
  try {
    const {
      idTipoComida,
      tiempoComida,
      horaInicio,
      horaFinal,
      idObjeto
    } = req.body;

    const idUsuario = req.usuario?.idUsuario;
    const nombreUsuario = req.usuario?.nombreUsuario;

    if (!idUsuario || !nombreUsuario) {
      return res.status(401).json({ mensaje: "Usuario no autenticado correctamente" });
    }

    // Convertir horaInicio y horaFinal en objetos Date válidos para sql.Time
    const parseHora = (cadena) => {
      const [h, m, s] = cadena.split(":");
      const d = new Date();
      d.setHours(parseInt(h), parseInt(m), parseInt(s || 0), 0);
      return d;
    };

    const pool = await conexionbd();
    const result = await pool
      .request()
      .input("idTipoComida", sql.Int, idTipoComida)
      .input("tiempoComida", sql.NVarChar(100), tiempoComida)
      .input("horaInicio", sql.Time, parseHora(horaInicio))
      .input("horaFinal", sql.Time, parseHora(horaFinal))
      .input("usuarioRegistro", sql.NVarChar(90), nombreUsuario)
      .input("idUsuario", sql.Int, idUsuario)
      .input("idObjeto", sql.Int, idObjeto)
      .execute("Comedores.splTipoComidaActualizar");

    res.status(200).json({
      mensaje: "Tipo de comida actualizado correctamente",
      datos: result.recordset[0]
    });
  } catch (error) {
    console.error("Error al actualizar tipo de comida:", error);
    res.status(500).json({
      mensaje: "No se pudo actualizar el tipo de comida",
      detalles: error.message
    });
  }
};




// Eliminar un tipo de comida existente

export const eliminarTipoComida = async (req, res) => {
  try {
    const { idTipoComida } = req.params;

    const idUsuario = req.usuario?.idUsuario;
    const nombreUsuario = req.usuario?.nombreUsuario;

    if (!idUsuario || !nombreUsuario) {
      return res.status(401).json({ mensaje: "Usuario no autenticado correctamente" });
    }

    const idObjeto = parseInt(req.query.idObjeto);
    const pool = await conexionbd();

    const result = await pool
      .request()
      .input("idTipoComida", sql.Int, idTipoComida)
      .input("idUsuario", sql.Int, idUsuario)
      .input("nombreUsuario", sql.NVarChar(90), nombreUsuario)
      .input("idObjeto", sql.Int, idObjeto)
      .execute("Comedores.splTipoComidaEliminar");

    res.status(200).json({
      mensaje: "Tipo de comida eliminado correctamente",
      datos: result.recordset[0]
    });
  } catch (error) {
    console.error("Error al eliminar tipo de comida:", error);
    res.status(500).json({
      mensaje: "No se pudo eliminar el tipo de comida",
      detalles: error.message
    });
  }
};
