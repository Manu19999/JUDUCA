import conexionbd from "../../../config/db.js";
import apiResponse from "../../../utils/apiResponse.js";
import sql from 'mssql'; // Importar sql para acceder a los tipos de datos


// Controlador para obtener las fichas de un evento específico o todas
export const ObtenerFichas = async (req, res) => {
  const { idEvento } = req.params; // Obtener el ID del evento si se proporciona
  const response = new apiResponse(); // Crear una instancia de apiResponse

  try {
    const pool = await conexionbd(); // Obtener el pool de conexiones
    const result = await pool
      .request()
      .input("idEvento", idEvento ? idEvento : null) // Pasar el parámetro opcional
      .execute("Registros.splFichasPorEventoObtener"); // Llamar al procedimiento almacenado

    // Si el procedimiento devuelve un error
    if (result.recordset.length > 0 && result.recordset[0].codigoError) {
      response.setHasError(true);
      response.setErrors([result.recordset[0].descripcion]);
      return res.status(400).json(response.getResponse());
    }

    // Asignar los datos a la respuesta
    response.setData(result.recordset);

    // Enviar la respuesta exitosa
    res.status(200).json(response.getResponse());
  } catch (error) {
    // Manejar el error
    response.setHasError(true);
    response.setErrors([error.message]);

    // Enviar la respuesta con error
    res.status(500).json(response.getResponse());
  }
};

// Controlador para obtener las caracteristicas de la ficha de un evento específico o todas
export const ObtenerCarateristicaFicha = async (req, res) => {
  const { idFichaRegistro } = req.params; // Obtener el ID del evento si se proporciona
  const response = new apiResponse(); // Crear una instancia de apiResponse

  try {
    const pool = await conexionbd(); // Obtener el pool de conexiones
    const result = await pool
      .request()
      .input("idFichaRegistro", idFichaRegistro ? idFichaRegistro : null) // Pasar el parámetro opcional
      .execute("Credenciales.splObtenerCaracteristicasFicha"); // Llamar al procedimiento almacenado

    // Si el procedimiento devuelve un error
    if (result.recordset.length > 0 && result.recordset[0].codigoError) {
      response.setHasError(true);
      response.setErrors([result.recordset[0].descripcion]);
      return res.status(400).json(response.getResponse());
    }

    // Asignar los datos a la respuesta
    response.setData(result.recordset);

    // Enviar la respuesta exitosa
    res.status(200).json(response.getResponse());
  } catch (error) {
    // Manejar el error
    response.setHasError(true);
    response.setErrors([error.message]);

    // Enviar la respuesta con error
    res.status(500).json(response.getResponse());
  }
};


// Controlador para obtener los campos de la credencial asignados a una ficha
export const ObtenerCamposCredencialPorFicha = async (req, res) => {
  const { idFichaRegistro } = req.params;
  const response = new apiResponse(); // Instancia de apiResponse

  try {
    const pool = await conexionbd(); // Obtener conexión a la BD
    const result = await pool
      .request()
      .input("idFichaRegistro", idFichaRegistro)
      .execute("Credenciales.[splCamposCredencialPorFichaObtener]");

    // Validar si el procedimiento devolvió error
    if (result.recordset.length > 0 && result.recordset[0].codigoError) {
      response.setHasError(true);
      response.setErrors([result.recordset[0].descripcion]);
      return res.status(400).json(response.getResponse());
    }

    // Asignar los datos si todo fue correcto
    response.setData(result.recordset);
    return res.status(200).json(response.getResponse());
  } catch (error) {
    response.setHasError(true);
    response.setErrors([error.message]);
    return res.status(500).json(response.getResponse());
  }
};

export const ObtenerDiseñoCredencialPorFicha = async (req, res) => {
  const { idFichaRegistro } = req.params;
  const response = new apiResponse(); // Instancia de apiResponse

  try {
    const pool = await conexionbd(); // Obtener conexión a la BD
    const result = await pool
      .request()
      .input("idFichaRegistro", idFichaRegistro)
      .execute("Credenciales.splDiseñoCredencialObtener");

    // Si no hay resultados
    if (result.recordset.length === 0) {
      response.setHasError(true);
      response.setErrors(["No se encontraron campos asignados para esta ficha."]);
      return res.status(404).json(response.getResponse());
    }

    // Respuesta exitosa
    response.setData(result.recordset);
    return res.status(200).json(response.getResponse());
  } catch (error) {
    // Manejo de errores inesperados
    response.setHasError(true);
    response.setErrors([`Error al obtener el diseño de credencial: ${error.message}`]);
    return res.status(500).json(response.getResponse());
  }
};


export const ObtenerDiseñoCredencialPorParticipante = async (req, res) => {
  const { idRegistroParticipanteEvento  } = req.params;
  const response = new apiResponse(); // Instancia de apiResponse

  try {
    const pool = await conexionbd(); // Obtener conexión a la BD
    const result = await pool
      .request()
      .input("idRegistroParticipanteEvento", idRegistroParticipanteEvento )
      .execute("Credenciales.splDiseñoCredencialPorParticipanteObtener");

    // Si no hay resultados
    if (result.recordset.length === 0) {
      response.setHasError(true);
      response.setErrors(["No se encontraron campos asignados para esta participante."]);
      return res.status(404).json(response.getResponse());
    }

    // Respuesta exitosa
    response.setData(result.recordset);
    return res.status(200).json(response.getResponse());
  } catch (error) {
    // Manejo de errores inesperados
    response.setHasError(true);
    response.setErrors([`Error al obtener el diseño de credencial: ${error.message}`]);
    return res.status(500).json(response.getResponse());
  }
};





// Controlador para obtener los participantes de una ficha en un evento específico
export const ObtenerParticipantesPorFicha = async (req, res) => {
  const { idEvento, idFichaRegistro } = req.params; // Extraer parámetros desde la URL
  const response = new apiResponse(); // Crear instancia de apiResponse

  try {
    // Validar que los parámetros sean números enteros
    if (!idEvento || isNaN(idEvento) || !idFichaRegistro || isNaN(idFichaRegistro)) {
      response.setHasError(true);
      response.setErrors(["Los parámetros idEvento e idFichaRegistro deben ser números válidos"]);
      return res.status(400).json(response.getResponse());
    }

    const pool = await conexionbd(); // Obtener la conexión a la BD

    // Ejecutar el procedimiento almacenado
    const result = await pool
      .request()
      .input("idEvento", parseInt(idEvento))
      .input("idFichaRegistro", parseInt(idFichaRegistro))
      .execute("Registros.splParticipantesPorFichaObtener");

    // Verificar si la ficha no pertenece al evento
    if (result.recordset.length > 0 && result.recordset[0].codigoError) {
      response.setHasError(true);
      response.setErrors([result.recordset[0].descripcion]);
      return res.status(400).json(response.getResponse());
    }

    // Asignar los datos de los participantes a la respuesta
    response.setData(result.recordset);

    // Enviar respuesta exitosa con los datos
    res.status(200).json(response.getResponse());
  } catch (error) {
    console.error("Error en ObtenerParticipantesPorFicha:", error.message);

    // Manejo de error interno del servidor
    response.setHasError(true);
    response.setErrors(["Error interno del servidor", error.message]);

    // Enviar respuesta con error
    res.status(500).json(response.getResponse());
  }
};
export const ObtenerUbicacionesCampos = async (req, res) => {
  const response = new apiResponse();

  try {
    const pool = await conexionbd();
    const result = await pool.request().execute("Credenciales.splObtenerUbicacionesCampos");

    // Filtrar en Node.js antes de enviar la respuesta
    const ubicacionesFiltradas = result.recordset.filter((ubicacion) => {
      return ubicacion.descripcion !== "Sin descripción" && // Excluir sin descripción
        !(ubicacion.fila === 0 && ubicacion.columna === 0); // Excluir ubicación (0,0)
    });

    if (ubicacionesFiltradas.length === 0) {
      response.setHasError(true);
      response.setErrors(["No se encontraron ubicaciones válidas."]);
      return res.status(404).json(response.getResponse());
    }

    response.setData(ubicacionesFiltradas);
    return res.status(200).json(response.getResponse());

  } catch (error) {
    console.error("Error al obtener ubicaciones:", error);
    response.setHasError(true);
    response.setErrors(["Error interno del servidor."]);
    return res.status(500).json(response.getResponse());
  }
};

// Controlador para obtener las credenciales generadas por ficha en un evento específico
export const ObtenerCredencialesPorFicha = async (req, res) => {
  const { idEvento, idFichaRegistro } = req.params; // Extraer parámetros desde la URL
  const response = new apiResponse(); // Crear instancia de apiResponse

  try {
    // Validar que los parámetros sean números enteros
    if (!idEvento || isNaN(idEvento) || !idFichaRegistro || isNaN(idFichaRegistro)) {
      response.setHasError(true);
      response.setErrors(["Los parámetros idEvento e idFichaRegistro deben ser números válidos"]);
      return res.status(400).json(response.getResponse());
    }

    const pool = await conexionbd(); // Obtener la conexión a la BD

    // Ejecutar el procedimiento almacenado
    const result = await pool
      .request()
      .input("idEvento", parseInt(idEvento))
      .input("idFichaRegistro", parseInt(idFichaRegistro))
      .execute("Credenciales.splCredencialesPorFichaObtener");

    // Verificar si la ficha no pertenece al evento o no tiene credenciales generadas
    if (result.recordset.length > 0 && result.recordset[0].codigoError) {
      response.setHasError(true);
      response.setErrors([result.recordset[0].descripcion]);
      return res.status(400).json(response.getResponse());
    }

    // Asignar los datos de las credenciales a la respuesta
    response.setData(result.recordset);

    // Enviar respuesta exitosa con los datos
    res.status(200).json(response.getResponse());
  } catch (error) {
    console.error("Error en ObtenerCredencialesPorFicha:", error.message);

    // Manejo de error interno del servidor
    response.setHasError(true);
    response.setErrors(["Error interno del servidor", error.message]);

    // Enviar respuesta con error
    res.status(500).json(response.getResponse());
  }
};

export const insertarCamposCredencial = async (req, res) => {
  const response = new apiResponse();

  try {
    const { idFichaRegistro, campos, fechaVigencia, idObjeto } = req.body;

    // Usuario desde el middleware (autenticado)
    const idUsuario = req.usuario.idUsuario;
    const nombreUsuario = req.usuario.nombreUsuario;

    if (!campos || !Array.isArray(campos) || campos.length === 0) {
      response.setHasError(true);
      response.setErrors(["Debe proporcionar al menos un campo."]);
      return res.status(400).json(response.getResponse());
    }

    const pool = await conexionbd();

    // Crear un Table para el parámetro tipo tabla
    const camposTable = new sql.Table("Credenciales.TipoCamposCredencial");
    camposTable.columns.add("idUbicacionCampo", sql.Int);
    camposTable.columns.add("leyenda", sql.NVarChar(100));
    camposTable.columns.add("lado", sql.Bit);
    camposTable.columns.add("caracteristica", sql.NVarChar(100));

    campos.forEach(campo => {
      camposTable.rows.add(
        campo.idUbicacionCampo,
        campo.leyenda,
        campo.lado,
        campo.caracteristica
      );
    });

    const result = await pool
      .request()
      .input("idFichaRegistro", sql.Int, idFichaRegistro)
      .input("campos", camposTable)
      .input("fechaVigencia", sql.DateTime, fechaVigencia)
      .input("idUsuario", sql.Int, idUsuario)
      .input("nombreUsuario", sql.NVarChar, nombreUsuario)
      .input("idObjeto", sql.Int, idObjeto)
      .execute("Credenciales.splInsertarCamposCredencial");

    // Validar si el procedimiento devolvió error
    if (result.recordset?.[0]?.codigoError) {
      response.setHasError(true);
      response.setErrors([result.recordset[0].descripcion]);
      return res.status(400).json(response.getResponse());
    }
    console.log(result);
    // Retornar respuesta con datos
    response.setData(result.recordset);
    res.status(201).json(response.getResponse());
  } catch (error) {
    response.setHasError(true);
    response.setErrors([error.message]);
    res.status(500).json(response.getResponse());
  }
};

export const eliminarCamposCredencial = async (req, res) => {
  const response = new apiResponse();

  try {
    const { idFichaRegistro, idCampos, idObjeto } = req.body;

    // Usuario desde middleware autenticado
    const idUsuario = req.usuario.idUsuario;
    const nombreUsuario = req.usuario.nombreUsuario;

    // Validación mínima
    if (!idCampos || !Array.isArray(idCampos) || idCampos.length === 0) {
      response.setHasError(true);
      response.setErrors(["Debe proporcionar al menos un ID de campo a eliminar."]);
      return res.status(400).json(response.getResponse());
    }

    const pool = await conexionbd();

    // Crear el table-valued parameter para los IDs de campos
    const idCamposTable = new sql.Table("Credenciales.tvpIdCamposCredencial");
    idCamposTable.columns.add("idCampoCredencial", sql.Int);

    idCampos.forEach(id => {
      idCamposTable.rows.add(id);
    });

    const result = await pool
      .request()
      .input("idFichaRegistro", sql.Int, idFichaRegistro)
      .input("idCampos", idCamposTable)
      .input("idUsuario", sql.Int, idUsuario)
      .input("nombreUsuario", sql.NVarChar, nombreUsuario)
      .input("idObjeto", sql.Int, idObjeto)
      .execute("Credenciales.splEliminarCamposCredencial");

    // Validar si hubo error
    if (result.recordset?.[0]?.codigoError !== 0) {
      response.setHasError(true);
      response.setErrors([result.recordset[0].descripcion]);
      return res.status(400).json(response.getResponse());
    }

    // Éxito
    response.setData(result.recordset);
    return res.status(200).json(response.getResponse());  // Solo esta respuesta
  } catch (error) {
    response.setHasError(true);
    response.setErrors([error.message]);
    return res.status(500).json(response.getResponse());
  }
};
// Controlador para insertar una credencial con código QR
export const InsertarCredencial = async (req, res) => {
  const response = new apiResponse(); // Crear instancia de apiResponse

  try {
    // Usar los datos del usuario directamente desde `req.usuario`
    const { idUsuario, nombreUsuario } = req.usuario;

    const {
      idEvento,
      activo,
      idFicha,
      idObjeto,
    } = req.body; // Extraer datos desde el cuerpo de la solicitud

    // 🔹 Validaciones de datos requeridos
    if (
      !idEvento || isNaN(idEvento) ||
      activo === undefined ||
      !nombreUsuario ||
      !idFicha || isNaN(idFicha) ||
      !idUsuario || isNaN(idUsuario) ||
      !idObjeto || isNaN(idObjeto)
    ) {
      response.setHasError(true);
      response.setErrors(["Todos los campos son obligatorios y deben ser válidos"]);
      return res.status(400).json(response.getResponse());
    }

    const pool = await conexionbd(); // Obtener la conexión a la BD

    // 🔹 Ejecutar el procedimiento almacenado para insertar la credencial
    const result = await pool
      .request()
      .input("idEvento", sql.Int, idEvento)
      .input("activo", sql.Bit, activo)
      .input("idFicha", sql.Int, idFicha)
      .input("idUsuario", sql.Int, idUsuario)
      .input("nombreUsuario", sql.NVarChar, nombreUsuario)
      .input("idObjeto", sql.Int, idObjeto)
      .execute("Credenciales.splCredencialQrInsertar");

    // 🔹 Verificar si hubo un error en el procedimiento almacenado
    if (result.recordset[0].codigoError) {
      response.setHasError(true);
      response.setErrors([result.recordset[0].descripcion]);
      return res.status(400).json(response.getResponse());
    }

    // 🔹 Devolver la credencial insertada
    response.setData(result.recordset[0]);
    res.status(201).json(response.getResponse());
  } catch (error) {
    console.error("Error en InsertarCredencial:", error.message);

    response.setHasError(true);
    response.setErrors(["Error interno del servidor", error.message]);
    res.status(500).json(response.getResponse());
  }
};
