import conexionbd from "../../../config/db.js";
import apiResponse from "../../../utils/apiResponse.js";
import sql from 'mssql'; // Importar sql para acceder a los tipos de datos
import bcrypt from 'bcrypt';// encriptado de contraseña
// Controlador para obtener los roles
export const obtenerUsuarios = async (req, res) => {
  const { idUsuario } = req.params; // Obtener el ID del rol si se proporciona
  const response = new apiResponse(); // Crear una instancia de apiResponse

  try {
    const pool = await conexionbd(); // Obtener el pool de conexiones
    const result = await pool
      .request()
      .input("idUsuario", idUsuario ? idUsuario : null) // Pasar el parámetro opcional
      .execute("Usuarios.splUsuariosObtener"); // Llamar al procedimiento almacenado

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

// insertar o crear nuevo usuario
export const insertarUsuario = async (req, res) => {
  const {
      idRol,
      idEstadoUsuario,
      idGenero,
      idUniversidad,
      nombreUsuario,
      contrasena,
      email,
      nombreCompleto,
      telefono,
      tipoSangre,
      nombreContactoEmergencia,
      telefonoContactoEmergencia,
      fechaNacimiento,
      fotoUrl,
      idObjeto
  } = req.body;

  const response = new apiResponse();
  
  try {
      // Obtener datos del usuario que realiza el registro
      const idUsuarioRegistro = req.usuario.idUsuario;
      const nombreUsuarioRegistro = req.usuario.nombreUsuario;

      // Generar hash de la contraseña con costo adecuado
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

      const pool = await conexionbd();
      const result = await pool
          .request()
          .input("idRol", sql.Int, idRol)
          .input("idEstadoUsuario", sql.Int, idEstadoUsuario)
          .input("idGenero", sql.Int, idGenero)
          .input("idUniversidad", sql.Int, idUniversidad || null) // Acepta NULL
          .input("nombreUsuario", sql.NVarChar(50), nombreUsuario)
          .input("contrasena", sql.NVarChar(255), hashedPassword)
          .input("email", sql.NVarChar(100), email)
          .input("nombreCompleto", sql.NVarChar(100), nombreCompleto)
          .input("telefono", sql.NVarChar(20), telefono || null) // Acepta NULL
          .input("tipoSangre", sql.NVarChar(5), tipoSangre || null) // Acepta NULL
          .input("nombreContactoEmergencia", sql.NVarChar(100), nombreContactoEmergencia || null) // Acepta NULL
          .input("telefonoContactoEmergencia", sql.NVarChar(20), telefonoContactoEmergencia || null) // Acepta NULL
          .input("fechaNacimiento", sql.Date, fechaNacimiento || null) // Acepta NULL
          .input("fotoUrl", sql.NVarChar(255), fotoUrl || null) // Acepta NULL
          .input("idUsuarioRegistro", sql.Int, idUsuarioRegistro)
          .input("nombreUsuarioRegistro", sql.NVarChar(90), nombreUsuarioRegistro)
          .input("idObjeto", sql.Int, idObjeto)
          .execute("Usuarios.splUsuariosInsertar");

      // Manejo de errores desde el SP
      if (result.recordset.length > 0 && result.recordset[0].codigoError) {
          response.setHasError(true);
          // Usar el mensaje del SP que ya tiene validaciones específicas
          response.setErrors([result.recordset[0].descripcion]);
          return res.status(400).json(response.getResponse());
      }

      // Limpieza de datos sensibles
      const usuarioCreado = { ...result.recordset[0] };
      delete usuarioCreado.contrasena;

      response.setData(usuarioCreado);
      return res.status(201).json(response.getResponse());
      
  } catch (error) {
      // Manejo seguro de errores
      console.error('Error en insertarUsuario:', error);
      
      response.setHasError(true);
      
      // Mensajes personalizados para errores comunes
      if (error.message.includes('UNIQUE KEY constraint')) {
          response.setErrors(['El nombre de usuario o email ya está registrado']);
      } else {
          // Usar mensaje genérico en producción
          response.setErrors(['Error al procesar la solicitud']);
      }

      return res.status(500).json(response.getResponse());
  }
};

// Controlador para actualizar un usuario
export const actualizarUsuario = async (req, res) => {
  const { idUsuario } = req.params;
  const {
    idRol,
    idEstadoUsuario,
    idGenero,
    idUniversidad,
    nombreUsuario,
    email,
    contrasena, // Campo de contraseña añadido
    nombreCompleto,
    telefono,
    tipoSangre,
    nombreContactoEmergencia,
    telefonoContactoEmergencia,
    fechaNacimiento,
    fotoUrl,
    idObjeto
  } = req.body;

  const response = new apiResponse();

  try {
    // Obtener datos del usuario que realiza la actualización
    const idUsuarioRegistro = req.usuario.idUsuario;
    const nombreUsuarioRegistro = req.usuario.nombreUsuario;

    // Hashear la contraseña si se proporcionó
    let hashedPassword = null;
    if (contrasena) {
      const saltRounds = 12;
      hashedPassword = await bcrypt.hash(contrasena, saltRounds);
    }

    const pool = await conexionbd();

    // Ejecutar el procedimiento almacenado de actualización
    const result = await pool
      .request()
      .input("idUsuario", sql.Int, idUsuario)
      .input("idRol", sql.Int, idRol)
      .input("idEstadoUsuario", sql.Int, idEstadoUsuario)
      .input("idGenero", sql.Int, idGenero)
      .input("idUniversidad", sql.Int, idUniversidad || null)
      .input("nombreUsuario", sql.NVarChar(50), nombreUsuario)
      .input("email", sql.NVarChar(100), email)
      .input("nombreCompleto", sql.NVarChar(100), nombreCompleto)
      .input("telefono", sql.NVarChar(20), telefono || null)
      .input("tipoSangre", sql.NVarChar(5), tipoSangre || null)
      .input("nombreContactoEmergencia", sql.NVarChar(100), nombreContactoEmergencia || null)
      .input("telefonoContactoEmergencia", sql.NVarChar(20), telefonoContactoEmergencia || null)
      .input("fechaNacimiento", sql.Date, fechaNacimiento || null)
      .input("fotoUrl", sql.NVarChar(255), fotoUrl || null)
      .input("idUsuarioRegistro", sql.Int, idUsuarioRegistro)
      .input("nombreUsuarioRegistro", sql.NVarChar(90), nombreUsuarioRegistro)
      .input("idObjeto", sql.Int, idObjeto)
      .input("contrasena", sql.NVarChar(255), hashedPassword) // Envía null si no hay nueva contraseña
      .execute("Usuarios.splUsuariosActualizar");

    // Manejo de errores desde el SP
    if (result.recordset.length > 0 && result.recordset[0].codigoError) {
      response.setHasError(true);
      response.setErrors([result.recordset[0].descripcion]);
      
      const statusCode = result.recordset[0].criticidad === 1 ? 400 : 500;
      return res.status(statusCode).json(response.getResponse());
    }

    // Limpiar datos sensibles
    const usuarioActualizado = { ...result.recordset[0] };
    delete usuarioActualizado.contrasena;

    response.setData(usuarioActualizado);
    return res.status(200).json(response.getResponse());

  } catch (error) {
    console.error('Error en actualizarUsuario:', error);
    
    response.setHasError(true);
    
    if (error.message.includes('UNIQUE KEY constraint')) {
      response.setErrors(['El nombre de usuario o email ya está en uso']);
      return res.status(409).json(response.getResponse());
    } else if (error.message.includes('FOREIGN KEY constraint')) {
      response.setErrors(['Referencia inválida (rol, estado, género o universidad no existe)']);
      return res.status(400).json(response.getResponse());
    }

    response.setErrors(['Error al procesar la solicitud de actualización']);
    return res.status(500).json(response.getResponse());
  }
};