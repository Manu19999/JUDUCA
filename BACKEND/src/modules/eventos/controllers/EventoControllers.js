import conexionbd from "../../../config/db.js";
import apiResponse from "../../../utils/apiResponse.js";
import sql from 'mssql'; // Importar sql para acceder a los tipos de datos


// Controlador para obtener los eventos (uno específico o todos)
export const ObtenerEventos = async (req, res) => {
  const { idEvento, activo } = req.params;
  const response = new apiResponse();

  try {
    const pool = await conexionbd();
    const request = pool.request();

    // Validar y enviar idEvento si existe
    if (idEvento !== undefined && idEvento !== null) {
      const idEventoParsed = parseInt(idEvento);
      if (!isNaN(idEventoParsed)) {
        request.input("idEvento", idEventoParsed);
      } else {
        response.setHasError(true);
        response.setErrors(["El parámetro 'idEvento' debe ser un número."]);
        return res.status(400).json(response.getResponse());
      }
    } else {
      request.input("idEvento", null);
    }

    // Validar y enviar 'activo' si existe
    if (activo !== undefined && activo !== null) {
      const activoParsed = parseInt(activo);
      if (!isNaN(activoParsed)) {
        request.input("activo", activoParsed);
      } else {
        response.setHasError(true);
        response.setErrors(["El parámetro 'activo' debe ser un número (1 o 0)."]);
        return res.status(400).json(response.getResponse());
      }
    } else {
      request.input("activo", null);
    }

    // Ejecutar el procedimiento almacenado
    const result = await request.execute("Eventos.splEventosObtener");

    const data = result.recordset;

    // Validar si hay un mensaje de error desde SQL
    if (data.length === 1 && data[0].codigoError) {
      response.setHasError(true);
      response.setErrors([data[0].descripcion]);
      response.setData([]);
    } else {
      response.setData(data);
    }

    return res.json(response.getResponse());

  } catch (error) {
    response.setHasError(true);
    response.setErrors(["Error del servidor", error.message]);
    return res.status(500).json(response.getResponse());
  }
};



export const insertarEvento = async (req, res) => {
    const {
        nombre,
        descripcion,
        fechaInicio,
        fechaFin,
        ubicacion,
        activo,
        fotoEvento,
        idObjeto
    } = req.body;

    const response = new apiResponse();

    try {
        const idUsuario = req.usuario.idUsuario;
        const nombreUsuario = req.usuario.nombreUsuario;

        const pool = await conexionbd();
        const result = await pool
            .request()
            .input("nombre", sql.NVarChar(100), nombre)
            .input("descripcion", sql.NVarChar(sql.MAX), descripcion)
            .input("fechaInicio", sql.DateTime, fechaInicio)
            .input("fechaFin", sql.DateTime, fechaFin)
            .input("ubicacion", sql.NVarChar(100), ubicacion)
            .input("activo", sql.Bit, activo)
            .input("fotoEvento", sql.NVarChar(255), fotoEvento || null) // URL opcional
            .input("idUsuario", sql.Int, idUsuario)
            .input("nombreUsuario", sql.NVarChar(90), nombreUsuario)
            .input("idObjeto", sql.Int, idObjeto)
            .execute("Eventos.splEventosInsertar");

        if (result.recordset.length > 0 && result.recordset[0].codigoError) {
            response.setHasError(true);
            response.setErrors([result.recordset[0].descripcion]);
            return res.status(400).json(response.getResponse());
        }

        response.setData(result.recordset[0]);
        return res.status(201).json(response.getResponse());

    } catch (error) {
        console.error("Error en insertarEvento:", error);

        response.setHasError(true);
        response.setErrors(["Error al procesar la solicitud"]);
        return res.status(500).json(response.getResponse());
    }
};


export const actualizarEvento = async (req, res) => {
    const {
        idEvento,
        nombre,
        descripcion,
        fechaInicio,
        fechaFin,
        ubicacion,
        activo,
        fotoEvento,
        idObjeto
    } = req.body;

    const response = new apiResponse();

    try {
        const idUsuario = req.usuario.idUsuario;
        const nombreUsuario = req.usuario.nombreUsuario;

        const pool = await conexionbd();
        const result = await pool
            .request()
            .input("idEvento", sql.Int, idEvento)
            .input("nombre", sql.NVarChar(100), nombre)
            .input("descripcion", sql.NVarChar(sql.MAX), descripcion)
            .input("fechaInicio", sql.DateTime, fechaInicio)
            .input("fechaFin", sql.DateTime, fechaFin)
            .input("ubicacion", sql.NVarChar(100), ubicacion)
            .input("activo", sql.Bit, activo)
            .input("fotoEvento", sql.NVarChar(255), fotoEvento || null)
            .input("idUsuario", sql.Int, idUsuario)
            .input("nombreUsuario", sql.NVarChar(90), nombreUsuario)
            .input("idObjeto", sql.Int, idObjeto)
            .execute("Eventos.splEventosActualizar");

        if (result.recordset.length > 0 && result.recordset[0].codigoError) {
            response.setHasError(true);
            response.setErrors([result.recordset[0].descripcion]);
            return res.status(400).json(response.getResponse());
        }

        response.setData(result.recordset[0]);
        return res.status(200).json(response.getResponse());

    } catch (error) {
        console.error("Error en actualizarEvento:", error);

        response.setHasError(true);
        response.setErrors(["Error al procesar la solicitud"]);
        return res.status(500).json(response.getResponse());
    }
};