import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Credencial/credencial.css";

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
                className="form-select"
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
                className="form-select"
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
            <label>Código QR</label>
            <input
              type="text"
              className="form-control"
              name="codigoQR"
              value={credencial.codigoQR}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Tipo de Acceso</label>
            <input
              type="text"
              className="form-control"
              name="tipoAcceso"
              value={credencial.tipoAcceso}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Fecha de Emisión</label>
            <input
              type="datetime-local"
              className="form-control"
              name="fechaEmision"
              value={credencial.fechaEmision}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Fecha de Vencimiento</label>
            <input
              type="datetime-local"
              className="form-control"
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
        <div style={{ overflowX: "auto", maxHeight: "350px" }}>
          {/* Tabla de Registros */}
          {credenciales.length === 0 ? (
                  <p className="text-center">No hay Credenciales asignadas.</p>
                ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Evento</th>
                  <th>Participante</th>
                  <th>Código QR</th>
                  <th>Tipo de Acceso</th>
                  <th>Fecha Emisión</th>
                  <th>Fecha Vencimiento</th>
                  <th>Acciones</th>

                </tr>
              </thead>
              <tbody>
                {credenciales.map((cred, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{cred.idEvento}</td>
                    <td>{cred.idRegistroParticipante}</td>
                    <td>{cred.codigoQR}</td>
                    <td>{cred.tipoAcceso}</td>
                    <td>{cred.fechaEmision}</td>
                    <td>{cred.fechaVencimiento}</td>
                    <td><button className="btn btn-warning" >Editar</button><button className="btn btn-danger" >Eliminar</button></td>

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
