import conexionbd from "../../../config/db.js";
import sql from 'mssql';

export const getComedores = async (req, res) => {
  try {
    const pool = await conexionbd();
    const result = await pool.request().execute("Comedores.splComedoresListar");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Error al obtener comedores:", error);
    res.status(500).json({
      mensaje: "Error al obtener comedores",
      detalles: error.message,
    });
  }
};



// Insertar un nuevo comedor
export const insertarComedor = async (req, res) => {
  try {
    const { idUbicacionComedor, numero, capacidad, activo, idObjeto } = req.body;

    const idUsuario = req.usuario?.idUsuario;
    const nombreUsuario = req.usuario?.nombreUsuario;

    if (!idUsuario || !nombreUsuario) {
      return res.status(401).json({ mensaje: "Usuario no autenticado correctamente" });
    }

    const pool = await conexionbd();
    const result = await pool
      .request()
      .input("idUbicacionComedor", sql.Int, idUbicacionComedor)
      .input("numero", sql.Int, numero)
      .input("capacidad", sql.Int, capacidad)
      .input("activo", sql.Bit, activo)
      .input("idUsuario", sql.Int, idUsuario)
      .input("nombreUsuario", sql.NVarChar(90), nombreUsuario)
      .input("idObjeto", sql.Int, idObjeto)
      .execute("Comedores.splComedoresInsertar");

    res.status(200).json({
      mensaje: "Comedor registrado correctamente",
      datos: result.recordset[0],
    });
  } catch (error) {
    console.error("Error al insertar comedor:", error);
    res.status(500).json({
      mensaje: "No se pudo insertar el comedor",
      detalles: error.message,
    });
  }
};


// Actualizar un nuevo comedor
export const actualizarComedor = async (req, res) => {
  try {
    const {
      id_comedor,
      idUbicacionComedor,
      numero,
      capacidad,
      activo,
      idObjeto
    } = req.body;

    const idUsuario = req.usuario?.idUsuario;
    const nombreUsuario = req.usuario?.nombreUsuario;

    if (!idUsuario || !nombreUsuario) {
      return res.status(401).json({ mensaje: "Usuario no autenticado correctamente" });
    }

    const pool = await conexionbd();
    const result = await pool
      .request()
      .input("id_comedor", sql.Int, id_comedor)
      .input("idUbicacionComedor", sql.Int, idUbicacionComedor)
      .input("numero", sql.Int, numero)
      .input("capacidad", sql.Int, capacidad)
      .input("activo", sql.Bit, activo)
      .input("idUsuario", sql.Int, idUsuario)
      .input("nombreUsuario", sql.NVarChar(90), nombreUsuario)
      .input("idObjeto", sql.Int, idObjeto)
      .execute("Comedores.splComedoresActualizar");

    res.status(200).json({
      mensaje: "Comedor actualizado correctamente",
      datos: result.recordset[0]
    });
  } catch (error) {
    console.error("Error al actualizar comedor:", error);
    res.status(500).json({
      mensaje: "No se pudo actualizar el comedor",
      detalles: error.message
    });
  }
};



// Eliminar un comedor

export const eliminarComedor = async (req, res) => {
  try {
    const { id_comedor, idObjeto } = req.body;

    const idUsuario = req.usuario?.idUsuario;
    const nombreUsuario = req.usuario?.nombreUsuario;

    if (!idUsuario || !nombreUsuario) {
      return res.status(401).json({ mensaje: "Usuario no autenticado correctamente" });
    }

    const pool = await conexionbd();
    await pool
      .request()
      .input("id_comedor", sql.Int, id_comedor)
      .input("idUsuario", sql.Int, idUsuario)
      .input("nombreUsuario", sql.NVarChar(90), nombreUsuario)
      .input("idObjeto", sql.Int, idObjeto)
      .execute("Comedores.splComedoresEliminar");

    res.status(200).json({ mensaje: "Comedor eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar comedor:", error);
    res.status(500).json({
      mensaje: "No se pudo eliminar el comedor",
      detalles: error.message
    });
  }
};