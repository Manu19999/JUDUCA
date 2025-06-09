import conexionbd from "../../../config/db.js";  // Importar conexionbd
import sql from 'mssql';  // Importar sql para usar los tipos de datos

// Obtener todos los vouchers o un voucher específico por ID
export const getVouchersComidas = async (req, res) => {
    try {
        const { id } = req.params;  // Obtener el ID del voucher si está presente
        const pool = await conexionbd();  // Obtener el pool de conexiones
        const request = pool.request();

        if (id) {
            // Si se proporciona un ID, obtener un voucher específico
            request.input('idVoucherComida', sql.Int, id);
        } else {
            // Si no se proporciona un ID, obtener todos los vouchers
            request.input('idVoucherComida', sql.Int, null);
        }

        const result = await request.execute('Comedores.splVouchersComidasObtener');

        if (result.recordset.length === 0 && id) {
            return res.status(404).json({ error: "Voucher no encontrado" });
        }

        res.json(result.recordset);  // Enviar los resultados
    } catch (error) {
        console.error("Error al obtener los vouchers:", error);
        res.status(500).json({ error: "Error al obtener los vouchers", details: error.message });
    }
};

export const insertVoucherComida = async (req, res) => {
  if (!req.usuario) {
    return res.status(401).json({ error: 'Usuario no autenticado' });
  }
  const { idUsuario, nombreUsuario, idObjeto } = req.usuario;

  const {
    idEvento, idUniversidad, idDisenioCredencial,
    fechaEmision, fechaExpiracion,
    cantidadDisponible, fechaInicio, fechaFinal,
    activo
  } = req.body;

  // Validaciones y parseos...
  const idEv  = parseInt(idEvento, 10);
  const idUni = parseInt(idUniversidad, 10);
  const idDis = parseInt(idDisenioCredencial, 10);
  const qty   = parseInt(cantidadDisponible, 10);
  if ([idEv, idUni, idDis, qty].some(v => isNaN(v))) {
    return res.status(400).json({
      error: 'Los campos numéricos deben ser válidos'
    });
  }

  try {
    const pool = await conexionbd();
    const request = pool.request();
    request
      .input('idEvento', sql.Int, idEv)
      .input('idUniversidad', sql.Int, idUni)
      .input('idDisenioCredencial', sql.Int, idDis)
      .input('fechaEmision', sql.Date, fechaEmision)
      .input('fechaExpiracion', sql.Date, fechaExpiracion)
      .input('cantidadDisponible', sql.Int, qty)
      .input('fechaInicio', sql.Date, fechaInicio)
      .input('fechaFinal', sql.Date, fechaFinal)
      .input('activo', sql.Bit, Boolean(activo))
      .input('idUsuario', sql.Int, idUsuario)
      .input('nombreUsuario', sql.NVarChar(90), nombreUsuario)
      .input('idObjeto', sql.Int, idObjeto);

    const result = await request.execute('Comedores.splVouchersComidasInsertar');
    const record = result.recordset?.[0] || {};

    if (record.codigoError) {
      return res.status(400).json({ error: record.descripcion });
    }
    if (!record.idVoucherComida) {
      return res.status(500).json({ error: 'SP no devolvió idVoucherComida' });
    }

    res.status(201).json({ message: 'Voucher insertado', idVoucherComida: record.idVoucherComida });
  } catch (err) {
    console.error('Error al insertar voucher:', err);
    res.status(500).json({ error: 'Error interno', details: err.message });
  }
};





//------------------------------------------------------------------------------------------------------------------------------

// Actualizar un voucher existente
export const updateVoucherComida = async (req, res) => {
  if (!req.usuario) {
    return res.status(401).json({ error: 'Usuario no autenticado' });
  }
  const { idUsuario, nombreUsuario, idObjeto } = req.usuario;

  const {
    idVoucherComida,   // ID del voucher a actualizar (muy importante)
    idEvento,
    idUniversidad,
    idDisenioCredencial,
    fechaEmision,
    fechaExpiracion,
    cantidadDisponible,
    fechaInicio,
    fechaFinal,
    activo
  } = req.body;

  // Validaciones y parseos
  const idVoucher = parseInt(idVoucherComida, 10);
  const idEv      = parseInt(idEvento, 10);
  const idUni     = parseInt(idUniversidad, 10);
  const idDis     = parseInt(idDisenioCredencial, 10);
  const qty       = parseInt(cantidadDisponible, 10);
  if ([idVoucher, idEv, idUni, idDis, qty].some(v => isNaN(v))) {
    return res.status(400).json({
      error: 'Los campos numéricos deben ser válidos'
    });
  }

  try {
    const pool = await conexionbd();
    const request = pool.request();
    request
      .input('idVoucherComida', sql.Int, idVoucher)
      .input('idEvento', sql.Int, idEv)
      .input('idUniversidad', sql.Int, idUni)
      .input('idDisenioCredencial', sql.Int, idDis)
      .input('fechaEmision', sql.Date, fechaEmision)
      .input('fechaExpiracion', sql.Date, fechaExpiracion)
      .input('cantidadDisponible', sql.Int, qty)
      .input('fechaInicio', sql.Date, fechaInicio)
      .input('fechaFinal', sql.Date, fechaFinal)
      .input('activo', sql.Bit, Boolean(activo))
      .input('idUsuario', sql.Int, idUsuario)
      .input('nombreUsuario', sql.NVarChar(90), nombreUsuario)
      .input('idObjeto', sql.Int, idObjeto);

    const result = await request.execute('Comedores.splVouchersComidasActualizar');
    const record = result.recordset?.[0] || {};

    if (record.codigoError) {
      return res.status(400).json({ error: record.descripcion });
    }
    if (!record.idVoucherComida) {
      return res.status(500).json({ error: 'SP no devolvió idVoucherComida' });
    }

    res.status(200).json({ message: 'Voucher actualizado', voucher: record });
  } catch (err) {
    console.error('Error al actualizar voucher:', err);
    res.status(500).json({ error: 'Error interno', details: err.message });
  }
};
