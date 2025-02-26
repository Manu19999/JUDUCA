import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import EventoCaracteristica from "./EventoCaracteristica";
import EventImage from "../../assets/eventoConcierto.jpg";
import EventImage3 from "../../assets/FichaInscripcion.jpg";
import EventImage4 from "../../assets/FichaMedica.jpg";
import EventImage5 from "../../assets/CrearEquipo.jpg";
import EventImage6 from "../../assets/Credencial.jpg";
import "../../styles/Inicio/EventList.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GestionEvento = () => {
  const navigate = useNavigate();

  const upcomingEvents = [
    {
      id: 1,
      title: "JUDUCA",
      image: EventImage,
      description: "Juegos Deportivos Universitarios Centroamericanos.",
      size: "medium", // Asigna un tamaño
    },
    {
      id: 2,
      title: "Ficha de Inscripciones",
      image: EventImage3,
      description: "Inscripciones de los atletas.",
      size: "small", // Asigna un tamaño
    },
    {
      id: 3,
      title: "Ficha de Salud",
      image: EventImage4,
      description: "Inscripciones de los atletas.",
      size: "medium", // Asigna un tamaño
    },
    {
      id: 4,
      title: "Diseñador de Credenciales",
      image: EventImage6,
      description: "Configura el diseño de la credencial.",
      size: "medium", // Asigna un tamaño
    },
    {
      id: 5,
      title: "Crear Equipo",
      image: EventImage5,
      description: "Creación de los equipos a las disciplinas y actividades.",
      size: "medium", // Asigna un tamaño
    },
  ];

  const handleImageClick = (id) => {
    if (id === 1) {
      navigate("/mantenimiento-evento");
    }
    if (id === 2) {
      navigate("/ficha-participantes");
    }
    if (id === 3) {
      navigate("/ficha-salud");
    }
    if (id === 4) {
      navigate("/confCredencial");
    }
  };

  const handleEditClick = (id) => {
    console.log(`Editar evento con id ${id}`);
  };

  const handleManageClick = (id) => {
    console.log(`Gestionar evento con id ${id}`);
  };

  // Configuración del carrusel
  const settings = {
    dots: true, // Muestra los puntos de navegación
    infinite: true, // Bucle infinito
    speed: 500, // Velocidad de transición
    slidesToShow: 4, // Número de tarjetas visibles a la vez
    slidesToScroll: 1, // Número de tarjetas a desplazar
    autoplay: true, // Desplazamiento automático
    autoplaySpeed: 2000, // Velocidad del desplazamiento automático
    responsive: [
      {
        breakpoint: 768, // Configuración para pantallas pequeñas
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Configuración para pantallas muy pequeñas
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section id="events" className="eventlist">
      <Container>
        <h2 className="eventlisttitle">Evento</h2>
        <Slider {...settings}>
          {upcomingEvents.map((event) => (
            <div key={event.id}>
              <EventoCaracteristica
                event={event}
                onImageClick={() => handleImageClick(event.id)}
                onEditClick={() => handleEditClick(event.id)}
                onManageClick={() => handleManageClick(event.id)}
                showIcons={event.id === 1}
              />
            </div>
          ))}
        </Slider>
      </Container>
    </section>
  );
};

export default GestionEvento;