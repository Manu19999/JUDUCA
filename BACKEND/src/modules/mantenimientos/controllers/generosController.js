import conexionbd from "../../../config/db.js";
import apiResponse from "../../../utils/apiResponse.js";
import sql from 'mssql'; // Importar sql para acceder a los tipos de datos

// Controlador para obtener los roles
export const obtenerGeneros = async (req, res) => {
  const { idGenero } = req.params; // Obtener el ID de la universidad si se proporciona
  const response = new apiResponse(); // Crear una instancia de apiResponse

  try {
    const pool = await conexionbd(); // Obtener el pool de conexiones
    const result = await pool
      .request()
      .input("idGenero", idGenero ? idGenero : null) // Pasar el parámetro opcional
      .execute("Usuarios.splGenerosObtener"); // Llamar al procedimiento almacenado

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


// Controlador para insertar un nuevo género
export const insertarGeneros = async (req, res) => {
  const { descripcion, idObjeto } = req.body;
 
  try {
      // ✅ Usar los datos del usuario directamente desde `req.usuario`
      const idUsuario = req.usuario.idUsuario;
      const nombreUsuario = req.usuario.nombreUsuario;
      
      const pool = await conexionbd(); // Obtener el pool de conexiones
      const result = await pool
          .request()
          .input("descripcion", sql.NVarChar, descripcion)
          .input("idUsuario", sql.Int, idUsuario)
          .input("nombreUsuario", sql.NVarChar, nombreUsuario)
          .input("idObjeto", sql.Int, idObjeto)
          .execute("Usuarios.splGenerosInsertar"); // Llamar al procedimiento almacenado

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

