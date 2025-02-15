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
    if (!credencial.idEvento || !credencial.idRegistroParticipante || !credencial.codigoQR) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    setCredenciales([...credenciales, credencial]); // Agregar al array

    setCredencial({  // Reiniciar el formulario
      idEvento: "",
      idRegistroParticipante: "",
      codigoQR: "",
      tipoAcceso: "",
      fechaEmision: "",
      fechaVencimiento: "",
      activo: false,
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Asignación de Credenciales</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col-md-4">
            <label>Nombre Evento</label>
            <input type="number" className="form-control" name="idEvento" value={credencial.idEvento} onChange={handleChange} required />
          </div>

          <div className="col-md-4">
            <label>Identidad Participante</label>
            <input type="number" className="form-control" name="idRegistroParticipante" value={credencial.idRegistroParticipante} onChange={handleChange} required />
          </div>

          <div className="col-md-4">
            <label>Código QR</label>
            <input type="text" className="form-control" name="codigoQR" value={credencial.codigoQR} onChange={handleChange} required />
          </div>

          <div className="col-md-4 mt-3">
            <label>Tipo de Acceso</label>
            <input type="text" className="form-control" name="tipoAcceso" value={credencial.tipoAcceso} onChange={handleChange} required />
          </div>

          <div className="col-md-4 mt-3">
            <label>Fecha de Emisión</label>
            <input type="datetime-local" className="form-control" name="fechaEmision" value={credencial.fechaEmision} onChange={handleChange} required />
          </div>

          <div className="col-md-4 mt-3">
            <label>Fecha de Vencimiento</label>
            <input type="datetime-local" className="form-control" name="fechaVencimiento" value={credencial.fechaVencimiento} onChange={handleChange} required />
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-3 w-100">Asignar</button>
      </form>

      {/* Tabla de Registros */}
      {credenciales.length > 0 && (
        <div>
          <h3 className="text-center">Credenciales Registradas</h3>
          <table className="table table-striped">
            <thead >
              <tr>
                <th>#</th>
                <th>Evento</th>
                <th>Participante</th>
                <th>Código QR</th>
                <th>Tipo de Acceso</th>
                <th>Fecha Emisión</th>
                <th>Fecha Vencimiento</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CredencialForm;
