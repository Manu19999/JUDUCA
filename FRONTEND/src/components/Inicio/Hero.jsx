import React from "react";
import { Container, Button } from "react-bootstrap";
import "../../styles/Inicio/Hero.css";

const Hero = () => {
  return (
    <div className="hero-section">
      <div className="overlay"></div>
      <Container className="text-center hero-content fade-in">
        <h1 className="hero-title">JUDUCA 2025</h1>
        <p className="hero-subtitle">¡Vive la pasión del deporte universitario!</p>
        <Button variant="primary" size="lg" className="explore-button">
          Explorar Eventos
        </Button>
      </Container>
    </div>
  );
};

export default Hero;
