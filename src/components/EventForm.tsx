import React, { useState } from "react";
import "./EventForm.css"; // Importa los estilos

const EventForm: React.FC = () => {
  const [event, setEvent] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    isActive: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    setEvent((prev) => ({
      ...prev,
      [name]: type === "checkbox" && e.target instanceof HTMLInputElement ? e.target.checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Evento creado:", event);
  };

  return (
    <div className="event-form-container">
      <form onSubmit={handleSubmit} className="event-form">
        {/* TÍTULO DEL FORMULARIO */}
        <h2 className="event-title">Nuevo Evento</h2>

        <label>Nombre del Evento</label>
        <input type="text" name="name" value={event.name} onChange={handleChange} required />

        <label>Ubicación</label>
        <input type="text" name="location" value={event.location} onChange={handleChange} required />

        <label>Fecha de Inicio</label>
        <input type="date" name="startDate" value={event.startDate} onChange={handleChange} required />

        <label>Fecha de Fin</label>
        <input type="date" name="endDate" value={event.endDate} onChange={handleChange} required />

        <label>Descripción</label>
        <textarea name="description" value={event.description} onChange={handleChange} required />

        <div className="checkbox-container">
          <input type="checkbox" name="isActive" checked={event.isActive} onChange={handleChange} />
          <label>Activo</label>
        </div>

        <button type="submit">Crear Evento</button>
      </form>
    </div>
  );
};

export default EventForm;
