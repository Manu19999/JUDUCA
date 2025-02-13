import React, { useState } from "react";
import "../styles/credencial.css"; // Ajusta según la estructura de tu proyecto

const CredencialForm = () => {
  const [credencial, setCredencial] = useState({
    idEvento: "",
    idRegistroParticipante: "",
    codigoQR: "",
    tipoAcceso: "",
    fechaEmision: "",
    fechaVencimiento: "",
    activo: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setCredencial((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Credencial asignada:", credencial);
  };

  return (
    <div className="credencial-form-wrapper">
      <div className="credencial-form-container">
        <form onSubmit={handleSubmit} className="credencial-form">
          {/* TÍTULO DEL FORMULARIO */}
          <h2 className="credencial-title">ASIGNACION DE CREDENCIALES</h2>

          <label>NOMBRE EVENTO</label>
          <input type="number" name="idEvento" value={credencial.idEvento} onChange={handleChange} required />

          <label>IDENTIDAD PARTICIPANTE</label>
          <input type="number" name="idRegistroParticipante" value={credencial.idRegistroParticipante} onChange={handleChange} required />

          <label>CODIGO QR</label>
          <input type="text" name="codigoQR" value={credencial.codigoQR} onChange={handleChange} required />

          <label>TIPO DE ACCESO</label>
          <input type="text" name="tipoAcceso" value={credencial.tipoAcceso} onChange={handleChange} required />

          <label>FECHA DE EMISION</label>
          <input type="datetime-local" name="fechaEmision" value={credencial.fechaEmision} onChange={handleChange} required />

          <label>FECHA DE VENCIMIENTO</label>
          <input type="datetime-local" name="fechaVencimiento" value={credencial.fechaVencimiento} onChange={handleChange} required />


          <button type="submit">ASIGNAR</button>
        </form>
      </div>
    </div>
  );
};

export default CredencialForm;
