import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import SeguridadImage from "../../assets/seguridad.jpg"; // Imagen para Seguridad
import EventosImage from "../../assets/eventos.jpg"; // Imagen para Eventos
import MantenimientosImage from "../../assets/mantenimientos.jpg"; // Imagen para Mantenimientos
import IzquierdaIcon from "../../assets/Iconos/izquierda.png"; // Ícono de regresar
import DerechaIcon from "../../assets/Iconos/derecha.png"; // Ícono de avanzar (opcional)

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

  // Función para regresar a la página anterior
  const handleGoBack = () => {
    navigate(-1); // Navega a la página anterior
  };

  return (
    <section id="areas" className="eventlist">
      <Container>
        {/* Encabezado con la ubicación actual */}
        <h2 className="eventlisttitle">Áreas de Gestión</h2>
        <div className="mb-4">
          <p className="text-muted">Estás en: {location.pathname}</p>
        </div>

        {/* Botón de regresar a la par de las cajas */}
        <div className="d-flex align-items-start">
          <button
            onClick={handleGoBack}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              marginRight: "1rem",
            }}
          >
            <img
              src={IzquierdaIcon} // Usa el ícono de regresar
              alt="Regresar"
              style={{ width: "100px", height: "100px",marginTop:"500" }} // Ajusta el tamaño del ícono
            />
          </button>

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
        </div>
      </Container>
    </section>
  );
};

export default GestionAreas;