import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../Crud/Tabla.css';

const CredencialForm = () => {
  const [credenciales, setCredenciales] = useState([]);
  const [credencial, setCredencial] = useState({
    idEvento: "",
    idRegistroParticipante: "",
    codigoQR: "",
    tipoAcceso: "",
    fechaEmision: "",
    fechaVencimiento: "",
    activo: false,
  });

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCredencial((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Guardar una credencial y mostrarla en la tabla
  const handleSubmit = (e) => {
    e.preventDefault();

    // Evitar inserción si los campos están vacíos
    if (
      !credencial.idEvento ||
      !credencial.idRegistroParticipante ||
      !credencial.codigoQR
    ) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    setCredenciales([...credenciales, credencial]); // Agregar al array

    setCredencial({
      // Reiniciar el formulario
      idEvento: "",
      idRegistroParticipante: "",
      codigoQR: "",
      tipoAcceso: "",
      fechaEmision: "",
      fechaVencimiento: "",
    });
  };

  return (
    <div className="container-fluid ">
      <div className="row">
        <div className="col-md-4">
          <h3 className="text-center my-3">Asignación de Credenciales</h3>

          <div className="mb-3">
            <div className="mb-3">
              <label className="form-label">EVENTO</label>
              <select
                className="form-select-credencial"
                name="idEvento"
                value={credencial.idEvento}
                onChange={handleChange}
              >
                <option value="JUDUCA">JUDUCA</option>
                <option value="SUCA">SUCA</option>
                <option value="CUSUCA">CUSUCA</option>
                <option value="OTRO">OTRO</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <div className="mb-3">
              <label className="form-label">PARTICIPANTE</label>
              <select
                className="form-select-credencial"
                name="idRegistroParticipante"
                value={credencial.idRegistroParticipante}
                onChange={handleChange}
              >
                <option value="MANUEL RODRIGUEZ">MANUEL RODRIGUEZ</option>
                <option value="SANTIAGO RODRIGUEZ">SANTIAGO RODRIGUEZ</option>
                <option value="MARIA RODRIGUEZ">MARIA RODRIGUEZ</option>
                <option value="DIEGO RODRIGUEZ">DIEGO RODRIGUEZ</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label>CODIGO QR</label>
            <input
              type="text"
              className="form-control-credencial"
              name="codigoQR"
              value={credencial.codigoQR}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>TIPO DE ACCESO</label>
            <input
              type="text"
              className="form-control-credencial"
              name="tipoAcceso"
              value={credencial.tipoAcceso}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>FECHA DE EMISION</label>
            <input
              type="datetime-local"
              className="form-control-credencial"
              name="fechaEmision"
              value={credencial.fechaEmision}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>FECHA DE VENCIMIENTO</label>
            <input
              type="datetime-local"
              className="form-control-credencial"
              name="fechaVencimiento"
              value={credencial.fechaVencimiento}
              onChange={handleChange}
              required
            />
          </div>

          <div className="botones-container">
            <button className="btnAgg" onClick={handleSubmit}>
              Guardar
            </button>
          </div>
        </div>
        <div className="col-md-8 d-flex flex-column align-items-center">
  <div className="table-responsive" style={{ maxHeight: "350px", width: "100%" }}>
    {/* Tabla de Registros */}
    {credenciales.length === 0 ? (
      <p className="text-center">No hay Credenciales asignadas.</p>
    ) : (
      <table className="table-credencial table-striped table-hover table-bordered text-center" style={{ fontSize: "13px", tableLayout: "fixed", width: "100%" }}>
        <thead >
          <tr>
            <th style={{ width: "5%" }}>#</th>
            <th style={{ width: "10%", whiteSpace: "nowrap" }}>EVENTO</th>
            <th style={{ width: "15%", whiteSpace: "nowrap" }}>PARTICIPANTE</th>
            <th style={{ width: "15%", whiteSpace: "nowrap" }}>CÓDIGO QR</th>
            <th style={{ width: "15%", whiteSpace: "nowrap" }}>TIPO DE ACCESO</th>
            <th style={{ width: "15%", whiteSpace: "nowrap" }}>FECHA EMISIÓN</th>
            <th style={{ width: "20%", whiteSpace: "nowrap" }}>FECHA VENCIMIENTO</th>
            <th style={{ width: "20%", whiteSpace: "nowrap" }}>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {credenciales.map((cred, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{cred.idEvento}</td>
              <td>{cred.idRegistroParticipante}</td>
              <td className="text-truncate" style={{ maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {cred.codigoQR}
              </td>
              <td>{cred.tipoAcceso}</td>
              <td>{cred.fechaEmision ? new Date(cred.fechaEmision).toLocaleString() : "Sin fecha"}</td>
              <td>{cred.fechaVencimiento ? new Date(cred.fechaVencimiento).toLocaleString() : "Sin fecha"}</td>
              <td>
                <button className="btn btn-warning btn-sm me-1">Editar</button>
                <button className="btn btn-danger btn-sm">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
</div>

     
    </div>
    </div>

  );
};

export default CredencialForm;
