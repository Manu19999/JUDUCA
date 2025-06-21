import conexionbd from "../../../config/db.js";
import apiResponse from "../../../utils/apiResponse.js";
import sql from 'mssql'; // Importar sql para acceder a los tipos de datos

// Controlador para obtener los parametros
export const obtenerParametros = async (req, res) => {
  const { idParametro } = req.params; // Obtener el ID del parametro si se proporciona
  const response = new apiResponse(); // Crear una instancia de apiResponse

  try {
    const pool = await conexionbd(); // Obtener el pool de conexiones
    const result = await pool
      .request()
      .input("idParametro", idParametro ? idParametro : null) // Pasar el parámetro opcional
      .execute("Seguridad.splParametrosObtener"); // Llamar al procedimiento almacenado

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


  // Controlador para actualizar un rol
  export const actualizarParametro = async (req, res) => {
    const { idParametro } = req.params; // Obtener el ID del rol desde los parámetros de la URL
    const { valor, idObjetoBitacora} = req.body; // Obtener los datos del cuerpo de la solicitud
    const response = new apiResponse(); // Crear una instancia de apiResponse

    try {
        // Usar los datos del usuario directamente desde `req.usuario`
        const idUsuario = req.usuario.idUsuario;
        const nombreUsuario = req.usuario.nombreUsuario;

        const pool = await conexionbd(); // Obtener el pool de conexiones
        const result = await pool
        .request()
        .input("idParametro", sql.Int, idParametro)
        .input("valor", sql.VarChar(100), valor)
        .input("idUsuarioRegistro", sql.Int, idUsuario)
        .input("usuarioRegistro", sql.NVarChar(90), nombreUsuario)
        .input("idObjetoBitacora", sql.Int, idObjetoBitacora)
        .execute("Seguridad.splParametrosActualizar"); // Llamar al procedimiento almacenado

        // Si el procedimiento devuelve un error
        if (result.recordset.length > 0 && result.recordset[0].codigoError) {
            response.setHasError(true);
            response.setErrors([result.recordset[0].descripcion]);
            return res.status(400).json(response.getResponse());
        }

        // Asignar los datos a la respuesta
        response.setData(result.recordset[0]);

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