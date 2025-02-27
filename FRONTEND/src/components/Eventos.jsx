import React, { useEffect, useState } from "react";
import "../styles/Eventos.css";
import { Link } from "react-router-dom";
import Nav from '../components/Dashboard/navDashboard';
const Eventos = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [event, setEvent] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    isActive: false,
  });

  useEffect(() => {
    setEvents([
      {
        id: 1,
        name: "Evento A",
        description: "Concierto en el parque",
        startDate: "2024-08-10",
        endDate: "2024-08-11",
        location: "Parque Central",
        isActive: true,
      },
      {
        id: 2,
        name: "Evento B",
        description: "Feria gastronómica",
        startDate: "2024-08-15",
        endDate: "2024-08-16",
        location: "Plaza Mayor",
        isActive: true,
      },
      {
        id: 3,
        name: "Evento C",
        description: "Torneo de fútbol",
        startDate: "2024-08-20",
        endDate: "2024-08-21",
        location: "Estadio Nacional",
        isActive: false,
      },
    ]);
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setEvent((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? e.target.checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Evento creado:", event);
    setIsModalOpen(false);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="crud">
    <Nav />
   
    
    {/* Botón para añadir un nuevo voucher */}
    <div className="crud">
    <Nav />
    <div className="event-container">
      <header className="event-header">
        <h2>Listado de Eventos</h2>
        <div className="event-actions">
          <button className="new-btn" onClick={() => setIsModalOpen(true)}>
            Nuevo
          </button>
          <button className="report-btn">Generar Reporte</button>
        </div>
      </header>
      <div className="event-controls">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Buscar eventos..."
        />
      </div>
      <div className="event-table">
        <table>
          <thead>
            <tr>
              <th>N°</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Ubicación</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event, index) => (
              <tr key={event.id}>
                <td>{index + 1}</td>
                <td>{event.name}</td>
                <td>{event.description}</td>
                <td>{event.startDate}</td>
                <td>{event.endDate}</td>
                <td>{event.location}</td>
                <td>{event.isActive ? "Sí" : "No"}</td>
                <td>
                  <button className="edit-btn">Editar</button>
                  <button className="delete-btn">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
              X
            </button>
            <form onSubmit={handleSubmit} className="event-form">
              <h2 className="event-title">Nuevo Evento</h2>
              <label>Nombre del Evento</label>
              <input
                type="text"
                name="name"
                value={event.name}
                onChange={handleChange}
                required
              />
              <label>Ubicación</label>
              <input
                type="text"
                name="location"
                value={event.location}
                onChange={handleChange}
                required
              />
              <label>Fecha de Inicio</label>
              <input
                type="date"
                name="startDate"
                value={event.startDate}
                onChange={handleChange}
                required
              />
              <label>Fecha de Fin</label>
              <input
                type="date"
                name="endDate"
                value={event.endDate}
                onChange={handleChange}
                required
              />
              <label>Descripción</label>
              <textarea
                name="description"
                value={event.description}
                onChange={handleChange}
                required
              />
              <button type="submit">Crear</button>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
    </div>
  );
};

export default Eventos;