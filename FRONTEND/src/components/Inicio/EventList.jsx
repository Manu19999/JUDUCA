import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EventCard from "./EventCard";
import EventImage from "../../assets/eventoConcierto.jpg";
import EventImage2 from "../../assets/eventoCine.jpg";
import EventImage3 from "../../assets/eventoArte.jpg";
import "../../styles/Inicio/EventList.css";

const EventList = () => {
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
      title: "Festival de Cine",
      date: "20 de Noviembre, 2023",
      image: EventImage2,
      description:
        "Proyecciones de cine independiente y conversatorios con directores.",
    },
  ];

  const pastEvents = [
    {
      id: 3,
      title: "Feria de Tecnología",
      date: "5 de Diciembre, 2022",
      image: EventImage3,
      description:
        "Descubre las últimas innovaciones tecnológicas en un solo lugar.",
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
      title: "Taller de Programación",
      date: "15 de Agosto, 2022",
      image: EventImage2,
      description: "Aprende a programar desde cero con expertos en el área.",
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

  const [activeTab, setActiveTab] = useState("upcoming");
  const [carouselIndex, setCarouselIndex] = useState(0);

  const nextSlide = () => {
    setCarouselIndex((prevIndex) =>
      prevIndex < Math.ceil(pastEvents.length / 3) - 1 ? prevIndex + 1 : 0
    );
  };

  const prevSlide = () => {
    setCarouselIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : Math.ceil(pastEvents.length / 3) - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselIndex]);

  const visibleEvents = pastEvents.slice(
    carouselIndex * 3,
    carouselIndex * 3 + 3
  );

  const handleImageClick = (id) => {
    if (id === 1) {
      navigate("/gestion-evento");
    }
  };

  return (
    <section id="events" className="eventlist">
      <Container>
        <h2 className="eventlisttitle">Eventos</h2>
        <div className="eventtabs">
          <button
            className={`eventtab ${activeTab === "past" ? "active" : ""}`}
            onClick={() => setActiveTab("past")}
          >
            Pasados
          </button>
          <button
            className={`eventtab ${activeTab === "upcoming" ? "active" : ""}`}
            onClick={() => setActiveTab("upcoming")}
          >
            Próximos
          </button>
          <button
            className={`eventtab ${activeTab === "featured" ? "active" : ""}`}
            onClick={() => setActiveTab("featured")}
          >
            Nuevo
          </button>
        </div>

        {activeTab === "upcoming" && (
          <div
            className={`eventgrid ${
              upcomingEvents.length === 2 ? "two-events" : ""
            }`}
          >
            {upcomingEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onImageClick={() => handleImageClick(event.id)}
              />
            ))}
          </div>
        )}

        {activeTab === "past" && (
          <div className="eventgrid">
            <div className="carousel-container">
              {visibleEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            {pastEvents.length > 3 && (
              <div className="carousel-buttons">
                <button className="carousel-button prev" onClick={prevSlide}>
                  &#10094;
                </button>
                <button className="carousel-button next" onClick={nextSlide}>
                  &#10095;
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "featured" && (
          <div
            className={`eventgrid ${
              featuredEvents.length === 2 ? "two-events" : ""
            }`}
          >
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
