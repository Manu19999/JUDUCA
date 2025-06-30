import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import  useAuth  from "../../hooks/useAuth"; // Importa el hook de autenticación

import paises from "../../assets/Mantenimientos/paises.jpg";
import ciudades from "../../assets/Mantenimientos/ciudades.jpg";
import instalaciones from "../../assets/Mantenimientos/instalaciones.jpg";
import apiMapping from "../../assets/Mantenimientos/apiMapping.jpg";
import generos from "../../assets/Mantenimientos/generos.jpg";
import BotonRegresar from "./BotonRegresar";
import "../../styles/Inicio/Caja-seguridad.css";

// Definir los nombres de objetos para cada módulo de mantenimiento
const MANTENIMIENTO_VIEWS = {
  PAISES: 'Paises',
  CIUDADES: 'Ciudades',
  INSTALACIONES: 'Instalaciones',
  GENEROS: 'Generos',
  API_MAP: 'ApiMap'
};

const GestionMantenimiento = () => {
  const navigate = useNavigate();
  const { hasPermission } = useAuth(); // Obtiene la función para verificar permisos

  // Todos los ítems con sus permisos requeridos
  const allMantenimientosOptions = [
    {
      id: 1,
      title: "Paises",
      image: paises,
      route: "/MantenimientoPaises",
      description: "Registrar y editar países del sistema.",
      requiredPermission: MANTENIMIENTO_VIEWS.PAISES
    },
    {
      id: 2,
      title: "Ciudades",
      image: ciudades,
      route: "/MantenimientoCiudades",
      description: "Gestionar ciudades según su país.",
      requiredPermission: MANTENIMIENTO_VIEWS.CIUDADES
    },
    {
      id: 3,
      title: "Instalaciones",
      image: instalaciones,
      route: "/MantenimientoInstalaciones",
      description: "Administrar las instalaciones disponibles.",
      requiredPermission: MANTENIMIENTO_VIEWS.INSTALACIONES
    },
    {
      id: 4,
      title: "Géneros",
      image: generos,
      route: "/MantenimientoGeneros",
      description: "Configurar opciones de género para usuarios.",
      requiredPermission: MANTENIMIENTO_VIEWS.GENEROS
    },
    {
      id: 5,
      title: "Mapeo de Data",
      image: apiMapping,
      route: "/MantenimientoApiMap",
      description: "Relacionar campos internos con datos externos.",
      requiredPermission: MANTENIMIENTO_VIEWS.API_MAP
    }
  ];

  // Filtrar ítems basados en los permisos del usuario
  const visibleMantenimientos = allMantenimientosOptions.filter(item => 
    hasPermission(item.requiredPermission, 'consultar')
  );

  const handleImageClick = (route) => {
    navigate(route);
  };

  return (
    <section id="mantenimientos" className="caja-seguridad-container">
      <Container>
        <div className="espaciotexto">
          <BotonRegresar to="/dashboard" text="Regresar" />
          <h2 className="caja-seguridad-title">Mantenimientos</h2>
          
          {visibleMantenimientos.length > 0 ? (
            <div className="caja-seguridad-grid">
              {visibleMantenimientos.map((mantenimiento) => (
                <div 
                  key={mantenimiento.id} 
                  className="caja-seguridad-card" 
                  onClick={() => handleImageClick(mantenimiento.route)}
                >
                  <div className="caja-seguridad-image-container">
                    <img
                      src={mantenimiento.image}
                      alt={mantenimiento.title}
                      className="caja-seguridad-image"
                    />
                  </div>
                  <h3>{mantenimiento.title}</h3>
                  <p className="card-seguridad-description">{mantenimiento.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-access-message">
              No tienes permisos para acceder a ningún módulo de mantenimiento
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default GestionMantenimiento;