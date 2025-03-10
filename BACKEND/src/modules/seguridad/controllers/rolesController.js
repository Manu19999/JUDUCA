import conexionbd from "../../../config/db.js";
import apiResponse from "../../../utils/apiResponse.js";
import sql from 'mssql'; // Importar sql para acceder a los tipos de datos

// Controlador para obtener los roles
export const obtenerRoles = async (req, res) => {
  const { idRol } = req.params; // Obtener el ID del rol si se proporciona
  const response = new apiResponse(); // Crear una instancia de apiResponse

  try {
    const pool = await conexionbd(); // Obtener el pool de conexiones
    const result = await pool
      .request()
      .input("idRol", idRol ? idRol : null) // Pasar el parámetro opcional
      .execute("Usuarios.splRolesObtener"); // Llamar al procedimiento almacenado

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
export const insertarRol = async (req, res) => {
    const { nombre, descripcion, idObjeto } = req.body;
    const response = new apiResponse(); // Crear una instancia de apiResponse
   
    try {
     // ✅ Usar los datos del usuario directamente desde `req.usuario`
     const idUsuario = req.usuario.idUsuario;
     const nombreUsuario = req.usuario.nombreUsuario;
     
      const pool = await conexionbd(); // Obtener el pool de conexiones
      const result = await pool
        .request()
        .input("nombre", sql.VarChar, nombre)
        .input("descripcion", sql.VarChar, descripcion)
        .input("idUsuario", sql.Int, idUsuario)
        .input("nombreUsuario", sql.VarChar, nombreUsuario)
        .input("idObjeto", sql.Int, idObjeto)
        .execute("Usuarios.splRolesInsertar"); // Llamar al procedimiento almacenado
  
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