import React, { useState , useEffect } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TargetaCredencial from "../Credencial/targetaCredencial";
import EventImage6 from "../../assets/Credencial.jpg";
import "../../styles/Credencial/credencial.css";


const GestionCredenciales = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const credencialesOptions = [
    {
      id: 1,
      title: "Juan Pérez",
      image: EventImage6,
      description: "Estudiante de Ingeniería",
      size: "small",
    },
    {
      id: 2,
      title: "María Gómez",
      image: EventImage6,
      description: "Estudiante de Medicina",
      size: "small",
    },
    {
      id: 3,
      title: "Carlos López",
      image: EventImage6,
      description: "Estudiante de Derecho",
      size: "small",
    },
    {
      id: 4,
      title: "Ana Martínez",
      image: EventImage6,
      description: "Estudiante de Arquitectura",
      size: "small",
    },
    {
      id: 5,
      title: "Pedro Ramírez",
      image: EventImage6,
      description: "Estudiante de Economía",
      size: "small",
    },
    {
      id: 6,
      title: "Sofía Herrera",
      image: EventImage6,
      description: "Estudiante de Psicología",
      size: "small",
    },
    {
      id: 7,
      title: "Daniel Castro",
      image: EventImage6,
      description: "Estudiante de Diseño Gráfico",
      size: "small",
    },
    {
      id: 8,
      title: "Laura Méndez",
      image: EventImage6,
      description: "Estudiante de Administración",
      size: "small",
    },
  ];
  

  const handleImageClick = (id) => {
    // Navegar a la página de asignación de credenciales para la persona seleccionada
    navigate(`/asignar-credencial/${id}`);
  };

  const handleVerInfo= (persona) => {
    setSelectedPersona(persona); // Guardar la persona seleccionada
    setShowModal(true); // Mostrar el modal
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
              <TargetaCredencial
                event={persona}
                onImageClick={() => handleImageClick(persona.id)}
                handleVerInfo={() => handleVerInfo(persona.id)}
                onManageClick={() => handleManageClick(persona.id)}
                showIcons={true} // Mostrar íconos para todas las tarjetas
              />
            </Col>
          ))}
        </Row>


        {/* Modal para mostrar detalles */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Detalles del Participante</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedPersona && (
              <>
                <img src={selectedPersona.image} alt={selectedPersona.title} className="img-fluid" />
                <h3>{selectedPersona.title}</h3>
                <p>{selectedPersona.description}</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cerrar</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </section>
  );
};

export default GestionCredenciales;
