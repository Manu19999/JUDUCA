import conexionbd from "../../../config/db.js";
import apiResponse from "../../../utils/apiResponse.js";
import sql from 'mssql'; // Importar sql para acceder a los tipos de datos


// Controlador para obtener las fichas (uno específico o todos)
export const ObtenerFichas = async (req, res) => {
  const { idEvento } = req.params; // Aquí usa idEvento
  const response = new apiResponse();

  try {
    const pool = await conexionbd();

    const result = await pool
      .request()
      .input("idEvento", idEvento ? parseInt(idEvento) : null)
      .execute("Registros.splFichasPorEventoObtener");

    if (result.recordset.length > 0 && result.recordset[0].codigoError) {
      response.setHasError(true);
      response.setErrors([result.recordset[0].descripcion]);
      return res.status(400).json(response.getResponse());
    }

    response.setData(result.recordset);
    res.status(200).json(response.getResponse());
  } catch (error) {
    console.error("Error en ObtenerFichas:", error.message);
    response.setHasError(true);
    response.setErrors(["Error interno del servidor", error.message]);
    res.status(500).json(response.getResponse());
  }

};


export const insertarFichaRegistroCaracteristicas = async (req, res) => {
  const response = new apiResponse();

  try {
    const { Caracteristicas, idObjeto } = req.body;

    // Usuario autenticado desde el middleware
    const idUsuario = req.usuario.idUsuario;
    const nombreUsuario = req.usuario.nombreUsuario;

    if (!Caracteristicas || !Array.isArray(Caracteristicas) || Caracteristicas.length === 0) {
      response.setHasError(true);
      response.setErrors(["Debe proporcionar al menos una característica."]);
      return res.status(400).json(response.getResponse());
    }

    const pool = await conexionbd();

    // Crear el parámetro tipo tabla
    const caracteristicasTable = new sql.Table("Registros.tvpFichaRegistroCaracteristicas");
    caracteristicasTable.columns.add("idFichaRegistro", sql.Int);
    caracteristicasTable.columns.add("idCatalogoCaracteristicas", sql.Int);
    caracteristicasTable.columns.add("idSeccion", sql.Int);
    caracteristicasTable.columns.add("idTipoCampo", sql.Int);
    caracteristicasTable.columns.add("nombreDelCampo", sql.NVarChar(70));
    caracteristicasTable.columns.add("valorPorDefecto", sql.Text);
    caracteristicasTable.columns.add("valorRequerido", sql.Bit);
    caracteristicasTable.columns.add("valorPrincipal", sql.Bit);
    caracteristicasTable.columns.add("usuarioRegistro", sql.NVarChar(90));

    Caracteristicas.forEach(c => {
      caracteristicasTable.rows.add(
        c.idFichaRegistro,
        c.idCatalogoCaracteristicas,
        c.idSeccion,
        c.idTipoCampo,
        c.nombreDelCampo,
        c.valorPorDefecto || null,
        c.valorRequerido,
        c.valorPrincipal,
        nombreUsuario // o c.usuarioRegistro si lo mandas desde el frontend
      );
    });

    const result = await pool
      .request()
      .input("Caracteristicas", caracteristicasTable)
      .input("idUsuario", sql.Int, idUsuario)
      .input("nombreUsuario", sql.NVarChar, nombreUsuario)
      .input("idObjeto", sql.Int, idObjeto)
      .execute("Registros.splFichaRegistroCaracteristicasInsertar");

    if (result.recordset?.[0]?.codigoError !== 0) {
      response.setHasError(true);
      response.setErrors([result.recordset[0].descripcion]);
      return res.status(400).json(response.getResponse());
    }

    response.setData(result.recordset);
    return res.status(201).json(response.getResponse());

  } catch (error) {
    console.error("Error al insertar características:", error);
    response.setHasError(true);
    response.setErrors([error.message]);
    res.status(500).json(response.getResponse());
  }
};


export const obtenerCatalogosFichaRegistro = async (req, res) => {
  const response = new apiResponse();

  try {
    const pool = await conexionbd();

    const result = await pool.request().execute("Registros.splCatalogosFichaRegistroObtener");

    // Procesar múltiples recordsets
    const secciones = result.recordsets[0];
    const tiposCampo = result.recordsets[1];
    const catalogoCaracteristicas = result.recordsets[2];

    // Puedes empaquetarlo en un solo objeto si lo necesitas en el frontend
    response.setData({
      secciones,
      tiposCampo,
      catalogoCaracteristicas
    });

    res.status(200).json(response.getResponse());

  } catch (error) {
    console.error("Error al obtener catálogos:", error);
    response.setHasError(true);
    response.setErrors([error.message]);
    res.status(500).json(response.getResponse());
  }
};
