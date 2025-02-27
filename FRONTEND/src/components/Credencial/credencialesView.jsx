import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EventoCaracteristica from "../Eventos/EventoCaracteristica";
import EventImage6 from "../../assets/Credencial.jpg";
import "../../styles/Credencial/credencial.css";
s
const GestionCredenciales = () => {
  const navigate = useNavigate();

  const credencialesOptions = [
    {
      id: 1,
      title: "Juan Pérez",
      image: EventImage6,
      description: "Estudiante de Ingeniería",
      size: "small",    },
    {
      id: 2,
      title: "María Gómez",
      image: EventImage6,
      description: "Estudiante de Medicina",
      size: "small",    },
    {
      id: 3,
      title: "Carlos López",
      image: EventImage6,
      description: "Estudiante de Derecho",
      size: "small",    },
    {
      id: 4,
      title: "Ana Martínez",
      image: EventImage6,
      description: "Estudiante de Arquitectura",
      size: "small",    },
      
  ];

  const handleImageClick = (id) => {
    // Navegar a la página de asignación de credenciales para la persona seleccionada
    navigate(`/asignar-credencial/${id}`);
  };

  const handleEditClick = (id) => {
    console.log(`Editar credencial de la persona con id ${id}`);
  };

  const handleManageClick = (id) => {
    console.log(`Gestionar credencial de la persona con id ${id}`);
  };

  return (
    <section id="credenciales" className="eventlist">
      <Container>
        <h2 className="eventlisttitle">Asignación de Credenciales</h2>
        <Row>
          {credencialesOptions.map((persona) => (
            <Col key={persona.id} xs={4} sm={3} md={2} lg={2} xl={2}>
              <EventoCaracteristica
                event={persona}
                onImageClick={() => handleImageClick(persona.id)}
                onEditClick={() => handleEditClick(persona.id)}
                onManageClick={() => handleManageClick(persona.id)}
                showIcons={true} // Mostrar íconos para todas las tarjetas
              />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default GestionCredenciales;