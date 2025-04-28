import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail', // ¡ESTO es lo importante!
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

const enviarCorreo = async ({ from, to, subject, text, html }) => {
  return transporter.sendMail({ from, to, subject, text, html });
};

export default enviarCorreo;
