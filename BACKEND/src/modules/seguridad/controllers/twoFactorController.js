import crypto from 'crypto';
import enviarCorreo from '../../../utils/mailer.js';
import jwt from 'jsonwebtoken';
// Temporal, utiliza BD real en producción
const codigosTemporales = {};

export const enviarCodigo = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ mensaje: 'Debes proporcionar un correo electrónico.' });
  }

  const codigo = crypto.randomInt(100000, 999999).toString();
  codigosTemporales[email] = {
    codigo,
    expira: Date.now() + 5 * 60 * 1000, // Expira en 5 minutos
  };

  try {
    await enviarCorreo({
      from: '"Mi App Seguridad" <no-reply@app.com>',
      to: email,
      subject: 'Tu código de autenticación',
      text: `Tu código de autenticación es: ${codigo}`,
      html: `<b>Tu código de autenticación es: ${codigo}</b>`
    });

    res.status(200).json({ mensaje: 'Código enviado correctamente.' });
  } catch (error) {
    console.error('Error al enviar correo:', error);
    res.status(500).json({ mensaje: 'Error al enviar el código.', error: error.message });
  }
};

export const verificarCodigo = (req, res) => {
  const { email, codigo } = req.body;

  if (!email || !codigo) {
      return res.status(400).json({ mensaje: 'Debes proporcionar correo electrónico y código.' });
  }

  const registro = codigosTemporales[email];

  if (registro && registro.codigo === codigo && Date.now() < registro.expira) {
      delete codigosTemporales[email];
      
      // Configurar cookie de autenticación completa
      res.cookie('authComplete', 'true', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 3600000 // 1 hora
      });
      
      return res.json({ valido: true, mensaje: 'Código correcto.' });
  }

  return res.status(400).json({ valido: false, mensaje: 'Código inválido o expirado.' });
};

// En twoFactorController.js
export const verificarCodigoReset = async (req, res) => {
  const { email, codigo } = req.body;

  const registro = codigosTemporales[email];
  
  if (registro && registro.codigo === codigo && Date.now() < registro.expira && registro.isPasswordReset) {
    delete codigosTemporales[email];
    
    // Generar token temporal para reset de contraseña (válido por 15 mins)
    const token = jwt.sign(
      { email, purpose: 'password_reset' },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    return res.json({ 
      valido: true, 
      mensaje: 'Código correcto.',
      resetToken: token
    });
  }

  return res.status(400).json({ 
    valido: false, 
    mensaje: 'Código inválido o expirado.' 
  });
};

export const enviarCodigoReset = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ mensaje: 'Debes proporcionar un correo electrónico.' });
  }

  const codigo = crypto.randomInt(100000, 999999).toString();
  codigosTemporales[email] = {
    codigo,
    expira: Date.now() + 5 * 60 * 1000, // 5 minutos
    isPasswordReset: true
  };

  try {
    await enviarCorreo({
      from: '"Recuperación de Contraseña" <no-reply@app.com>',
      to: email,
      subject: 'Código para recuperar tu contraseña',
      html: `<b>Tu código de recuperación es: ${codigo}</b>`
    });

    res.status(200).json({ mensaje: 'Código de recuperación enviado correctamente.' });
  } catch (error) {
    console.error('Error al enviar correo:', error);
    res.status(500).json({ mensaje: 'Error al enviar el código.', error: error.message });
  }
};