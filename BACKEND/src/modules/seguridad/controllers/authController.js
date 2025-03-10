import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import conexionbd from '../../../config/db.js';
import sql from 'mssql'; // Asegúrate de importar sql
import apiResponse from '../../../utils/apiResponse.js';

dotenv.config();

export const Login = async (req, res) => {
    const { email, contraseña } = req.body;

    // Crear una instancia de apiResponse
    const response = new apiResponse();

    try {
        const pool = await conexionbd();
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .input('contraseña', sql.VarChar, contraseña)
            .execute('Usuarios.splUsuariosAutenticar'); // Llamar al procedimiento almacenado

        // Verificar si el procedimiento devolvió un código de error
        if (result.recordset && result.recordset.length > 0 && result.recordset[0].codigoError) {
            const error = result.recordset[0];
            response.setErrors([error.descripcion]); // Usar el mensaje de error del procedimiento
            response.setHasError(true);
        } else if (result.recordset.length > 0) {
            // Si no hay error, obtener los datos del usuario
            const user = result.recordset[0];

            // Generar el token JWT con toda la información del usuario
            const token = jwt.sign(
                {
                    idUsuario: user.idUsuario,
                    email: user.email,
                    nombreUsuario: user.nombreUsuario,
                    idRol: user.idRol
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h', // El token expira en 1 hora
                }
            );

            // Establecer los datos en la respuesta
            response.setData({ token });
        }
    } catch (err) {
        console.error('Error en el login:', err); // Registrar el error en la consola
        // Establecer errores en la respuesta
        response.setErrors(['Error en el servidor. Por favor, inténtalo de nuevo más tarde']);
        response.setHasError(true);
    }

    // Enviar la respuesta estructurada
    res.status(response.hasError ? 500 : 200).json(response.getResponse());
};