import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SeguridadImage from "../../assets/seguridad.jpg"; // Imagen para Seguridad
import EventosImage from "../../assets/eventos.jpg"; // Imagen para Eventos
import MantenimientosImage from "../../assets/mantenimientos.jpg"; // Imagen para Mantenimientos

import "../../styles/Inicio/GestionAreas.css"; // Estilos de las cajas
const GestionAreas = () => {
  const navigate = useNavigate();

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
      route: "/lista-eventos", // Ruta a la que redirige
    },
    {
      id: 3,
      title: "Mantenimientos",
      image: MantenimientosImage,
      description: "Mantenimiento de catálogos y configuración del sistema.",
      route: "/mantenimientos", // Ruta a la que redirige
    },
  ];

  // Función para manejar el clic en la imagen
  const handleImageClick = (route) => {
    navigate(route); // Navega a la ruta especificada
  };

  return (
    <section id="areas" className="eventlist">
      <Container>
        <h2 className="eventlisttitle">Áreas de Gestión</h2>
        <div className="eventgrid">
          {areas.map((area) => (
            <div key={area.id} className="eventcard">
              <img
                src={area.image}
                alt={area.title}
                className="eventimage"
                onClick={() => handleImageClick(area.route)} // Redirige al hacer clic
                style={{ cursor: "pointer" }} // Cambia el cursor a pointer
              />
              <h3 className="eventtitle">{area.title}</h3>
              <p className="eventdescription">{area.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default GestionAreas;