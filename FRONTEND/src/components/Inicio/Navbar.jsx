import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Inicio/Navbar.css";
import logo from "../../assets/logo-unah-blanco.png";

const CustomNavbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLoginClick = () => {
    navigate("/login");
    setMenuOpen(false); // Cierra el menú al navegar
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
          <a href="#inicio" className="navlinkcustom" onClick={() => setMenuOpen(false)}>Inicio</a>
          <a href="#events" className="navlinkcustom" onClick={() => setMenuOpen(false)}>Eventos</a>
          <a href="#contact" className="navlinkcustom" onClick={() => setMenuOpen(false)}>Contacto</a>
          <a href="#acercade" className="navlinkcustom" onClick={() => setMenuOpen(false)}>Acerca de</a>
          {/* Botón Acceder en móviles */}
          <button className="btn-acceder mobile-only" onClick={handleLoginClick}>Acceder</button>
        </nav>

        {/* Botón Acceder en escritorio */}
        <button className="btn-acceder desktop-only" onClick={handleLoginClick}> Acceder </button>
      </div>
    </header>
  );
};

export default CustomNavbar;
