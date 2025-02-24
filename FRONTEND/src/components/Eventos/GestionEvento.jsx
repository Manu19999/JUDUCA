import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EventoCaracteristica from "./EventoCaracteristica";
import EventImage from "../../assets/eventoConcierto.jpg";
import EventImage2 from "../../assets/eventoCine.jpg";
import "../../styles/Inicio/EventList.css";

const GestionEvento = () => {
  const navigate = useNavigate();

  const upcomingEvents = [
    {
      id: 1,
      title: "JUDUCA",
      date: "15 de Julio, 2025",
      image: EventImage,
      description: "Juegos Deportivos Universitarios Centroamericanos.",
    },
    {
      id: 2,
      title: "Crear ficha",
      date: "20 de Noviembre, 2023",
      image: EventImage2,
      description: "Creación de fichas dinámicas para los eventos.",
    },
    {
      id: 3,
      title: "Inscripciones",
      date: "1 de Mayo, 2025",
      image: EventImage2,
      description: "Inscripciones de los atletas.",
    },
    

  ];

  const handleImageClick = (id) => {
    if (id === 1) {
      navigate("/gestion-evento");
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
            upcomingEvents.length === 3 ? "two-events" : ""
          }`}
        >
          {upcomingEvents.map((event) => (
            <EventoCaracteristica
              key={event.id}
              event={event}
              onImageClick={() => handleImageClick(event.id)}
              onEditClick={() => handleEditClick(event.id)}
              onManageClick={() => handleManageClick(event.id)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default GestionEvento;
