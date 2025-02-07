import React, { useState } from "react";
import "./credencialForm.css"; // Importa los estilos


const CredencialForm: React.FC = () => {
  const [credencial, setCredencial] = useState({
    idEvento: "",
    idRegistroParticipante: "",
    codigoQR: "",
    tipoAcceso: "",
    fechaEmision: "",
    fechaVencimiento: "",
    activo: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    setCredencial((prev) => ({
      ...prev,
      [name]: type === "checkbox" && e.target instanceof HTMLInputElement ? e.target.checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Credencial asignada:", credencial);
  };

  return (
    <div className="credencial-form-wrapper">
    <div className="credencial-form-container">
      <form onSubmit={handleSubmit} className="credencial-form">
        {/* TÍTULO DEL FORMULARIO */}
        <h2 className="credencial-title">Asignar Credencial</h2>

        <label>ID del Evento</label>
        <input type="number" name="idEvento" value={credencial.idEvento} onChange={handleChange} required />

        <label>ID Registro Participante</label>
        <input type="number" name="idRegistroParticipante" value={credencial.idRegistroParticipante} onChange={handleChange} required />

        <label>Código QR</label>
        <input type="text" name="codigoQR" value={credencial.codigoQR} onChange={handleChange} required />

        <label>Tipo de Acceso</label>
        <input type="text" name="tipoAcceso" value={credencial.tipoAcceso} onChange={handleChange} required />

        <label>Fecha de Emisión</label>
        <input type="datetime-local" name="fechaEmision" value={credencial.fechaEmision} onChange={handleChange} required />

        <label>Fecha de Vencimiento</label>
        <input type="datetime-local" name="fechaVencimiento" value={credencial.fechaVencimiento} onChange={handleChange} required />

        <div className="checkbox-container">
          <input type="checkbox" name="activo" checked={credencial.activo} onChange={handleChange} />
          <label>Activo</label>
        </div>

        <button type="submit">Asignar Credencial</button>
      </form>
    </div>
  </div>
  );
};

export default CredencialForm;
