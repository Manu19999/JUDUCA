import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EventoCaracteristica from "./EventoCaracteristica";
import EventImage from "../../assets/Reglas.jpg";
import EventImage2 from "../../assets/CrearFicha.jpg";
import EventImage3 from "../../assets/universidades.jpg";
import EventImage4 from "../../assets/Instalaciones.jpg";
import EventImage5 from "../../assets/DisciplinasActividades.jpg";

import "../../styles/Inicio/EventList.css";

const MantenimientoEvento = () => {
  const navigate = useNavigate();

  const upcomingEvents = [
    {
      id: 1,
      title: "Crear ficha",
      image: EventImage2,
      description: "Creación de fichas dinámicas para los eventos.",
    },
    {
      id: 2,
      title: "Universidades",
      image: EventImage3,
      description: "Registrar universidades.",
    },
    {
      id: 3,
      title: "Instalaciones",
      image: EventImage4,
      description: "Registrar instalaciones para los eventos.",
    },
    {
      id: 4,
      title: "Disciplinas y Actividades",
      image: EventImage5,
      description:
        "Registras las disciplinas ó actividades.",
    },
    {
      id: 5,
      title: "Reglas",
      image: EventImage,
      description: "Reglas para las actividades y disciplinas.",
    },
  ];

  const handleImageClick = (id) => {
    if (id === 1) {
      navigate("/lista-fichas");
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
        <h2 className="eventlisttitle">Mantenimiento del Evento</h2>

        <div
          className={`eventgrid ${
            upcomingEvents.length === 5 ? "two-events" : ""
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

export default MantenimientoEvento;
