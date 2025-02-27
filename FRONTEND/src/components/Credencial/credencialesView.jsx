import React, { useState } from "react";
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
      edad: 22,
      email: "juan.perez@email.com",
      telefono: "+57 320 123 4567",
      direccion: "Calle 123, Bogotá, Colombia",
    },
    {
      id: 2,
      title: "María Gómez",
      image: EventImage6,
      description: "Estudiante de Medicina",
      edad: 24,
      email: "maria.gomez@email.com",
      telefono: "+57 310 654 7890",
      direccion: "Carrera 45, Medellín, Colombia",
    },
    {
      id: 3,
      title: "Carlos López",
      image: EventImage6,
      description: "Estudiante de Derecho",
      edad: 23,
      email: "carlos.lopez@email.com",
      telefono: "+57 301 111 2233",
      direccion: "Avenida Principal, Cali, Colombia",
    },
    {
      id: 4,
      title: "Ana Martínez",
      image: EventImage6,
      description: "Estudiante de Arquitectura",
      edad: 25,
      email: "ana.martinez@email.com",
      telefono: "+57 315 987 6543",
      direccion: "Calle 78, Barranquilla, Colombia",
    },
    {
      id: 5,
      title: "Pedro Ramírez",
      image: EventImage6,
      description: "Estudiante de Economía",
      edad: 21,
      email: "pedro.ramirez@email.com",
      telefono: "+57 318 222 3333",
      direccion: "Calle 50, Cartagena, Colombia",
    },
    {
      id: 6,
      title: "Sofía Herrera",
      image: EventImage6,
      description: "Estudiante de Psicología",
      edad: 22,
      email: "sofia.herrera@email.com",
      telefono: "+57 316 777 8888",
      direccion: "Calle 90, Bucaramanga, Colombia",
    },
  ];

  const handleImageClick = (id) => {
    navigate(`/asignar-credencial/${id}`);
  };

  const handleVerInfo = (persona) => {
    setSelectedPersona(persona); // Pasamos el objeto completo
    setShowModal(true);
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
                handleVerInfo={() => handleVerInfo(persona)} // Pasamos el objeto completo
                onManageClick={() => handleManageClick(persona.id)}
                showIcons={true}
              />
            </Col>
          ))}
        </Row>

        {/* Modal con más información */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <div
            style={{
              backgroundColor: "#e3f2fd",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Detalles del Participante</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              {selectedPersona && (
                <>
                  <img
                    src={selectedPersona.image}
                    alt={selectedPersona.title}
                    className="shadow-sm"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      border: "4px solid #007bff",
                      padding: "5px",
                    }}
                  />
                  <h3 style={{ color: "#1f2e54", fontWeight: "bold", marginTop: "15px" }}>
                    {selectedPersona.title}
                  </h3>
                  <p style={{ color: "#6c757d", fontSize: "1rem" }}>
                    {selectedPersona.description}
                  </p>
                  <hr />
                  <div style={{ textAlign: "left", padding: "10px" }}>
                    <p><strong>Edad:</strong> {selectedPersona.edad} años</p>
                    <p><strong>Email:</strong> {selectedPersona.email}</p>
                    <p><strong>Teléfono:</strong> {selectedPersona.telefono}</p>
                    <p><strong>Dirección:</strong> {selectedPersona.direccion}</p>
                  </div>
                </>
              )}
            </Modal.Body>
            <Modal.Footer style={{ justifyContent: "center" }}>
              <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
                Cerrar
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      </Container>
    </section>
  );
};

export default GestionCredenciales;
