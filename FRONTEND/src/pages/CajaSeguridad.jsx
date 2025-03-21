import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import Nav from '../components/Dashboard/navDashboard';

import UsuariosImage from "../../src/assets/usuarios.jpg";
import RolesImage from "../../src/assets/roles.jpg";
import UniversidadesImage from "../../src/assets/Universidad.jpg";
import ParametrosImage from "../../src/assets/parametros.jpg";
import BitacoraImage from "../../src/assets/bitacora.jpg";
import BotonRegresar from "../components/Dashboard/BotonRegresar";

import "../styles/Inicio/Caja-seguridad.css";

const CajaSeguridad = () => {
  const navigate = useNavigate();

  const items = [
    {
      id: 1,
      title: "Usuarios",
      image: UsuariosImage,
      description: "Gestión de usuarios del sistema.",
      route: "/usuarios",
    },
    {
      id: 2,
      title: "Roles",
      image: RolesImage,
      description: "Administración de roles y permisos.",
      route: "/roles",
    },
    {
      id: 3,
      title: "Universidades",
      image: UniversidadesImage,
      description: "Listado y gestión de universidades.",
      route: "/universidades",
    },
    {
      id: 4,
      title: "Parámetros",
      image: ParametrosImage,
      description: "Configuración de parámetros del sistema.",
      route: "/parametros",
    },
    {
      id: 5,
      title: "Bitácora",
      image: BitacoraImage,
      description: "Registro y auditoría de acciones.",
      route: "/bitacora",
    },
  ];

  const handleImageClick = (route) => {
    navigate(route);
  };

  return (
   
    
    <section id="caja-seguridad" className="caja-seguridad-container">
      <Container>
      <Nav />
      {/* Botón para añadir un nuevo voucher */}
      <div className="crud">
       
        <BotonRegresar to="/dashboard" text="Regresar"  />

        <h2 className="caja-seguridad-title">Géstion de seguridad</h2>
        <div className="caja-seguridad-grid">
            
          {items.map((item) => (
            <div key={item.id} className="caja-seguridad-card">
              <img
                src={item.image}
                alt={item.title}
                className="caja-seguridad-image"
                onClick={() => handleImageClick(item.route)}
              />
              <h3>{item.title}</h3>
              <p className="eventdescription">{item.description}</p>
            </div>
          ))}
        </div>
        </div>
      </Container>
      
    </section>
   
  );

};

export default CajaSeguridad;
