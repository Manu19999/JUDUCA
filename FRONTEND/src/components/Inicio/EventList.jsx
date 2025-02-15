import React, { useState, useEffect } from "react";
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
    {
      id: 5,
      title: "Taller de Programación",
      date: "15 de Agosto, 2022",
      image: EventImage2,
      description: "Aprende a programar desde cero con expertos en el área.",
    },
    {
      id: 6,
      title: "Exposición de Arte",
      date: "20 de Julio, 2022",
      image: EventImage3,
      description: "Explora las obras de artistas emergentes en esta exposición única.",
    },
  ];

  const featuredEvents = [
    {
      id: 7,
      title: "Evento Destacado: Hackathon UNAH",
      date: "30 de Noviembre, 2023",
      image: EventImage2,
      description: "Participa en el hackathon más grande de la universidad.",
    },
  ];

  // Estado para controlar la pestaña activa
  const [activeTab, setActiveTab] = useState("upcoming");

  // Estado para controlar el índice del carrusel
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Función para avanzar en el carrusel
  const nextSlide = () => {
    setCarouselIndex((prevIndex) => {
      const maxIndex = Math.ceil(pastEvents.length / 2) - 1;
      return prevIndex < maxIndex ? prevIndex + 1 : 0; // Vuelve al inicio si llega al final
    });
  };

  // Función para retroceder en el carrusel
  const prevSlide = () => {
    setCarouselIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : Math.ceil(pastEvents.length / 2) - 1)); // Vuelve al final si está al inicio
  };

  // Efecto para la transición automática
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Cambia de slide cada 5 segundos

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, [carouselIndex]); // Se ejecuta cuando cambia el índice del carrusel

  // Obtener los eventos visibles en el carrusel
  const visibleEvents = pastEvents.slice(carouselIndex * 2, carouselIndex * 2 + 2);

  return (
    <section id="events" className="eventlist">
      <Container>
        {/* Título principal */}
        <h2 className="eventlisttitle">Eventos</h2>

        {/* Pestañas */}
        <div className="eventtabs">
          <button
            className={`eventtab ${activeTab === "upcoming" ? "active" : ""}`}
            onClick={() => setActiveTab("upcoming")}
          >
            Próximos
          </button>
          <button
            className={`eventtab ${activeTab === "past" ? "active" : ""}`}
            onClick={() => setActiveTab("past")}
          >
            Pasados
          </button>
          <button
            className={`eventtab ${activeTab === "featured" ? "active" : ""}`}
            onClick={() => setActiveTab("featured")}
          >
            Destacados
          </button>
        </div>

        {/* Lista de Próximos Eventos */}
        {activeTab === "upcoming" && (
          <div className="eventgrid">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

       {/* Lista de Eventos Pasados con Carrusel */}
        {activeTab === "past" && (
          <div className="eventgrid">
            <div className="carousel-container">
              {visibleEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            <div className="carousel-buttons">
              <button className="carousel-button prev" onClick={prevSlide}>
                &#10094;
              </button>
              <button className="carousel-button next" onClick={nextSlide}>
                &#10095;
              </button>
            </div>
          </div>
        )}

        {/* Lista de Eventos Destacados */}
        {activeTab === "featured" && (
          <div className="eventgrid">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default EventList;