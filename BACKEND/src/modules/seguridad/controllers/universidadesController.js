import conexionbd from "../../../config/db.js";
import apiResponse from "../../../utils/apiResponse.js";
import sql from 'mssql'; // Importar sql para acceder a los tipos de datos

// Controlador para obtener los roles
export const obtenerUniversidades = async (req, res) => {
  const { idUniversidad } = req.params; // Obtener el ID de la universidad si se proporciona
  const response = new apiResponse(); // Crear una instancia de apiResponse

  try {
    const pool = await conexionbd(); // Obtener el pool de conexiones
    const result = await pool
      .request()
      .input("idUniversidad", idUniversidad ? idUniversidad : null) // Pasar el parámetro opcional
      .execute("Eventos.splUniversidadesObtener"); // Llamar al procedimiento almacenado

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

// Controlador para insertar un nuevo rol
export const insertarUniversidad = async (req, res) => {
  const { idCiudad, nombre, fotoUrl, siglas, activo, idObjeto } = req.body;
  const response = new apiResponse(); // Crear una instancia de apiResponse
 
  try {
   // Usar los datos del usuario directamente desde `req.usuario`
   const idUsuario = req.usuario.idUsuario;
   const nombreUsuario = req.usuario.nombreUsuario;
   
    const pool = await conexionbd(); // Obtener el pool de conexiones
    const result = await pool
    .request()
    .input("idCiudad", sql.Int, idCiudad) // Nuevo parámetro para idCiudad
    .input("nombre", sql.NVarChar, nombre) // Cambiar a sql.NVarChar para NVARCHAR
    .input("fotoUrl", sql.NVarChar, fotoUrl) // Nuevo parámetro para fotoUrl
    .input("siglas", sql.NVarChar, siglas) // Nuevo parámetro para siglas
    .input("activo", sql.Bit, activo) // Nuevo parámetro para activo
    .input("idUsuario", sql.Int, idUsuario) // ID del usuario
    .input("nombreUsuario", sql.NVarChar, nombreUsuario) // Nombre del usuario
    .input("idObjeto", sql.Int, idObjeto) // ID del objeto
    .execute("Eventos.splUniversidadesInsertar"); // Llamar al procedimiento almacenado

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