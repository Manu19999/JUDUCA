import React from "react";
import { Container, Button  } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Slider from "react-slick";

import EventoCaracteristica from "./EventoCaracteristica";

import EventImage from "../../assets/Eventos/Fichas.jpg";
import EventImage3 from "../../assets/FichaInscripcion.jpg";
import EventImage4 from "../../assets/FichaMedica.jpg";
import EventImage5 from "../../assets/CrearEquipo.jpg";
import EventImage6 from "../../assets/Credencial.jpg";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/Credencial/credencial.css";

/* ***************** Componente que nos permite gestionar el evento seleccionado asignandole fichas, vauchers, credenciales etc. ****** */
const GestionEvento = () => {
  const navigate = useNavigate();

  const upcomingEvents = [
    {
      id: 1,
      title: "Fichas",
      image: EventImage,
      description: "Creación y gestión de fichas.",
      size: "medium", // Asigna un tamaño
    },
    {
      id: 2,
      title: "Registro",
      image: EventImage3,
      description: "Fichas de registro e inscriciones.",
      size: "small", // Asigna un tamaño
    },
    {
      id: 3,
      title: "Vauchers",
      image: EventImage4,
      description: "Control de tickets y vouchers.",
      size: "medium", // Asigna un tamaño
    },
    {
      id: 4,
      title: "Diseñador de Credenciales",
      image: EventImage6,
      description: "Asignar credenciales.",
      size: "medium", // Asigna un tamaño
    },
    {
      id: 5,
      title: "Juegos",
      image: EventImage5,
      description: "Creación de los equipos y competencias.",
      size: "medium", // Asigna un tamaño
    },
  ];

  const handleImageClick = (id) => {
    if (id === 1) {
      navigate("/lista-fichas");
    }
    if (id === 2) {
      navigate("/llenar-fichas");
    }
    if (id === 3) {
      navigate("");
    }
    if (id === 4) {
      navigate("/credencialView");
    }
    if (id === 5) {
      navigate("/JuegoView");
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
    autoplaySpeed: 1500, // Velocidad del desplazamiento automático
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
      <Button
  variant="outline-warning"
  onClick={() => navigate("/eventos")}
  className="d-flex align-items-center gap-2"
  style={{  marginTop: '55px' }}
>
  <FaArrowLeft size={20} /> Regresar
</Button>
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