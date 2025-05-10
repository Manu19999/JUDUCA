import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Slider from "react-slick";
import BotonRegresar from "../../components/Dashboard/BotonRegresar";
import EventoCaracteristica from "./EventoCaracteristica";

import EventImage from "../../assets/Eventos/Fichas.jpg";
import EventImage3 from "../../assets/FichaInscripcion.jpg";
import EventImage4 from "../../assets/FichaMedica.jpg";
import EventImage5 from "../../assets/CrearEquipo.jpg";
import EventImage6 from "../../assets/Credencial.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/Credencial/credencial.css";

const GestionEvento = () => {
  const navigate = useNavigate();
  const [evento, setEvento] = useState(null); // Estado para el evento seleccionado

  // 🔹 Cargar el evento seleccionado desde localStorage
  useEffect(() => {
    const eventoGuardado = localStorage.getItem("eventoActivo");
    if (eventoGuardado) {
      setEvento(JSON.parse(eventoGuardado));
    }
  }, []);

  const upcomingEvents = [
    {
      id: 1,
      title: "Fichas",
      image: EventImage,
      description: "Creación y gestión de fichas.",
      size: "medium",
    },
    {
      id: 2,
      title: "Registro",
      image: EventImage3,
      description: "Fichas de registro e inscripciones.",
      size: "medium",
    },
    {
      id: 3,
      title: "Vouchers",
      image: EventImage4,
      description: "Control de tickets y vouchers.",
      size: "medium",
    },
    {
      id: 4,
      title: "Diseñador de Credenciales",
      image: EventImage6,
      description: "Asignar credenciales.",
      size: "medium",
    },
    {
      id: 5,
      title: "Juegos",
      image: EventImage5,
      description: "Configurador de equipos.",
      size: "medium",
    },
  ];

  const handleImageClick = (id) => {
    const routes = {
      1: "/lista-fichas",
      2: "/llenar-fichas",
      3: "/vouchers",
      4: "/credencialView",
      5: "/JuegoView",
    };
    navigate(routes[id] || "/gestion-evento");
  };

  // Configuración del carrusel
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (

    <section id="events" className="eventlist">

      <Container>
        <BotonRegresar to="/eventos" text="Regresar" />


        {/* 🔹 Mostrar el nombre del evento seleccionado */}
        <div className="credenciallisttitle text-center mt-3" style={{ paddingTop: "30px" }}>
          <h2>
            {evento ? `EVENTO SELECCIONADO : ${evento.title}` : "Cargando evento..."}
          </h2>
       
        <Slider {...settings}>
          {upcomingEvents.map((event) => (
            <div key={event.id}>
              <EventoCaracteristica
                event={event}
                onImageClick={() => handleImageClick(event.id)}
              />
            </div>
          ))}
        </Slider>
        </div >
      </Container>
    </section>
  );
};

export default GestionEvento;
