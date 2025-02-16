import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Ticket = () => {
  const tickets = [
    { id: 1, id_evento: 201, id_juego_actividad: 301, cantidad: 2, activo: 1, fecha_hora_inicio: "2025-02-14 10:00:00", fecha_hora_fin: "2025-02-14 12:00:00" },
    { id: 2, id_evento: 202, id_juego_actividad: 302, cantidad: 4, activo: 0, fecha_hora_inicio: "2025-02-14 14:00:00", fecha_hora_fin: "2025-02-14 16:00:00" },
    { id: 3, id_evento: 203, id_juego_actividad: 303, cantidad: 1, activo: 1, fecha_hora_inicio: "2025-02-14 18:00:00", fecha_hora_fin: "2025-02-14 20:00:00" },
  ];

  return (
    <div className="container mt-4">
      <header className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-primary">Lista de Tickets</h2>
        <div>
          <button className="btn btn-primary me-2">Nuevo</button>
          <button className="btn btn-secondary">Generar Reporte</button>
        </div>
      </header>
      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>ID Evento</th>
              <th>ID Juego/Actividad</th>
              <th>Cantidad</th>
              <th>Activo</th>
              <th>Fecha/Hora Inicio</th>
              <th>Fecha/Hora Fin</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.id_evento}</td>
                <td>{ticket.id_juego_actividad}</td>
                <td>{ticket.cantidad}</td>
                <td>{ticket.activo ? "Sí" : "No"}</td>
                <td>{ticket.fecha_hora_inicio}</td>
                <td>{ticket.fecha_hora_fin}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2">Editar</button>
                  <button className="btn btn-danger btn-sm">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ticket;
