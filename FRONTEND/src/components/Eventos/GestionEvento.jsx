import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EventoCaracteristica from "./EventoCaracteristica";
import EventImage from "../../assets/eventoConcierto.jpg";
import EventImage3 from "../../assets/FichaInscripcion.jpg";
import EventImage4 from "../../assets/FichaMedica.jpg";
import EventImage5 from "../../assets/CrearEquipo.jpg";

import "../../styles/Inicio/EventList.css";

const GestionEvento = () => {
  const navigate = useNavigate();

  const upcomingEvents = [
    {
      id: 1,
      title: "JUDUCA",
      image: EventImage,
      description: "Juegos Deportivos Universitarios Centroamericanos.",
    },
    {
      id: 2,
      title: "Ficha de Inscripciones",
      image: EventImage3,
      description: "Inscripciones de los atletas.",
    },
    {
      id: 3,
      title: "Ficha de Salud",
      image: EventImage4,
      description: "Información médica de los participantes.",
    },
    {
      id: 4,
      title: "Evaluación Médica",
      image: EventImage4,
      description: "Registro de evaluación médica previa al evento.",
    },
    {
      id: 5,
      title: "Historial Médico",
      image: EventImage4,
      description: "Consulta del historial médico de los atletas.",
    },
    {
      id: 6,
      title: "Crear Equipo",
      image: EventImage5,
      description: "Creación de equipos para las disciplinas y actividades.",
    },
  ];

  const handleImageClick = (id) => {
    const routes = {
      1: "/mantenimiento-evento",
      3: "/ficha-participantes",
      4: "/ficha-salud",
    };
    if (routes[id]) navigate(routes[id]);
  };

  const handleEditClick = (id) => {
    console.log(`Editar evento con id ${id}`);
  };

  const handleManageClick = (id) => {
    console.log(`Gestionar evento con id ${id}`);
  };

  return (
    <section id="events" className="eventlist">
      <Container>
        <h2 className="eventlisttitle">Evento</h2>
        {upcomingEvents.length > 0 ? (
          <div className="eventgrid">
            {upcomingEvents.map((event) => (
              <EventoCaracteristica
                key={event.id}
                event={event}
                onImageClick={() => handleImageClick(event.id)}
                onEditClick={() => handleEditClick(event.id)}
                onManageClick={() => handleManageClick(event.id)}
                showIcons={event.id === 1} // Solo muestra los íconos en el evento 1
              />
            ))}
          </div>
        ) : (
          <p className="no-events">No hay eventos disponibles</p>
        )}
      </Container>
    </section>
  );
};

export default GestionEvento;
