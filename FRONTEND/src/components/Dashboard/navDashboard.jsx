import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import { UserOutlined, LogoutOutlined, CaretDownFilled } from "@ant-design/icons";
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

  const handleInicioClick = () => {
    navigate("/dashboard"); // Redirige a /dashboard
    setMenuOpen(false); // Cierra el menú en dispositivos móviles
  };

  const handleEscanerClick = () => {
    navigate("/escaneoCredencial"); // Redirige a /dashboard
    setMenuOpen(false); // Cierra el menú en dispositivos móviles
  };

  // Menú desplegable para el perfil
  const profileMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Perfil
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogoutClick}>
        Cerrar sesión
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="navbar-custom">
      <div className="navbar-container">
        {/* Logo y nombre de la plataforma */}
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

        {/* Botón de menú para móviles */}
        <button
          className={`custom-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>

        {/* Menú de navegación */}
        <nav className={`custom-menu ${menuOpen ? "show" : ""}`}>
          {/* Enlace de inicio */}
          <a
            
            className="navlinkcustom"
            onClick={handleInicioClick} // Redirige a /dashboard
          >
            Inicio
          </a>
         {/*  <a
            
            className="navlinkcustom"
            onClick={handleEscanerClick} // Redirige a /dashboard
          >
            Escaneo
          </a>
 */}
          {/* Menú desplegable de perfil con ícono */}
          <Dropdown overlay={profileMenu} trigger={["click"]}>
            <a className="navlinkcustom" onClick={(e) => e.preventDefault()} style={{ cursor: "pointer" }}>
              <UserOutlined style={{ fontSize: "20px" }} /> <CaretDownFilled />
            </a>
          </Dropdown>
        </nav>
      </div>
    </header>
  );
};

export default NavDashboard;