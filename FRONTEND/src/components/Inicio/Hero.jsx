import React from "react";
import { Container, Carousel } from "react-bootstrap";
import "../../styles/Inicio/Hero.css";

// Importa las imágenes que quieras usar en el carrusel
import imagen1 from "../../assets/CDUUNAH.jpg";
import imagen2 from "../../assets/eventoCine.jpg";
import imagen3 from "../../assets/eventoArte.jpg";


const Hero = () => {
  return (
    <div className="hero-section">
      <Carousel fade controls={false} indicators={false} pause={false} interval={5000}>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src={imagen1}
            alt="First slide"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src={imagen2}
            alt="Second slide"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src={imagen3}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>

      {/* Contenido fijo fuera del Carousel */}
      <div className="overlay"></div>
      <Container className="hero-content">
        <h1 className="hero-title">JUDUCA 2025</h1>
        <p className="hero-subtitle">Eventos VOAE</p>
      </Container>
    </div>
  );
};

export default Hero;