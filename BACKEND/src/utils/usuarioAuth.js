import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const obtenerDatosUsuario = (req) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Error("Token no proporcionado.");
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded; // Retorna el usuario decodificado
    } catch (error) {
        throw new Error("Token inválido o ha expirado.");
    }
};
