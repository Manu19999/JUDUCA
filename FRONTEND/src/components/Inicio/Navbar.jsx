import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "../../styles/Inicio/Navbar.css";

const CustomNavbar = () => {
  const navigate = useNavigate(); // Hook para redirigir

  const handleLoginClick = () => {
    navigate("/login"); // Redirige a la página de login
  };

  return (
    <Navbar expand="lg" className="navbar-custom" fixed="top">
      <Container>
        {/* Logo a la izquierda */}
        <Navbar.Brand href="#home" className="logo">Eventos</Navbar.Brand>

        {/* Botón para abrir el menú en móviles */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Menú de navegación */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto nav-links"> {/* mx-auto centra el menú */}
            <Nav.Link href="#home" className="nav-link-custom">Inicio</Nav.Link>
            <Nav.Link href="#events" className="nav-link-custom">Eventos</Nav.Link>
            <Nav.Link href="#contact" className="nav-link-custom">Contacto</Nav.Link>
          </Nav>

          {/* Botón de acceso (esquina derecha en pantallas grandes) */}
          <Button
            variant="outline-light"
            className="btn-acceder ms-lg-3"
            onClick={handleLoginClick} // Manejador de clic
          >
            Acceder
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;