import conexionbd from "../../../config/db.js";
import apiResponse from "../../../utils/apiResponse.js";
import sql from 'mssql'; // Importar sql para acceder a los tipos de datos


export const insertarEvento = async (req, res) => {
    const {
        nombre,
        descripcion,
        fechaInicio,
        fechaFin,
        ubicacion,
        activo,
        fotoEvento,
        idObjeto
    } = req.body;

    const response = new apiResponse();

    try {
        const idUsuario = req.usuario.idUsuario;
        const nombreUsuario = req.usuario.nombreUsuario;

        const pool = await conexionbd();
        const result = await pool
            .request()
            .input("nombre", sql.NVarChar(100), nombre)
            .input("descripcion", sql.NVarChar(sql.MAX), descripcion)
            .input("fechaInicio", sql.DateTime, fechaInicio)
            .input("fechaFin", sql.DateTime, fechaFin)
            .input("ubicacion", sql.NVarChar(100), ubicacion)
            .input("activo", sql.Bit, activo)
            .input("fotoEvento", sql.NVarChar(255), fotoEvento || null) // URL opcional
            .input("idUsuario", sql.Int, idUsuario)
            .input("nombreUsuario", sql.NVarChar(90), nombreUsuario)
            .input("idObjeto", sql.Int, idObjeto)
            .execute("Eventos.splEventosInsertar");

        if (result.recordset.length > 0 && result.recordset[0].codigoError) {
            response.setHasError(true);
            response.setErrors([result.recordset[0].descripcion]);
            return res.status(400).json(response.getResponse());
        }

        response.setData(result.recordset[0]);
        return res.status(201).json(response.getResponse());

    } catch (error) {
        console.error("Error en insertarEvento:", error);

        response.setHasError(true);
        response.setErrors(["Error al procesar la solicitud"]);
        return res.status(500).json(response.getResponse());
    }
};
