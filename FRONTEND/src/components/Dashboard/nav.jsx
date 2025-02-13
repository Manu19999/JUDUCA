import React from "react";
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import "../../styles/Dashboard/nav.css";
import logo from "../../assets/UNAH-escudo.png";


const navigate = () => {
  return (
    <Navbar expand="lg" className="unah-navbar">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src="./src/assets/UNAH-escudo.png"
            className="unah-logo"
          />
          UNAH
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#inicio">Inicio</Nav.Link>
            <Nav.Link href="#eventos">Eventos </Nav.Link>
            <Nav.Link href="#noticias">Noticias</Nav.Link>
            <Nav.Link href="#calendario">Calendario</Nav.Link>
            <Nav.Link href="#contacto">Contacto</Nav.Link>
            <NavDropdown title="Gestión" id="basic-na-dropdown">
              <NavDropdown.Item href="/crear-credencial">Credenciales</NavDropdown.Item>
              <NavDropdown.Item href="#eventos">Eventos</NavDropdown.Item>
              <NavDropdown.Item href="#usuarios">Usuarios</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#reportes">Reportes</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );

};


export default navigate;
