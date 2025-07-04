import conexionbd from "../../../config/db.js";
import sql from "mssql";

/**
 * Obtener todas las asignaciones de vouchers desde el SP
 * SP: Comedores.SP_Obtener_AsignacionesVouchers
 */
export const getAsignacionesVouchers = async (req, res) => {
  try {
    const pool = await conexionbd(); // Conexión a BD
    const result = await pool.request().execute("Comedores.SP_Obtener_AsignacionesVouchers");

    res.status(200).json(result.recordset); // Enviar resultados al frontend
  } catch (error) {
    console.error("Error al obtener asignaciones de vouchers:", error);
    res.status(500).json({
      mensaje: "Error al obtener asignaciones",
      detalles: error.message,
    });
  }
};



export const insertarAsignacionVoucher = async (req, res) => {
  try {
    const {
      idVoucherComida,
      idCredencial,
      cantidadVouchers,
      diasVouchers,
      fechaInicio,
      fechaFinal,
      idObjeto // se puede usar para auditoría
    } = req.body;

    const idUsuario = req.usuario?.idUsuario;
    const nombreUsuario = req.usuario?.nombreUsuario;

    if (!idUsuario || !nombreUsuario) {
      return res.status(401).json({ mensaje: "Usuario no autenticado correctamente" });
    }

    const pool = await conexionbd();
    const result = await pool
      .request()
      .input("idVoucherComida", sql.Int, idVoucherComida)
      .input("idCredencial", sql.Int, idCredencial)
      .input("cantidadVouchers", sql.Int, cantidadVouchers)
      .input("diasVouchers", sql.Int, diasVouchers)
      .input("fechaInicio", sql.Date, fechaInicio)
      .input("fechaFinal", sql.Date, fechaFinal)
      .input("usuarioRegistro", sql.NVarChar(90), nombreUsuario)
      .execute("Comedores.SP_Insertar_AsignacionVoucher");

    res.status(200).json({
      mensaje: "Asignación de voucher registrada correctamente",
      datos: result.recordset?.[0] || null
    });
  } catch (error) {
    console.error("Error al registrar asignación de voucher:", error);
    res.status(500).json({
      mensaje: "No se pudo registrar la asignación",
      detalles: error.message
    });
  }
};

export const actualizarAsignacionVoucher = async (req, res) => {
  try {
    const {
      idAsignacionVoucher,
      cantidadVouchers,
      diasVouchers,
      fechaInicio,
      fechaFinal,
      idObjeto // Para auditoría si lo necesitas
    } = req.body;

    const idUsuario = req.usuario?.idUsuario;
    const nombreUsuario = req.usuario?.nombreUsuario;

    if (!idUsuario || !nombreUsuario) {
      return res.status(401).json({ mensaje: "Usuario no autenticado correctamente" });
    }

    const pool = await conexionbd();
    const result = await pool
      .request()
      .input("idAsignacionVoucher", sql.Int, idAsignacionVoucher)
      .input("cantidadVouchers", sql.Int, cantidadVouchers)
      .input("diasVouchers", sql.Int, diasVouchers)
      .input("fechaInicio", sql.Date, fechaInicio)
      .input("fechaFinal", sql.Date, fechaFinal)
      .input("usuarioRegistro", sql.NVarChar(90), nombreUsuario)
      .execute("Comedores.SP_Actualizar_AsignacionVoucher");

    res.status(200).json({
      mensaje: "Asignación actualizada correctamente",
      datos: result.recordset?.[0] || null
    });
  } catch (error) {
    console.error("Error al actualizar asignación de voucher:", error);
    res.status(500).json({
      mensaje: "No se pudo actualizar la asignación",
      detalles: error.message
    });
  }
};



// src/controllers/Comedores/asignacionesVouchers.controller.js



export const eliminarAsignacionVoucher = async (req, res) => {
  try {
    const { idAsignacionVoucher } = req.body;

    const pool = await conexionbd();
    await pool
      .request()
      .input("idAsignacionVoucher", sql.Int, idAsignacionVoucher)
      .execute("Comedores.SP_Eliminar_AsignacionVoucher");

    res.status(200).json({
      mensaje: "Asignación eliminada correctamente"
    });
  } catch (error) {
    console.error("Error al eliminar asignación de voucher:", error);
    res.status(500).json({
      mensaje: "No se pudo eliminar la asignación",
      detalles: error.message
    });
  }
};
