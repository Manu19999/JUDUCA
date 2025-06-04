import conexionbd from "../../../config/db.js";
import apiResponse from "../../../utils/apiResponse.js";
import sql from 'mssql'; // Importar sql para acceder a los tipos de datos

// Controlador para obtener los objetos
export const obtenerObjetos = async (req, res) => {
  const { idObjeto } = req.params; // Obtener el ID del objeto si se proporciona
  const response = new apiResponse(); // Crear una instancia de apiResponse

  try {
    const pool = await conexionbd(); // Obtener el pool de conexiones
    const result = await pool
      .request()
      .input("idObjeto", idObjeto ? idObjeto : null) // Pasar el parámetro opcional
      .execute("Seguridad.splObjetosObtener"); // Llamar al procedimiento almacenado

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

// Controlador para insertar un nuevo objeto
export const insertarObjeto = async (req, res) => {
    const { nombre, descripcion, tipoObjeto, idObjeto } = req.body;
    const response = new apiResponse(); // Crear una instancia de apiResponse
  
    try {
      // Usar los datos del usuario directamente desde `req.usuario`
      const idUsuario = req.usuario.idUsuario;
      const nombreUsuario = req.usuario.nombreUsuario;
  
      const pool = await conexionbd(); // Obtener el pool de conexiones
      const result = await pool
        .request()
        .input("nombre", sql.NVarChar, nombre)
        .input("descripcion", sql.Text, descripcion) // <-- TEXT requiere sql.Text
        .input("tipoObjeto", sql.NVarChar, tipoObjeto) // <-- Agregado
        .input("idUsuario", sql.Int, idUsuario)
        .input("nombreUsuario", sql.NVarChar, nombreUsuario)
        .input("idObjeto", sql.Int, idObjeto)
        .execute("Seguridad.splObjetosInsertar"); // Llamar al procedimiento correcto
  
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
  

// Controlador para actualizar un objeto
export const actualizarObjeto = async (req, res) => {
  const { idObjeto } = req.params;
  const {
    nombre,
    descripcion,
    tipoObjeto,
    idObjetoBitacora
  } = req.body;

  const response = new apiResponse();

  try {
    // Obtener datos del usuario que realiza la actualización
    const idUsuario = req.usuario.idUsuario;
    const nombreUsuario = req.usuario.nombreUsuario;

    const pool = await conexionbd();

    // Ejecutar el procedimiento almacenado de actualización
    const result = await pool
      .request()
      .input("idObjeto", sql.Int, idObjeto)
      .input("nombre", sql.NVarChar(100), nombre)
      .input("descripcion", sql.NVarChar(sql.MAX), descripcion) // Usamos NVARCHAR(MAX) en lugar de TEXT
      .input("tipoObjeto", sql.NVarChar(50), tipoObjeto)
      .input("idUsuario", sql.Int, idUsuario)
      .input("nombreUsuario", sql.NVarChar(90), nombreUsuario)
      .input("idObjetoBitacora", sql.Int, idObjetoBitacora)
      .execute("Seguridad.splObjetosActualizar");

    // Manejo de errores desde el SP
    if (result.recordset.length > 0 && result.recordset[0].codigoError) {
      response.setHasError(true);
      response.setErrors([result.recordset[0].descripcion]);
      
      const statusCode = result.recordset[0].criticidad === 1 ? 400 : 500;
      return res.status(statusCode).json(response.getResponse());
    }

    response.setData(result.recordset[0]);
    return res.status(200).json(response.getResponse());

  } catch (error) {
    console.error('Error en actualizarObjeto:', error);
    
    response.setHasError(true);
    
    if (error.message.includes('UNIQUE KEY constraint')) {
      response.setErrors(['Ya existe un objeto con el mismo nombre']);
      return res.status(409).json(response.getResponse());
    } else if (error.message.includes('FOREIGN KEY constraint')) {
      response.setErrors(['Referencia inválida (objeto para bitácora no existe)']);
      return res.status(400).json(response.getResponse());
    }

    response.setErrors(['Error al procesar la solicitud de actualización']);
    return res.status(500).json(response.getResponse());
  }
};


// Controlador para eliminar un objeto
export const eliminarObjeto = async (req, res) => {
  const { idObjeto } = req.params;
  const { idObjetoBitacora } = req.body; // Usar el mismo ID para bitácora
  const response = new apiResponse();

  try {
      // Obtener datos del usuario autenticado
      const idUsuario = req.usuario.idUsuario;
      const nombreUsuario = req.usuario.nombreUsuario;

      const pool = await conexionbd();

      // Ejecutar procedimiento almacenado
      const result = await pool
          .request()
          .input("idObjeto", sql.Int, idObjeto)
          .input("idUsuario", sql.Int, idUsuario)
          .input("nombreUsuario", sql.NVarChar(90), nombreUsuario)
          .input("idObjetoBitacora", sql.Int, idObjetoBitacora)
          .execute("Seguridad.splObjetosEliminar");

      // Manejar errores del SP
      if (result.recordset.length > 0 && result.recordset[0].codigoError) {
          response.setHasError(true);
          response.setErrors([result.recordset[0].descripcion]);
          
          const statusCode = result.recordset[0].criticidad === 1 ? 400 : 500;
          return res.status(statusCode).json(response.getResponse());
      }

      // Configurar respuesta exitosa
      response.setData({
          message: result.recordset[0]?.descripcion || 'Objeto eliminado correctamente'
      });

      return res.status(200).json(response.getResponse());

  } catch (error) {
      console.error('Error en eliminarObjeto:', error);
      
      response.setHasError(true);
      
      // Manejar errores específicos
      if (error.message.includes('FK_') || error.message.includes('constraint')) {
          response.setErrors(['No se puede eliminar el objeto porque tiene dependencias']);
          return res.status(400).json(response.getResponse());
      }

      response.setErrors(['Error al procesar la solicitud de eliminación']);
      return res.status(500).json(response.getResponse());
  }
};