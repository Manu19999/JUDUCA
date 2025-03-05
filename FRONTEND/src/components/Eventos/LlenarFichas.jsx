import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

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
      description: "nscripción de los delegados de las universidades.",
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
      id: 3,
      title: "Otras fichas",
      image: Otras,
      description: "Inscripción o registro de otras fichas.",
      route: "/fichas",
    },
    {
      id: 3,
      title: "Otras fichas",
      image: Otras,
      description: "Inscripción o registro de otras fichas.",
      route: "/fichas",
    },
    {
      id: 3,
      title: "Otras fichas",
      image: Otras,
      description: "Inscripción o registro de otras fichas.",
      route: "/fichas",
    },
    {
      id: 3,
      title: "Otras fichas",
      image: Otras,
      description: "Inscripción o registro de otras fichas.",
      route: "/fichas",
    },
    {
      id: 3,
      title: "Otras fichas",
      image: Otras,
      description: "Inscripción o registro de otras fichas.",
      route: "/fichas",
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
          <Button
            variant="outline-warning"
            onClick={() => navigate("/dashboard")}
            className="d-flex align-items-center gap-2"
            style={{ marginTrim: "80px" }}
          >
            <FaArrowLeft size={20} /> Regresar
          </Button>
          <h2 className="caja-seguridad-title">Fichas de Registro</h2>
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

export default LlenarFichas;
