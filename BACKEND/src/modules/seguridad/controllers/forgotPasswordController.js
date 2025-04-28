// controllers/forgotPasswordController.js
import jwt from 'jsonwebtoken';
import enviarCorreo from '../utils/mailer.js';
import conexionbd from '../db/conexion.js'; // Asegúrate de tener tu conexión a SQL Server
import dotenv from 'dotenv';

dotenv.config();

export const solicitarRecuperacion = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ mensaje: 'El correo es requerido.' });
  }

  try {
    const pool = await conexionbd();
    const result = await pool
      .request()
      .input('email', email)
      .query('SELECT id_usuario FROM Usuarios WHERE email = @email');

    if (result.recordset.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontró un usuario con ese correo.' });
    }

    const usuarioId = result.recordset[0].id_usuario;

    // Crear un token temporal válido por 15 minutos
    const token = jwt.sign({ id: usuarioId }, process.env.JWT_SECRET, { expiresIn: '15m' });

    const link = `http://localhost:5173/reset-password?token=${token}`;

    await enviarCorreo({
      to: email,
      subject: 'Recuperación de contraseña',
      text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${link}`,
      html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p><p><a href="${link}">${link}</a></p>`
    });

    res.json({ mensaje: 'Se ha enviado un enlace de recuperación al correo electrónico.' });
  } catch (error) {
    console.error('Error en recuperación:', error);
    res.status(500).json({ mensaje: 'Error al procesar la solicitud.' });
  }
};
