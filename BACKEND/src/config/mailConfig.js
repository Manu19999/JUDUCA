import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Verifica la conexión (opcional pero útil en desarrollo)
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Error al conectar con Gmail:', error);
  } else {
    console.log('✅ Conexión SMTP con Gmail exitosa');
  }
});

const enviarCorreo = async ({ from, to, subject, text, html }) => {
  const correo = await transporter.sendMail({
    from: from || `"Mi App" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  });
  console.log('📤 Correo enviado a:', to);
  return correo;
};

export default enviarCorreo;
