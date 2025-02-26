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
      id: 3,
      title: "Ficha de Inscripciones",
      image: EventImage3,
      description: "Inscripciones de los atletas.",
    },
    {
      id: 4,
      title: "Ficha de Salud",
      image: EventImage4,
      description: "Inscripciones de los atletas.",
    },
    {
      id: 4,
      title: "Ficha de Salud",
      image: EventImage4,
      description: "Inscripciones de los atletas.",
    },
  
    {
      id: 5,
      title: "Crear Equipo",
      image: EventImage5,
      description: "Creación de los equipos a las disciplinas y actividades.",
    },
  ];

  const handleImageClick = (id) => {
    if (id === 1) {
      navigate("/mantenimiento-evento");
    }
    if (id === 3) {
      navigate("/ficha-participantes");
    }
    if (id === 4) {
      navigate("/ficha-salud");
    }
  };

  const handleEditClick = (id) => {
    // Lógica para la acción de editar
    console.log(`Editar evento con id ${id}`);
  };

  const handleManageClick = (id) => {
    // Lógica para la acción de gestionar
    console.log(`Gestionar evento con id ${id}`);
  };

  return (
    <section id="events" className="eventlist">
      <Container>
        <h2 className="eventlisttitle">Evento</h2>
        <div
          className={`eventgrid ${
            upcomingEvents.length === 4 ? "two-events" : ""
          }`}
        >
          {upcomingEvents.map((event) => (
            <EventoCaracteristica
              key={event.id}
              event={event}
              onImageClick={() => handleImageClick(event.id)}
              onEditClick={() => handleEditClick(event.id)}
              onManageClick={() => handleManageClick(event.id)}
              showIcons={event.id === 1} // Mostrar íconos de edición y gestión solo para el evento con id 1
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default GestionEvento;
