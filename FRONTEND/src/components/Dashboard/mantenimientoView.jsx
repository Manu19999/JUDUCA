
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TargetaMantenimiento from "../Dashboard/TargetaMantenimientos";
import paises from "../../assets/Mantenimientos/paises.jpg";
import ciudades from "../../assets/Mantenimientos/ciudades.jpg";
import instalaciones from "../../assets/Mantenimientos/instalaciones.jpg";
import competencias from "../../assets/Mantenimientos/competencias.jpg";
import disciplinas from "../../assets/Mantenimientos/disciplinas.jpg";
import reglas from "../../assets/Mantenimientos/reglas.jpg";
import apiMapping from "../../assets/Mantenimientos/apiMapping.jpg";
import generos from "../../assets/Mantenimientos/generos.jpg";
import BotonRegresar from "../../components/Dashboard/BotonRegresar";
import "../../styles/Inicio/Caja-seguridad.css";

const GestionMantenimiento = () => {
  const navigate = useNavigate();

  const mantenimientosOptions = [
    {
      id: 1,
      title: "Paises",
      image: paises,
      route: "/MantenimientoPaises",
      description: "Registrar y editar países del sistema."
    },
    {
      id: 2,
      title: "Ciudades",
      image: ciudades,
      route: "/MantenimientoCiudades",
      description: "Gestionar ciudades según su país."
    },
    {
      id: 3,
      title: "Instalaciones",
      image: instalaciones,
      route: "/MantenimientoInstalaciones",
      description: "Administrar las instalaciones disponibles."
    },
    {
      id: 4,
      title: "Géneros",
      image: generos,
      route: "/MantenimientoGeneros",
      description: "Configurar opciones de género para usuarios."
    },
    {
      id: 5,
      title: "Mapeo de Data",
      image: apiMapping,
      route: "/MantenimientoApiMap",
      description: "Relacionar campos internos con datos externos."
    }
  ];
  

  const handleImageClick = (route) => {
    navigate(route);
  };

  return (
    <section id="mantenimientos" className="caja-seguridad-container">
      <Container>
      <div className="espaciotexto">
      <BotonRegresar to="/dashboard" text="Regresar"  />
       <h2 className="caja-seguridad-title">Mantenimientos</h2>
       <div className="caja-seguridad-grid">
          {mantenimientosOptions.map((mantenimiento) => (
            <div key={mantenimiento.id} className="caja-seguridad-card" 
            onClick={() => handleImageClick(mantenimiento.route)}>
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
        </div>
      </Container>
    </section>
  );
};

export default GestionMantenimiento;