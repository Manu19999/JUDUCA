import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import "../../styles/Inicio/Navbar.css";
import logo from "../../assets/logo-unah-blanco.png";


const navigate = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogoutClick = () => {
    // Aquí puedes agregar la lógica para cerrar sesión, como eliminar tokens
    localStorage.removeItem("token"); // Si usas JWT en localStorage
    navigate("/login");
    setMenuOpen(false);

  };

  return (
    <header className="navbar-custom">
      <div className="navbar-container">
        {/* Logo */}
        <a
          href="https://www.unah.edu.hn/"
          className="logo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={logo} alt="Logo" className="logo-img" />
        </a>

        {/* Botón Toggle (solo en móviles) */}
        <button
          className={`custom-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>

        {/* Menú de Navegación */}
        <nav className={`custom-menu ${menuOpen ? "show" : ""}`}>
          <a href="#inicio" className="navlinkcustom" onClick={() => setMenuOpen(false)}>
            Inicio
          </a>
          <a href="#Eventos" className="navlinkcustom" onClick={() => setMenuOpen(false)}>
            Eventos
          </a>
          <a href="#Noticias" className="navlinkcustom" onClick={() => setMenuOpen(false)}>
            Noticas
          </a>
          <a href="#Calendario" className="navlinkcustom" onClick={() => setMenuOpen(false)}>
            Calendario
          </a>
          <a href="#contacto" className="navlinkcustom" onClick={() => setMenuOpen(false)}>
            Contacto
          </a>
          {/* Menú desplegable para Eventos */}
          <NavDropdown title="Gestion" id="nav-dropdown" className="navlinkcustom">
            <NavDropdown.Item href="/crear-evento">Crear evento</NavDropdown.Item>
            <NavDropdown.Item href="/crearCredencial">Crear credencial</NavDropdown.Item>
            <NavDropdown.Item href="/confCredencial">Configuracion credenciall</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Vouchers y tickets" id="nav-dropdown" className="navlinkcustom">
            <NavDropdown.Item href="/voucher">Gestion vouchers</NavDropdown.Item>
            <NavDropdown.Item href="#Gestion">Gestion tickets</NavDropdown.Item>
            <NavDropdown.Item href="#Gestion">Gestion</NavDropdown.Item>
          </NavDropdown>


          {/* Botón Cerrar sesión en móviles */}
          <button className="btn-acceder mobile-only" onClick={handleLogoutClick}>
            Cerrar sesión
          </button>
        </nav>

        {/* Botón Cerrar sesión en escritorio */}
        <button className="btn-acceder desktop-only" onClick={handleLogoutClick}>
          Cerrar sesión
        </button>
      </div>
    </header>
  );
};
    


export default navigate;
