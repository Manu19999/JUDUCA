import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import  useAuth  from "../hooks/useAuth"; // Importa el hook de autenticación
import Nav from '../components/Dashboard/navDashboard';
import UsuariosImage from "../../src/assets/Seguridad/usuarios.jpg";
import RolesImage from "../../src/assets/Seguridad/roles.jpg";
import UniversidadesImage from "../../src/assets/Seguridad/Universidad.jpg";
import ParametrosImage from "../../src/assets/Seguridad/parametros.jpg";
import BitacoraImage from "../../src/assets/Seguridad/bitacora.jpg";
import ObjetosImage from "../../src/assets/Seguridad/objetos.jpg";
import BotonRegresar from "../components/Dashboard/BotonRegresar";
import "../styles/Inicio/Caja-seguridad.css";

// Definir los nombres de objetos para cada módulo de seguridad
const SEGURIDAD_VIEWS = {
  USUARIOS: 'Usuarios',
  ROLES: 'Roles',
  UNIVERSIDADES: 'Universidades',
  PARAMETROS: 'Parametros',
  BITACORAS: 'Bitacoras',
  OBJETOS: 'Objetos'
};

const CajaSeguridad = () => {
  const navigate = useNavigate();
  const { hasPermission } = useAuth(); // Obtiene la función para verificar permisos

  // Todos los ítems con sus permisos requeridos
  const allItems = [
    {
      id: 1,
      title: "Usuarios",
      image: UsuariosImage,
      description: "Gestión de usuarios del sistema.",
      route: "/usuarios",
      requiredPermission: SEGURIDAD_VIEWS.USUARIOS
    },
    {
      id: 2,
      title: "Roles",
      image: RolesImage,
      description: "Administración de roles y permisos.",
      route: "/roles",
      requiredPermission: SEGURIDAD_VIEWS.ROLES
    },
    {
      id: 3,
      title: "Universidades",
      image: UniversidadesImage,
      description: "Listado y gestión de universidades.",
      route: "/universidades",
      requiredPermission: SEGURIDAD_VIEWS.UNIVERSIDADES
    },
    {
      id: 4,
      title: "Parámetros",
      image: ParametrosImage,
      description: "Configuración de parámetros del sistema.",
      route: "/parametros",
      requiredPermission: SEGURIDAD_VIEWS.PARAMETROS
    },
    {
      id: 5,
      title: "Bitácoras",
      image: BitacoraImage,
      description: "Registro y auditoría de acciones.",
      route: "/bitacoras",
      requiredPermission: SEGURIDAD_VIEWS.BITACORAS
    },
    {
      id: 6,
      title: "Objetos",
      image: ObjetosImage,
      description: "Gestión de Objetos.",
      route: "/objetos",
      requiredPermission: SEGURIDAD_VIEWS.OBJETOS
    },
  ];

  // Filtrar ítems basados en los permisos del usuario
  const visibleItems = allItems.filter(item => 
    hasPermission(item.requiredPermission, 'consultar')
  );

  const handleImageClick = (route) => {
    navigate(route);
  };

  return (
    <section id="caja-seguridad" className="caja-seguridad-container">
      <Container>
        <Nav />
        <div className="espaciotexto">
          <BotonRegresar to="/dashboard" text="Regresar" />
          <h2 className="caja-seguridad-title">Gestión de seguridad</h2>
          
          {visibleItems.length > 0 ? (
            <div className="caja-seguridad-grid">
              {visibleItems.map((item) => (
                <div 
                  key={item.id} 
                  className="caja-seguridad-card" 
                  onClick={() => handleImageClick(item.route)}
                >
                  <div className="caja-seguridad-image-container">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="caja-seguridad-image"
                    />
                  </div>
                  <h3>{item.title}</h3>
                  <p className="card-seguridad-description">{item.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-access-message">
              No tienes permisos para acceder a ningún módulo de seguridad
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default CajaSeguridad;