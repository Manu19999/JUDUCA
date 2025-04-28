import React, { useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TargetaCredencial from "../Credencial/targetaCredencial";
import EventImage6 from "../../assets/Credencial.jpg";
import "../../styles/Credencial/credencial.css";
import { FaArrowLeft } from "react-icons/fa";

/* **************** Componente que permite crear los distintos tipos de fichas y gestionarlas  **************** */
const FichaRegistros = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState(null);

  const credencialesOptions = [
    {
      id: 1,
      title: "Inscripción componente académico JUDUCA",
      image: EventImage6,
      description: "Ficha para inscribir a los participantes al evento.",
    },
    {
      id: 2,
      title: "Inscripción de delegados",
      image: EventImage6,
      description: "Inscripción de los delegados de las universidades.",
    },
    {
      id: 3,
      title: "Inscripción de voluntariado",
      image: EventImage6,
      description: "Inscripción de los voluntariados al evento.",
    },
    {
      id: 4,
      title: "Otras fichas",
      image: EventImage6,
      description: "Descripción breve de las fichas",
    },
    {
      id: 5,
      title: "Otras fichas",
      image: EventImage6,
      description: "Descripción breve de las fichas",
    },
    {
      id: 6,
      title: "Otras fichas",
      image: EventImage6,
      description: "Descripción breve de las fichas",
    },
    {
      id: 6,
      title: "Otras fichas",
      image: EventImage6,
      description: "Descripción breve de las fichas",
    },
    {
      id: 6,
      title: "Otras fichas",
      image: EventImage6,
      description: "Descripción breve de las fichas",
    },
  ];

  const handleImageClick = (id) => {
    if (id === 1) {
      navigate("/ficha-participantes");
    }
  };

  const handleVerInfo = (persona) => {
    setSelectedPersona(persona); // Pasamos el objeto completo
    setShowModal(true);
  };

  return (
    <section id="credenciales" className="eventlist">
      <Container>
        <Button
          variant="outline-dark"
          onClick={() => navigate("/gestion-evento")}
          className="d-flex align-items-center gap-2"
          style={{ marginTop: "30px" }}
        >
          <FaArrowLeft size={20} /> Regresar
        </Button>

        <h2 className="eventlisttitle">Asignación de Fichas</h2>
        <Row>
          {credencialesOptions.map((persona) => (
            <Col key={persona.id} xs={4} sm={3} md={2} lg={2} xl={2}>
              <TargetaCredencial
                event={persona}
                onImageClick={() => handleImageClick(persona.id)}
                handleVerInfo={() => handleVerInfo(persona)} // Pasamos el objeto completo
                handleConfigurarCredencial={() =>
                  handleConfigurarCredencial(persona.id)
                }
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
                  <h3
                    style={{
                      color: "#1f2e54",
                      fontWeight: "bold",
                      marginTop: "15px",
                    }}
                  >
                    {selectedPersona.title}
                  </h3>
                  <p style={{ color: "#6c757d", fontSize: "1rem" }}>
                    {selectedPersona.description}
                  </p>
                  <hr />
                  <div style={{ textAlign: "left", padding: "10px" }}>
                    <p>
                      <strong>Edad:</strong> {selectedPersona.edad} años
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedPersona.email}
                    </p>
                    <p>
                      <strong>Teléfono:</strong> {selectedPersona.telefono}
                    </p>
                    <p>
                      <strong>Dirección:</strong> {selectedPersona.direccion}
                    </p>
                  </div>
                </>
              )}
            </Modal.Body>
            <Modal.Footer style={{ justifyContent: "center" }}>
              <Button
                variant="outline-secondary"
                onClick={() => setShowModal(false)}
              >
                Cerrar
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      </Container>
    </section>
  );
};

export default FichaRegistros;
