import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import conexionbd from '../../../config/db.js';
import sql from 'mssql'; // Asegúrate de importar sql
import apiResponse from '../../../utils/apiResponse.js';

dotenv.config();

export const Login = async (req, res) => {
    const { email, contrasena } = req.body;
    const response = new apiResponse();

    try {
        const pool = await conexionbd();
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .input('contrasena', sql.VarChar, contrasena)
            .execute('Usuarios.splUsuariosAutenticar');

        if (result.recordset && result.recordset.length > 0 && result.recordset[0].codigoError) {
            const error = result.recordset[0];
            response.setErrors([error.descripcion]);
            response.setHasError(true);
        } else if (result.recordset.length > 0) {
            const user = result.recordset[0];

            const token = jwt.sign(
                {
                    idUsuario: user.idUsuario,
                    email: user.email,
                    nombreUsuario: user.nombreUsuario,
                    idRol: user.idRol
                },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            // Configurar la cookie HttpOnly
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
                sameSite: 'strict',
                maxAge: 3600000 // 1 hora en milisegundos
            });

            response.setData({ message: 'Autenticación exitosa' });
        }
    } catch (err) {
        console.error('Error en el login:', err);
        response.setErrors(['Error en el servidor. Por favor, inténtalo de nuevo más tarde']);
        response.setHasError(true);
    }

    res.status(response.hasError ? 500 : 200).json(response.getResponse());
};

export const Logout = (req, res) => {
    const response = new apiResponse();

    try {
        // Limpiar la cookie authToken
        res.clearCookie('authToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        
        // Opcional: Registrar el logout
        if (req.usuario) {
            console.log(`Usuario ${req.usuario.idUsuario} cerró sesión`);
        }

        response.setData({ 
            message: 'Sesión cerrada correctamente',
            usuario: req.usuario ? {
                idUsuario: req.usuario.idUsuario,
                email: req.usuario.email
            } : null
        });

    } catch (err) {
        console.error('Error en el logout:', err);
        response.setErrors(['Error al cerrar sesión. Por favor, inténtalo de nuevo']);
        response.setHasError(true);
    }

    res.status(response.hasError ? 500 : 200).json(response.getResponse());
};