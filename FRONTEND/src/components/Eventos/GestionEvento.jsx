import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import EventoCaracteristica from "./EventoCaracteristica";
import EventImage from "../../assets/Ficha.jpg";
import EventImage3 from "../../assets/Registro.jpg";
import EventImage4 from "../../assets/FichaMedica.jpg";
import EventImage5 from "../../assets/CrearEquipo.jpg";
import EventImage6 from "../../assets/Credencial.jpg";
import "../../styles/Inicio/EventList.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* *********************** Componetne que gestiona un evento permitiendo solo visualizar la información segun el rol ingresado ************ */

const GestionEvento = () => {
  const navigate = useNavigate();

  const upcomingEvents = [
    {
      id: 1,
      title: "Fichas",
      image: EventImage,
      description: "Creación y gestión de fichas para el evento.",
      size: "medium", // Asigna un tamaño
    },
    {
      id: 2,
      title: "Registro",
      image: EventImage3,
      description: "Fichas de registro e inscriciones al evento.",
      size: "small", // Asigna un tamaño
    },
    {
      id: 3,
      title: "Vauchers",
      image: EventImage4,
      description: "Creación de vauchers al evento.",
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
      title: "Equipos",
      image: EventImage5,
      description: "Creación de equpos a disciplina e actividades.",
      size: "medium", // Asigna un tamaño
    },
  ];

  const handleImageClick = (id) => {
    if (id === 1) {
      navigate("/lista-fichas");
    }
    if (id === 2) {
      navigate("/fichas-registro");
    }
    if (id === 3) {
      navigate("/ficha-salud");
    }
    if (id === 4) {
      navigate("/credencialView");
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
              />
            </div>
          ))}
        </Slider>
      </Container>
    </section>
  );
};

export default GestionEvento;