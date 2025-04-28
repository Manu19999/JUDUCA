import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPlus, FaCog } from "react-icons/fa"; // Importa los íconos

import Nav from "../../components/Dashboard/navDashboard";

import Inscripciones from "../../assets/Eventos/Inscripciones.jpg";
import Delegados from "../../assets/Eventos/Delegados.jpg";
import Voluntariados from "../../assets/Eventos/Voluntariado.jpg";
import Otras from "../../assets/Eventos/otras.jpg";

import "../../styles/Inicio/Caja-seguridad.css";

/* ********** Componente que permite a los delegados y encargados de poder llenar las fichas asignadas al evento ejm. Ficha de inscripciones*/

const LlenarFichas = () => {
  const navigate = useNavigate();

  const items = [
    {
      id: 1,
      title: "Inscripción componente académico JUDUCA",
      image: Inscripciones,
      description: "Ficha para inscribir a los participantes al evento.",
      route: "/fichas",
    },
    {
      id: 2,
      title: "Inscripción de delegados",
      image: Delegados,
      description: "Inscripción de los delegados de las universidades.",
      route: "/fichas",
    },
    {
      id: 3,
      title: "Inscripción de voluntariado",
      image: Voluntariados,
      description: "Inscripción de los voluntariados al evento.",
      route: "/fichas",
    },
    {
      id: 4,
      title: "Otras fichas",
      image: Otras,
      description: "Inscripción o registro de otras fichas.",
      route: "/fichas",
    },
    {
      id: 4,
      title: "Otras fichas",
      image: Otras,
      description: "Inscripción o registro de otras fichas.",
      route: "/fichas",
    },
    {
      id: 4,
      title: "Otras fichas",
      image: Otras,
      description: "Inscripción o registro de otras fichas.",
      route: "/fichas",
    },
    {
      id: 4,
      title: "Otras fichas",
      image: Otras,
      description: "Inscripción o registro de otras fichas.",
      route: "/fichas",
    },
    {
      id: 4,
      title: "Otras fichas",
      image: Otras,
      description: "Inscripción o registro de otras fichas.",
      route: "/fichas",
    },
  ];

  const handleImageClick = (route) => {
    navigate(route);
  };

  // Función para manejar el clic en el ícono de "ojo"
  const handleViewClick = () => {
    console.log("Ver detalles de la ficha");
    // Aquí puedes redirigir a una vista de detalles o abrir un modal
  };

  // Función para manejar el clic en el ícono de "ajustes"
  const handleSettingsClick = () => {
    console.log("Configurar ficha");
    // Aquí puedes redirigir a una vista de configuración o abrir un modal
  };

  return (
    <section id="caja-seguridad" className="caja-seguridad-container">
      <Container>
        <Nav />
        {/* Botón para regresar */}
        <div className="crud">
          <Button
            variant="outline-warning"
            onClick={() => navigate("/dashboard")}
            className="d-flex align-items-center gap-2"
            style={{ marginTrim: "80px" }}
          >
            <FaArrowLeft size={20} /> Regresar
          </Button>

          <h2 className="caja-seguridad-title">Fichas de Registro</h2>

          {/* Lista de fichas */}
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

                {/* Íconos de ojo y ajustes */}
                <div className="eventicons">
                  <FaPlus
                    onClick={() => navigate("/ficha-participantes")}
                    className="eventicon manage-btn-credencial"
                    style={{ marginBottom: "10px", cursor: "pointer" }}
                  />
                  <FaCog
                    onClick={() => navigate("/fichas")}
                    className="eventicon manage-btn-credencial"
                    style={{
                      marginBottom: "10px",
                      marginInline: "10px",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default LlenarFichas;
