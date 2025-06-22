import conexionbd from "../../../config/db.js";
import apiResponse from "../../../utils/apiResponse.js";
import sql from 'mssql'; // Importar sql para acceder a los tipos de datos

// Controlador para obtener los estado-usuario
export const obtenerEstadosUsuario = async (req, res) => {
  const { idEstadoUsuario } = req.params; // Obtener el ID del estado-usuario si se proporciona
  const response = new apiResponse(); // Crear una instancia de apiResponse

  try {
    const pool = await conexionbd(); // Obtener el pool de conexiones
    const result = await pool
      .request()
      .input("idEstadoUsuario", idEstadoUsuario ? idEstadoUsuario : null) // Pasar el parámetro opcional
      .execute("Usuarios.splEstadosUsuarioObtener"); // Llamar al procedimiento almacenado

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

// Controlador para insertar un nuevo estado usuario
export const insertarEstadoUsuario = async (req, res) => {
  const { estado, descripcion, idObjeto }  = req.body;
  const response = new apiResponse(); // Crear una instancia de apiResponse
 
  try {
   // Usar los datos del usuario directamente desde `req.usuario`
   const idUsuario = req.usuario.idUsuario;
   const nombreUsuario = req.usuario.nombreUsuario;
   
    const pool = await conexionbd(); // Obtener el pool de conexiones
    const result = await pool
      .request()
      .input("estado", sql.NVarChar, estado)
            .input("descripcion", sql.NVarChar, descripcion)
            .input("idUsuario", sql.Int, idUsuario)
            .input("nombreUsuario", sql.NVarChar, nombreUsuario)
            .input("idObjeto", sql.Int, idObjeto)
            .execute("Usuarios.splEstadosUsuarioInsertar"); // Llamar al procedimiento almacenado

    // Si el procedimiento devuelve un error
    if (result.recordset.length > 0 && result.recordset[0].codigoError) {
      response.setHasError(true);
      response.setErrors([result.recordset[0].descripcion]);
      return res.status(400).json(response.getResponse());
    }

    // Asignar los datos a la respuesta
    response.setData(result.recordset[0]);

    // Enviar la respuesta exitosa
    res.status(201).json(response.getResponse());
  } catch (error) {
    // Manejar el error
    response.setHasError(true);
    response.setErrors([error.message]);

    // Enviar la respuesta con error
    res.status(500).json(response.getResponse());
  }
};

// Controlador para actualizar un estado usuario
export const actualizarEstadoUsuario = async (req, res) => {
  const { idEstadoUsuario  } = req.params; // Obtener el ID del estado usuario desde los parámetros de la URL
  const { estado, descripcion, idObjeto } = req.body; // Obtener los datos del cuerpo de la solicitud
  const response = new apiResponse(); // Crear una instancia de apiResponse

  try {
      // Usar los datos del usuario directamente desde `req.usuario`
      const idUsuario = req.usuario.idUsuario;
      const nombreUsuario = req.usuario.nombreUsuario;

      const pool = await conexionbd(); // Obtener el pool de conexiones
      const result = await pool
        .request()
        .input("idEstadoUsuario", sql.Int, idEstadoUsuario) // Pasar el ID del estado
        .input("estado", sql.NVarChar, estado) // Pasar el nombre del estado
        .input("descripcion", sql.NVarChar, descripcion) // Pasar la descripción del estado
        .input("idUsuario", sql.Int, idUsuario) // Pasar el ID del usuario
        .input("nombreUsuario", sql.NVarChar, nombreUsuario) // Pasar el nombre del usuario
        .input("idObjeto", sql.Int, idObjeto) // Pasar el ID del objeto
        .execute("Usuarios.splEstadosUsuarioActualizar");// Llamar al procedimiento almacenado

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


// Controlador para eliminar un estado usuario
export const eliminarEstadoUsuario = async (req, res) => {
  const {  idEstadoUsuario } = req.params; // Obtener el ID del estado usuario a eliminar desde los parámetros
  const { idObjeto } = req.body; // Obtener el ID del objeto desde el cuerpo de la solicitud
  const response = new apiResponse(); // Crear una instancia de apiResponse

  try {

    // Usar los datos del usuario directamente desde `req.usuario`
    const idUsuario = req.usuario.idUsuario;
    const nombreUsuario = req.usuario.nombreUsuario;

    const pool = await conexionbd(); // Obtener el pool de conexiones
    const result = await pool
      .request()
      .input("idEstadoUsuario", sql.Int, idEstadoUsuario) // Pasar el ID del estado a eliminar
      .input("idUsuario", sql.Int, idUsuario) // Pasar el ID del usuario
      .input("nombreUsuario", sql.NVarChar, nombreUsuario) // Pasar el nombre del usuario
      .input("idObjeto", sql.Int, idObjeto) // Pasar el ID del objeto
      .execute("Usuarios.splEstadosUsuarioEliminar"); // Llamar al procedimiento almacenado

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