import React, { useState } from "react";
import { Container } from "react-bootstrap";
import EventCard from "./EventCard";
import EventImage from "../../assets/eventoConcierto.jpg";
import EventImage2 from "../../assets/eventoCine.jpg";
import EventImage3 from "../../assets/eventoArte.jpg";
import "../../styles/Inicio/EventList.css";

const EventList = () => {
  // Datos de ejemplo para eventos
  const upcomingEvents = [
    {
      id: 1,
      title: "Concierto de Rock",
      date: "15 de Octubre, 2023",
      image: EventImage,
      description: "Disfruta de una noche llena de música y energía con las mejores bandas.",
    },
    {
      id: 2,
      title: "Festival de Cine",
      date: "20 de Noviembre, 2023",
      image: EventImage2,
      description: "Proyecciones de cine independiente y conversatorios con directores.",
    },
  ];

  const pastEvents = [
    {
      id: 3,
      title: "Feria de Tecnología",
      date: "5 de Diciembre, 2022",
      image: EventImage3,
      description: "Descubre las últimas innovaciones tecnológicas en un solo lugar.",
    },
    {
      id: 4,
      title: "Conferencia de Innovación",
      date: "10 de Septiembre, 2022",
      image: EventImage,
      description: "Evento pasado sobre innovación y emprendimiento.",
    },
  ];

  const featuredEvents = [
    {
      id: 5,
      title: "Evento Destacado: Hackathon UNAH",
      date: "30 de Noviembre, 2023",
      image: EventImage2,
      description: "Participa en el hackathon más grande de la universidad.",
    },
  ];

  // Estado para controlar la pestaña activa
  const [activeTab, setActiveTab] = useState("upcoming");

  // Estado para controlar el índice actual de cada carrusel
  const [currentUpcomingIndex, setUpcomingIndex] = useState(0);
  const [currentPastIndex, setPastIndex] = useState(0);
  const [currentFeaturedIndex, setFeaturedIndex] = useState(0);

  // Funciones para navegar entre eventos
  const nextEvent = (setIndex, eventsLength) => {
    setIndex((prevIndex) => (prevIndex + 1) % eventsLength);
  };

  const prevEvent = (setIndex, eventsLength) => {
    setIndex((prevIndex) => (prevIndex - 1 + eventsLength) % eventsLength);
  };

  return (
    <section id="events" className="event-list">
      <Container>
        {/* Título principal */}
        <h2 className="event-list-title">Eventos</h2>

        {/* Pestañas */}
        <div className="event-tabs">
          <button
            className={`event-tab ${activeTab === "upcoming" ? "active" : ""}`}
            onClick={() => setActiveTab("upcoming")}
          >
            Próximos
          </button>
          <button
            className={`event-tab ${activeTab === "past" ? "active" : ""}`}
            onClick={() => setActiveTab("past")}
          >
            Pasados
          </button>
          <button
            className={`event-tab ${activeTab === "featured" ? "active" : ""}`}
            onClick={() => setActiveTab("featured")}
          >
            Destacados
          </button>
        </div>

        {/* Carrusel de Próximos Eventos */}
        {activeTab === "upcoming" && (
          <div className="carousel-container">
            <button
              className="carousel-button prev"
              onClick={() => prevEvent(setUpcomingIndex, upcomingEvents.length)}
            >
              &#10094;
            </button>
            <div className="carousel">
              {upcomingEvents.map((event, index) => (
                <div
                  key={event.id}
                  className={`carousel-item ${index === currentUpcomingIndex ? "active" : ""}`}
                >
                  <EventCard event={event} />
                </div>
              ))}
            </div>
            <button
              className="carousel-button next"
              onClick={() => nextEvent(setUpcomingIndex, upcomingEvents.length)}
            >
              &#10095;
            </button>
          </div>
        )}

        {/* Carrusel de Eventos Pasados */}
        {activeTab === "past" && (
          <div className="carousel-container">
            <button
              className="carousel-button prev"
              onClick={() => prevEvent(setPastIndex, pastEvents.length)}
            >
              &#10094;
            </button>
            <div className="carousel">
              {pastEvents.map((event, index) => (
                <div
                  key={event.id}
                  className={`carousel-item ${index === currentPastIndex ? "active" : ""}`}
                >
                  <EventCard event={event} />
                </div>
              ))}
            </div>
            <button
              className="carousel-button next"
              onClick={() => nextEvent(setPastIndex, pastEvents.length)}
            >
              &#10095;
            </button>
          </div>
        )}

        {/* Carrusel de Eventos Destacados */}
        {activeTab === "featured" && (
          <div className="carousel-container">
            <button
              className="carousel-button prev"
              onClick={() => prevEvent(setFeaturedIndex, featuredEvents.length)}
            >
              &#10094;
            </button>
            <div className="carousel">
              {featuredEvents.map((event, index) => (
                <div
                  key={event.id}
                  className={`carousel-item ${index === currentFeaturedIndex ? "active" : ""}`}
                >
                  <EventCard event={event} />
                </div>
              ))}
            </div>
            <button
              className="carousel-button next"
              onClick={() => nextEvent(setFeaturedIndex, featuredEvents.length)}
            >
              &#10095;
            </button>
          </div>
        )}
      </Container>
    </section>
  );
};

export default EventList;