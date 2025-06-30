import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import SeguridadImage from "../../assets/Seguridad/seguridad.jpg"; // Imagen para Seguridad
import EventosImage from "../../assets/eventos.jpg"; // Imagen para Eventos
import MantenimientosImage from "../../assets/mantenimientos.jpg"; // Imagen para Mantenimientos
import  useAuth  from "../../hooks/useAuth"; // Importa el hook de autenticación
import "../../styles/Inicio/GestionAreas.css"; // Estilos de las cajas

const VIEW_NAMES = {
  CAJASEGURIDAD: 'CajaSeguridad',
  CAJAMANTENIMIENTO:'CajaMantenimiento',
  CAJAEVENTOS:'CajaEventos'
};

const GestionAreas = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { hasPermission } = useAuth(); 
  // Datos de las cajas
  const areas = [
    {
      id: 1,
      title: "Seguridad",
      image: SeguridadImage,
      description: "Gestión de usuarios, roles y permisos del sistema.",
      route: "/seguridad", // Ruta a la que redirige
      requiredPermission: VIEW_NAMES.CAJASEGURIDAD
    },
    {
      id: 2,
      title: "Eventos",
      image: EventosImage,
      description: "Administración de eventos, inscripciones y equipos.",
      route: "/eventos", // Ruta a la que redirige
      requiredPermission: VIEW_NAMES.CAJAEVENTOS
    },
    {
      id: 3,
      title: "Mantenimientos",
      image: MantenimientosImage,
      description: "Mantenimiento de catálogos y configuración del sistema.",
      route: "/mantenimientos", // Ruta a la que redirige
      requiredPermission: VIEW_NAMES.CAJAMANTENIMIENTO
    },
  ];

  // Función para manejar el clic en la imagen
  const handleImageClick = (route) => {
    navigate(route); // Navega a la ruta especificada
  };

  // Filtrar áreas basadas en los permisos del usuario
  const filteredAreas = areas.filter(area => 
    !area.requiredPermission || hasPermission(area.requiredPermission, 'consultar')
  );
  
  return (
    <section id="areas" className="eventlist">
      <Container>
      <div className="crud">
        {/* Encabezado con la ubicación actual */}
        <h2 className="eventlist-title">Áreas de Gestión</h2>
        {filteredAreas.length > 0 ? (
          <div className="eventgrid">
            {filteredAreas.map((area) => (
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
        ) : (
          <div className="no-access-message">
            No tienes acceso a ninguna área de gestión
          </div>
        )}
      </div>
      </Container>
    </section>
  );
};

export default GestionAreas;