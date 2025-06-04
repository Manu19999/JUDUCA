import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import SeguridadImage from "../../assets/Seguridad/seguridad.jpg"; // Imagen para Seguridad
import EventosImage from "../../assets/eventos.jpg"; // Imagen para Eventos
import MantenimientosImage from "../../assets/mantenimientos.jpg"; // Imagen para Mantenimientos

import "../../styles/Inicio/GestionAreas.css"; // Estilos de las cajas

const GestionAreas = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Datos de las cajas
  const areas = [
    {
      id: 1,
      title: "Seguridad",
      image: SeguridadImage,
      description: "Gestión de usuarios, roles y permisos del sistema.",
      route: "/seguridad", // Ruta a la que redirige
    },
    {
      id: 2,
      title: "Eventos",
      image: EventosImage,
      description: "Administración de eventos, inscripciones y equipos.",
      route: "/eventos", // Ruta a la que redirige
    },
    {
      id: 3,
      title: "Mantenimientos",
      image: MantenimientosImage,
      description: "Mantenimiento de catálogos y configuración del sistema.",
      route: "/mantenimientoView", // Ruta a la que redirige
    },
  ];

  // Función para manejar el clic en la imagen
  const handleImageClick = (route) => {
    navigate(route); // Navega a la ruta especificada
  };

  return (
    <section id="areas" className="eventlist">
      <Container>
      <div className="crud">
        {/* Encabezado con la ubicación actual */}
        <h2 className="eventlist-title">Áreas de Gestión</h2>
          <div className="eventgrid">
            {areas.map((area) => (
              <div key={area.id} className="eventcard" onClick={() => handleImageClick(area.route)}>
                <div className="caja-areas-image-container">
                  <img
                    src={area.image}
                    alt={area.title}
                    className="eventimage"
                  />
                </div>
                <h3>{area.title}</h3>
                <p className="eventdescription">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default GestionAreas;