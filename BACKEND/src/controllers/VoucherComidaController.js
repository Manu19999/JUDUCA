import conexionbd from "../config/db.js";  // Importar conexionbd
import sql from 'mssql';  // Importar sql para usar los tipos de datos

// Obtener todos los vouchers
export const getVouchersComidas = async (req, res) => {
    try {
        const pool = await conexionbd();  // Obtener el pool de conexiones
        const result = await pool.request().query("EXEC GetVouchersComidas");  // Ejecutar el procedimiento almacenado
        res.json(result.recordset);  // Enviar los resultados
    } catch (error) {
        console.error("Error al obtener los vouchers:", error);
        res.status(500).json({ error: "Error al obtener los vouchers", details: error.message });
    }
};

// Obtener un voucher por ID
export const getVoucherComidaById = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await conexionbd();  // Obtener el pool de conexiones
        const result = await pool.request()
            .input('id', sql.Int, id)  // Pasar el parámetro id
            .query("EXEC GetVoucherComidaById @id = @id");  // Ejecutar el procedimiento almacenado

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: "Voucher no encontrado" });
        }

        res.json(result.recordset[0]);  // Enviar el resultado
    } catch (error) {
        console.error("Error al obtener el voucher:", error);
        res.status(500).json({ error: "Error al obtener el voucher", details: error.message });
    }
};

// Insertar un nuevo voucher
// Insertar un nuevo voucher
export const insertVoucherComida = async (req, res) => {
    const {
        idEvento,
        idUniversidad,
        idDisenioCredencial,
        fechaEmision,
        fechaExpiracion,
        cantidadDisponible,
        fechaInicio,
        fechaFinal,
        activo,
    } = req.body;

    try {
        const pool = await conexionbd();  // Obtener el pool de conexiones
        const request = pool.request();

        // Parámetros del procedimiento almacenado
        request.input('idEvento', sql.Int, idEvento);
        request.input('idUniversidad', sql.Int, idUniversidad);
        request.input('idDisenioCredencial', sql.Int, idDisenioCredencial);
        request.input('fechaEmision', sql.Date, fechaEmision);
        request.input('fechaExpiracion', sql.Date, fechaExpiracion);
        request.input('cantidadDisponible', sql.Int, cantidadDisponible);
        request.input('fechaInicio', sql.Date, fechaInicio);
        request.input('fechaFinal', sql.Date, fechaFinal);
        request.input('activo', sql.Bit, activo);

        // Ejecutar el procedimiento almacenado
        const result = await request.execute('sp_InsertVoucherComida');

        // Devolver el ID del voucher insertado
        res.status(201).json({
            message: 'Voucher insertado correctamente',
            idVoucherComida: result.recordset[0].idVoucherComida,
        });
    } catch (error) {
        console.error('Error al insertar el voucher:', error);
        res.status(500).json({ error: 'Error al insertar el voucher', details: error.message });
    }
};




//------------------------------------------------------------------------------------------------------------------------------

// Actualizar un voucher existente
export const updateVoucherComida = async (req, res) => {
    const {
        idVoucher,
        idEvento,
        idUniversidad,
        idDisenioCredencial,
        fechaEmision,
        fechaExpiracion,
        cantidadDisponible,
        fechaInicio,
        fechaFinal,
        activo,
    } = req.body;

    try {
        const pool = await conexionbd();  // Obtener el pool de conexiones
        const request = pool.request();

        // Parámetros del procedimiento almacenado
        request.input('idVoucher', sql.Int, idVoucher);
        request.input('idEvento', sql.Int, idEvento);
        request.input('idUniversidad', sql.Int, idUniversidad);
        request.input('idDisenioCredencial', sql.Int, idDisenioCredencial);
        request.input('fechaEmision', sql.Date, fechaEmision);
        request.input('fechaExpiracion', sql.Date, fechaExpiracion);
        request.input('cantidadDisponible', sql.Int, cantidadDisponible);
        request.input('fechaInicio', sql.Date, fechaInicio);
        request.input('fechaFinal', sql.Date, fechaFinal);
        request.input('activo', sql.Bit, activo);

        // Ejecutar el procedimiento almacenado
        await request.execute('ActualizarVoucher');

        // Respuesta exitosa
        res.status(200).json({ message: 'Voucher actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el voucher:', error);
        res.status(500).json({ error: 'Error al actualizar el voucher', details: error.message });
    }
};