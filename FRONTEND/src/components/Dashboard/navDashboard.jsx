import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import { CaretDownFilled } from "@ant-design/icons";
import { MdLogout } from "react-icons/md";
import "../../styles/Inicio/Navbar.css";
import logo from "../../assets/logo-unah-blanco.png";

const NavDashboard = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setMenuOpen(false);
  };

  const seguridadItems = [
    { key: "1", label: "Usuarios", onClick: () => navigate("/usuarios") },
    { key: "2", type: "divider" },
    { key: "3", label: "Roles", onClick: () => navigate("/roles") },
    { key: "4", type: "divider" },
    { key: "5", label: "Bitácora" },
    { key: "6", type: "divider" },
    { key: "7", label: "Permisos" },
  ];

  const credencialesItems = [
    { key: "1", label: "Asignar Credencial", onClick: () => navigate("/crearCredencial") },
    { key: "2", type: "divider" },
    { key: "3", label: "Configuración credencial", onClick: () => navigate("/confCredencial") },
  ];

  const vouchersItems = [
    { key: "1", label: "Vouchers", onClick: () => navigate("/voucher") },
    { key: "2", type: "divider" },
    { key: "3", label: "Consumo Vouchers", onClick: () => navigate("/consumo") },
    { key: "4", type: "divider" },
    { key: "5", label: "Tickets", onClick: () => navigate("/ticket") },
    { key: "6", type: "divider" },
    { key: "7", label: "Comedores", onClick: () => navigate("/comedor") },
  ];

  return (
    <header className="navbar-custom">
      <div className="navbar-container">
        <div className="navbar-brand">
          <a
            href="https://www.unah.edu.hn/"
            target="_blank"
            rel="noopener noreferrer"
            className="logo-container"
          >
            <img src={logo} alt="Logo" className="logo-img" />
            <span className="platform-text">Plataforma de eventos</span>
          </a>
        </div>

        <button
          className={`custom-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>

        <nav className={`custom-menu ${menuOpen ? "show" : ""}`}>
          <a href="#inicio" className="navlinkcustom" onClick={() => setMenuOpen(false)}>
            Inicio
          </a>

          <Dropdown menu={{ items: seguridadItems }}>
            <a className="navlinkcustom" onClick={(e) => e.preventDefault()} style={{ cursor: "pointer" }}>
              Seguridad <CaretDownFilled />
            </a>
          </Dropdown>

          <a className="navlinkcustom" onClick={() => navigate("/lista-eventos")} style={{ cursor: "pointer" }}>
            Eventos
          </a>

          <Dropdown menu={{ items: credencialesItems }}>
            <a className="navlinkcustom" onClick={(e) => e.preventDefault()} style={{ cursor: "pointer" }}>
              Credenciales <CaretDownFilled />
            </a>
          </Dropdown>

          <Dropdown menu={{ items: vouchersItems }}>
            <a className="navlinkcustom" onClick={(e) => e.preventDefault()} style={{ cursor: "pointer" }}>
              Vouchers y tickets <CaretDownFilled />
            </a>
          </Dropdown>

          <button className="btn-acceder mobile-only" onClick={handleLogoutClick}>
            Cerrar sesión <MdLogout />
          </button>
        </nav>

        <button className="btn-acceder desktop-only" onClick={handleLogoutClick}>
          Cerrar sesión <MdLogout />
        </button>
      </div>
    </header>
  );
};

export default NavDashboard;
