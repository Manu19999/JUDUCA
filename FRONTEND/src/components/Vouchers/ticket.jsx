import React from "react";
import Tabla from "../Crud/Tabla"; // Asumimos que tienes este componente
import Nav from "../Dashboard/navDashboard";
import { FaEdit, FaTrashAlt } from "react-icons/fa";  // Importamos los iconos

const Ticket = () => {
  const tickets = [
    { id: 1, id_evento: "JUDUCA", id_juego_actividad: "FUTBOLL", cantidad: 2, activo: 1, fecha_hora_inicio: "2025-02-14 10:00:00", fecha_hora_fin: "2025-02-14 12:00:00" },
    { id: 2, id_evento: "JUDUCA", id_juego_actividad: "BALONCESTO", cantidad: 4, activo: 0, fecha_hora_inicio: "2025-02-14 14:00:00", fecha_hora_fin: "2025-02-14 16:00:00" },
    { id: 3, id_evento: "JUDUCA", id_juego_actividad: "KARATE", cantidad: 1, activo: 1, fecha_hora_inicio: "2025-02-14 18:00:00", fecha_hora_fin: "2025-02-14 20:00:00" },
  ];

  const columnas = [
    { nombre: "N", campo: "id", ancho: "5%" },
    { nombre: "Evento", campo: "id_evento", ancho: "15%" },
    { nombre: "Juego/Actividad", campo: "id_juego_actividad", ancho: "15%" },
    { nombre: "Cantidad", campo: "cantidad", ancho: "10%" },
    { nombre: "Activo", campo: "activo", ancho: "10%" },
    { nombre: "Fecha/Hora Inicio", campo: "fecha_hora_inicio", ancho: "15%" },
    { nombre: "Fecha/Hora Fin", campo: "fecha_hora_fin", ancho: "15%" },
    { nombre: "Acción", campo: "accion", ancho: "15%" },
  ];

  const handleEdit = (id) => {
    console.log("Editar ticket con id:", id);
    // Aquí puedes agregar la lógica de edición
  };

  const handleDelete = (id) => {
    console.log("Eliminar ticket con id:", id);
    // Aquí puedes agregar la lógica de eliminación
  };

  const customActions = (id) => (
    <div>
      <button 
        onClick={() => handleEdit(id)} 
        className="btn btn-outline-warning mx-1"
      >
        <FaEdit />
      </button>
      <button 
        onClick={() => handleDelete(id)} 
        className="btn btn-outline-danger mx-1"
      >
        <FaTrashAlt />
      </button>
    </div>
  );

  const ticketsConAccion = tickets.map((ticket) => ({
    ...ticket,
    accion: customActions(ticket.id),
  }));

  return (
    <div className="App">
      <Nav />
      <h2>Gestión de Tickets</h2>
      <Tabla columnas={columnas} datos={ticketsConAccion} />
    </div>
  );
};

export default Ticket;
