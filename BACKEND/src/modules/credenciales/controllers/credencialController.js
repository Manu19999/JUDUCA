import conexionbd from "../../../config/db.js";
import apiResponse from "../../../utils/apiResponse.js";



// Controlador para obtener los eventos (uno específico o todos)
export const ObtenerEventos = async (req, res) => {
  const { idEvento } = req.params; // Obtener el ID del evento si se proporciona
  const response = new apiResponse(); // Crear una instancia de apiResponse

  try {
    const pool = await conexionbd(); // Obtener la conexión a la BD

    // Ejecutar el procedimiento almacenado con el ID del evento (si existe)
    const result = await pool
      .request()
      .input("idEvento", idEvento ? parseInt(idEvento) : null) // Convertir idEvento a número o enviar null
      .execute("Eventos.splEventosObtener"); // Llamar al procedimiento almacenado

    // Verificar si el procedimiento almacenado devolvió un error
    if (result.recordset.length > 0 && result.recordset[0].codigoError) {
      response.setHasError(true);
      response.setErrors([result.recordset[0].descripcion]);
      return res.status(400).json(response.getResponse());
    }

    // Asignar los datos de los eventos a la respuesta
    response.setData(result.recordset);

    // Enviar la respuesta exitosa
    res.status(200).json(response.getResponse());
  } catch (error) {
    console.error("Error en ObtenerEventos:", error.message); // Registrar el error en consola

    // Manejar error interno del servidor
    response.setHasError(true);
    response.setErrors(["Error interno del servidor", error.message]);

    // Enviar respuesta con error
    res.status(500).json(response.getResponse());
  }
};


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
