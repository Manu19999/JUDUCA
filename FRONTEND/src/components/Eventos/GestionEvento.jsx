import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BotonRegresar from "../../components/Dashboard/BotonRegresar";

import EventImage from "../../assets/Eventos/Fichas.jpg";
import EventImage3 from "../../assets/FichaInscripcion.jpg";
import EventImage4 from "../../assets/FichaMedica.jpg";
import EventImage5 from "../../assets/CrearEquipo.jpg";
import EventImage6 from "../../assets/Credencial.jpg";

import "../../styles/Inicio/Caja-seguridad.css"; // Importar los mismos estilos

const GestionEvento = () => {
  const navigate = useNavigate();
  const [evento, setEvento] = useState(null);

useEffect(() => {
  const eventoGuardado = localStorage.getItem("eventoActivo");
  if (eventoGuardado) {
    const evento = JSON.parse(eventoGuardado);
    // Normalizar el objeto para tener siempre idEvento
    const eventoNormalizado = evento.id && !evento.idEvento ? 
      {...evento, idEvento: evento.id} : 
      evento;
    setEvento(eventoNormalizado);
  }
}, []);

  const features = [
    {
      id: 1,
      title: "Configurador de Fichas",
      image: EventImage,
      description: "Creación y gestión de fichas.",
      route: "/lista-fichas"
    },
    {
      id: 2,
      title: "Registro",
      image: EventImage3,
      description: "Fichas de registro e inscripciones.",
      route: "/llenar-fichas"
    },
    {
      id: 3,
      title: "Vouchers",
      image: EventImage4,
      description: "Control de tickets y vouchers.",
      route: "/vouchers"
    },
    {
      id: 4,
      title: "Diseñador de Credenciales",
      image: EventImage6,
      description: "Asignar credenciales.",
      route: "/credencialView"
    },
    {
      id: 5,
      title: "Juegos",
      image: EventImage5,
      description: "Configurador de equipos.",
      route: "/JuegoView"
    }
  ];

  const handleImageClick = (route) => {
    navigate(route);
  };

  return (
    <section id="caja-seguridad" className="caja-seguridad-container">
      <Container>
        <div className="espaciotexto">
          <BotonRegresar to="/eventos" text="Regresar" />
          <h2 className="caja-seguridad-title">
            {evento ? `Evento Seleccionado: ${evento.title}` : "Cargando evento..."}
          </h2>

          <div className="caja-seguridad-grid">
            {features.map((feature) => (
              <div 
                key={feature.id} 
                className="caja-seguridad-card"
                onClick={() => handleImageClick(feature.route)}
              >
                <div className="caja-seguridad-image-container">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="caja-seguridad-image"
                  />
                </div>
                <h3>{feature.title}</h3>
                <p className="card-seguridad-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default GestionEvento;