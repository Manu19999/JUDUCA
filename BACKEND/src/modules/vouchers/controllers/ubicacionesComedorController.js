import conexionbd from "../../../config/db.js";
import sql from 'mssql';

// Obtener todas o una ubicación específica
export const getUbicacionesComedores = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await conexionbd();
    const request = pool.request();

    if (id) {
      request.input('idUbicacionComedor', sql.Int, parseInt(id));
    } else {
      request.input('idUbicacionComedor', sql.Int, null);
    }

    const result = await request.execute('Comedores.splUbicacionesComedoresObtener');
    res.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener ubicaciones:", error);
    res.status(500).json({ error: "Error al obtener ubicaciones", details: error.message });
  }
};




// Insertar nueva ubicación
export const insertarUbicacionComedor = async (req, res) => {
  try {
    const { nombre, direccion, idObjeto } = req.body;

    // ✅ Extrae de la sesión
    const idUsuario = req.usuario?.idUsuario;
    const nombreUsuario = req.usuario?.nombreUsuario;

    if (!idUsuario || !nombreUsuario) {
      return res.status(400).json({ mensaje: "Usuario no autenticado correctamente" });
    }

    const pool = await conexionbd();
    const result = await pool
      .request()
      .input("nombre", sql.VarChar(100), nombre)
      .input("direccion", sql.VarChar(200), direccion)
      .input("idUsuario", sql.Int, idUsuario)
      .input("nombreUsuario", sql.NVarChar(90), nombreUsuario)
      .input("idObjeto", sql.Int, idObjeto) // Asegúrate que el idObjeto exista en Seguridad.tblObjetos
      .execute("Comedores.splUbicacionesComedoresInsertar");

    res.status(200).json(result.recordset[0]);
  } catch (error) {
    console.error("Error al insertar ubicación:", error);
    res.status(500).json({
      mensaje: "Error al insertar ubicación",
      detalles: error.message,
    });
  }
};



// Actualizar una ubicación existente
export const actualizarUbicacionComedor = async (req, res) => {
  try {
    const {
      idUbicacionComedor,
      nombre,
      direccion,
      idObjeto
    } = req.body;

    // ✅ Extrae de la sesión
    const idUsuario = req.usuario?.idUsuario;
    const nombreUsuario = req.usuario?.nombreUsuario;

    if (!idUsuario || !nombreUsuario) {
      return res.status(400).json({ mensaje: "Usuario no autenticado correctamente" });
    }

    const pool = await conexionbd();
    const result = await pool
      .request()
      .input("idUbicacionComedor", sql.Int, idUbicacionComedor)
      .input("nombre", sql.VarChar(100), nombre)
      .input("direccion", sql.VarChar(200), direccion)
      .input("idUsuario", sql.Int, idUsuario)
      .input("nombreUsuario", sql.NVarChar(90), nombreUsuario)
      .input("idObjeto", sql.Int, idObjeto)
      .execute("Comedores.splUbicacionesComedoresActualizar");

    res.status(200).json(result.recordset[0]); // Devuelve la ubicación actualizada
  } catch (error) {
    console.error("Error al actualizar ubicación:", error);
    res.status(500).json({
      mensaje: "Error al actualizar ubicación",
      detalles: error.message,
    });
  }
};



// Eliminar una ubicación de comedor
export const eliminarUbicacionComedor = async (req, res) => {
  try {
    const { idObjeto } = req.body;
    const idUbicacionComedor = req.params.id;

    // ✅ Obtener usuario desde el token (sesión)
    const idUsuario = req.usuario?.idUsuario;
    const nombreUsuario = req.usuario?.nombreUsuario;

    if (!idUsuario || !nombreUsuario) {
      return res.status(401).json({ mensaje: "Usuario no autenticado correctamente" });
    }

    const pool = await conexionbd();
    const result = await pool
      .request()
      .input("idUbicacionComedor", sql.Int, idUbicacionComedor)
      .input("idUsuario", sql.Int, idUsuario)
      .input("nombreUsuario", sql.NVarChar(90), nombreUsuario)
      .input("idObjeto", sql.Int, idObjeto)
      .execute("Comedores.splUbicacionesComedoresEliminar");

    res.status(200).json({ mensaje: "Ubicación eliminada correctamente", idUbicacionComedor });
  } catch (error) {
    console.error("Error al eliminar ubicación:", error);
    res.status(500).json({
      mensaje: "Error al eliminar ubicación",
      detalles: error.message,
    });
  }
};