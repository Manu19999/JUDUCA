import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "../../styles/Inicio/Navbar.css";
import logo from '../../assets/logo-unah-blanco.png'


const CustomNavbar = () => {
  const navigate = useNavigate(); // Hook para redirigir

  const handleLoginClick = () => {
    navigate("/login"); // Redirige a la página de login
  };

  return (
    <Navbar expand="lg" className="navbar-custom" fixed="top">
      <Container>
        {/* Logo a la izquierda */}
        <Navbar.Brand href="https://www.unah.edu.hn/" className="logo d-flex align-items-center" target="_blank" rel="noopener noreferrer">
         <img src={logo} alt="Logo" className="logo-img" /> 
        </Navbar.Brand>

        {/* Botón para abrir el menú en móviles */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Menú de navegación */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto nav-links"> {/* mx-auto centra el menú */}
            <Nav.Link href="#inicio" className="nav-link-custom">Inicio</Nav.Link>
            <Nav.Link href="#events" className="nav-link-custom">Eventos</Nav.Link>
            <Nav.Link href="#contact" className="nav-link-custom">Contacto</Nav.Link>
            <Nav.Link href="#acercade" className="nav-link-custom">Acerca de</Nav.Link>
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
