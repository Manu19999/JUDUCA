import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import EventCard from "./EventCard";
import EventModal from "./EventModal"; // Importa el componente del modal
import EventImage from "../../assets/eventoConcierto.jpg";
import EventImage2 from "../../assets/eventoCine.jpg";
import EventImage3 from "../../assets/eventoArte.jpg";
import "../../styles/Inicio/EventList.css";

const EventList = () => {
  const upcomingEvents = [
    { id: 1, title: "Concierto de Rock", date: "15 de Octubre, 2023", image: EventImage, description: "Disfruta de una noche llena de música y energía con las mejores bandas." },
    { id: 2, title: "Festival de Cine", date: "20 de Noviembre, 2023", image: EventImage2, description: "Proyecciones de cine independiente y conversatorios con directores." },
    { id: 3, title: "Festival de Cine", date: "20 de Noviembre, 2023", image: EventImage2, description: "Proyecciones de cine independiente y conversatorios con directores." },
    { id: 4, title: "Festival de Cine", date: "20 de Noviembre, 2023", image: EventImage2, description: "Proyecciones de cine independiente y conversatorios con directores." },
  ];

  const pastEvents = [
    { id: 5, title: "Feria de Tecnología", date: "5 de Diciembre, 2022", image: EventImage3, description: "Descubre las últimas innovaciones tecnológicas en un solo lugar." },
    { id: 6, title: "Conferencia de Innovación", date: "10 de Septiembre, 2022", image: EventImage, description: "Evento pasado sobre innovación y emprendimiento." },
    { id: 7, title: "Taller de Programación", date: "15 de Agosto, 2022", image: EventImage2, description: "Aprende a programar desde cero con expertos en el área." },
    { id: 8, title: "Taller de Programación", date: "15 de Agosto, 2022", image: EventImage2, description: "Aprende a programar desde cero con expertos en el área." },
  ];

  const [activeTab, setActiveTab] = useState("upcoming");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3); // Número de eventos visibles
  const [selectedEvent, setSelectedEvent] = useState(null); // Evento seleccionado para el modal
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal

  // Función para actualizar el número de eventos visibles según el tamaño de la pantalla
  const updateVisibleCount = () => {
    if (window.innerWidth > 992) {
      setVisibleCount(3); // 1 evento en pantallas pequeñas
    }
    if (window.innerWidth < 992) {
      setVisibleCount(2); // 1 evento en pantallas pequeñas
    }  if (window.innerWidth < 769) {
      setVisibleCount(1); // 1 evento en pantallas pequeñas
    } 
  };

  // Efecto para actualizar el número de eventos visibles al cambiar el tamaño de la pantalla
  useEffect(() => {
    updateVisibleCount(); // Actualizar al cargar el componente
    window.addEventListener("resize", updateVisibleCount); // Escuchar cambios en el tamaño de la pantalla
    return () => window.removeEventListener("resize", updateVisibleCount); // Limpiar el listener
  }, []);

  const nextSlide = (events) => {
    setCarouselIndex((prevIndex) => (prevIndex < Math.ceil(events.length / visibleCount) - 1 ? prevIndex + 1 : 0));
  };

  const prevSlide = (events) => {
    setCarouselIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : Math.ceil(events.length / visibleCount) - 1));
  };

  const goToSlide = (index) => {
    setCarouselIndex(index);
  };

  // Función para manejar el clic en una tarjeta
  const handleEventClick = (event) => {
    setSelectedEvent(event); // Establece el evento seleccionado
    setShowModal(true); // Abre el modal
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide(activeTab === "upcoming" ? upcomingEvents : pastEvents);
    }, 100000);
    return () => clearInterval(interval);
  }, [carouselIndex, activeTab, visibleCount]);

  const visibleEvents = (activeTab === "upcoming" ? upcomingEvents : pastEvents).slice(carouselIndex * visibleCount, carouselIndex * visibleCount + visibleCount);
  const totalSlides = Math.ceil((activeTab === "upcoming" ? upcomingEvents : pastEvents).length / visibleCount);

  return (
    <section id="eventosinicio" className="listevent">
      <Container>
        <h2 className="titlelistevent">Eventos</h2>
        <div className="optionsevent">
          <button className={`optionevent ${activeTab === "past" ? "active" : ""}`} onClick={() => { setActiveTab("past"); setCarouselIndex(0); }}>Pasados</button>
          <button className={`optionevent ${activeTab === "upcoming" ? "active" : ""}`} onClick={() => { setActiveTab("upcoming"); setCarouselIndex(0); }}>Próximos</button>
        </div>

        <div className="gridevent">
          <div className="contcarrusel">
            <button className="buttcarrusel prev" onClick={() => prevSlide(activeTab === "upcoming" ? upcomingEvents : pastEvents)}>&#10094;</button>
            {visibleEvents.map((event) => (
              <EventCard key={event.id} event={event} onClick={handleEventClick} />
            ))}
            <button className="buttcarrusel next" onClick={() => nextSlide(activeTab === "upcoming" ? upcomingEvents : pastEvents)}>&#10095;</button>
          </div>
          {totalSlides > 1 && (
            <div className="indicacarrusel">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  className={`indica ${index === carouselIndex ? "active" : ""}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          )}
        </div>
      </Container>

      {/* Modal para mostrar detalles del evento */}
      <EventModal
        event={selectedEvent}
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </section>
  );
};

export default EventList;