import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import { UserOutlined, LogoutOutlined, CaretDownFilled } from "@ant-design/icons";
import "../../styles/Inicio/Navbar.css";
import logo from "../../assets/logo-unah-blanco.png";

const NavDashboard = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogoutClick = async () => {
    try {
      // 1. Llamar al endpoint de logout del backend
      const response = await fetch('http://localhost:4000/api/auth/logout', {
        method: 'POST',
        credentials: 'include' // Importante para enviar la cookie
      });
  
      if (!response.ok) {
        throw new Error('Error al cerrar sesión');
      }
  
      // 2. Redirigir al login
      navigate('/login');
      
      // 3. Cerrar menú si está abierto
      setMenuOpen(false);
      
      // 4. Limpiar cualquier dato local si es necesario
      localStorage.removeItem("usuarioEmail");
      
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // Podrías mostrar un mensaje de error al usuario aquí
    }
  };

  const handleInicioClick = () => {
    navigate("/dashboard"); // Redirige a /dashboard
    setMenuOpen(false); // Cierra el menú en dispositivos móviles
  };

  const handleEscanerClick = () => {
    navigate("/escaneoCredencial"); // Redirige a /dashboard
    setMenuOpen(false); // Cierra el menú en dispositivos móviles
  };
  const handleVocuherClick = () => {
    navigate("/vouchers"); // Redirige a /dashboard
    setMenuOpen(false); // Cierra el menú en dispositivos móviles
  };

  const handlePerfilClick = () => {
    navigate("/perfil");
    setMenuOpen(false);
  };

  // Menú desplegable para el perfil
  const profileMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}onClick={handlePerfilClick}>
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
         
        
         {/*  <a
            
            className="navlinkcustom"
            onClick={handleEscanerClick} // Redirige a /dashboard
          >
            Escaneo
          </a>
 */}
          {/* Menú desplegable de perfil con ícono */}
          <Dropdown overlay={profileMenu} trigger={["click"]}>
            <a className="navlink" onClick={(e) => e.preventDefault()} style={{ cursor: "pointer" }}>
              <UserOutlined style={{ fontSize: "20px" }} /> <CaretDownFilled />
            </a>
          </Dropdown>
        </nav>
      </div>
    </header>
  );
};

export default NavDashboard;