import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { MdLogout } from "react-icons/md";
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
       {/*   <a href="#Eventos" className="navlinkcustom" onClick={() => setMenuOpen(false)}>
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
          </a>*/}

          {/* Menú desplegable para Eventos */}

          <NavDropdown title="Seguridad" id="nav-dropdown" className="navlinkcustom">
            <NavDropdown.Item href="#">Usuarios</NavDropdown.Item>
            <NavDropdown.Item href="#">Bitacora</NavDropdown.Item>
            <NavDropdown.Item href="#">Permisos</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Fichas" id="nav-dropdown" className="navlinkcustom">
            <NavDropdown.Item href="/crear-evento">Crear evento</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Credenciales" id="nav-dropdown" className="navlinkcustom">
            <NavDropdown.Item href="/crearCredencial">Asignar Credencial</NavDropdown.Item>
            <NavDropdown.Item href="/confCredencial">Configuracion credencial</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Vouchers y tickets" id="nav-dropdown" className="navlinkcustom">
         <NavDropdown.Item href="/voucher">Vouchers</NavDropdown.Item>
                     <NavDropdown.Divider />
                     <NavDropdown.Item href="/consumo">Consumo Vouchers</NavDropdown.Item>
                     <NavDropdown.Divider />
                     <NavDropdown.Item href="/ticket">Tickets</NavDropdown.Item>
                     <NavDropdown.Divider />
                     <NavDropdown.Item href="/comedor">Comedores</NavDropdown.Item>
                     <NavDropdown.Divider />
          </NavDropdown>


          {/* Botón Cerrar sesión en móviles */}
          <button className="btn-acceder mobile-only" onClick={handleLogoutClick}>
          Cerrar sesión  <MdLogout size={22} /> 


          </button>
        </nav>

        {/* Botón Cerrar sesión en escritorio */}
        <button className="btn-acceder desktop-only" onClick={handleLogoutClick}>
          Cerrar sesión  <MdLogout size={22} /> 

        </button>
      </div>
    </header>
  );
};
    


export default navigate;
