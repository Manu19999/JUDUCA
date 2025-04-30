import React, { useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TargetaMantenimiento from "../Dashboard/TargetaMantenimientos";
import competencias from "../../assets/Mantenimientos/competencias.jpg";
import disciplinas from "../../assets/Mantenimientos/disciplinas.jpg";
import reglas from "../../assets/Mantenimientos/reglas.jpg";
import BotonRegresar from "../../components/Dashboard/BotonRegresar";



import "../../styles/Inicio/GestionAreas.css"; // Estilos de las cajas
import "../../styles/Credencial/credencial.css";

const GestionJuegos = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedMantenimiento, setSelectedMantenimiento] = useState(null);

  const mantenimientosOptions = [
    {
      id: 1,
      title: "Competencias",
      image: competencias,
    },
    {
      id: 2,
      title: "Disciplinas",
      image: disciplinas,

    },
    {
      id: 3,
      title: "Reglas",
      image: reglas,
    },

  ];

  const handleImageClick = (id) => {
    navigate(`/asignarMantenimiento/${id}`);
  };

  const handleVerInfo = (mantenimiento) => {
    setSelectedMantenimiento(mantenimiento);
    setShowModal(true);
  };

  return (
    <section id="mantenimientos" className="mantenimiento-list">
      <Container>

        <BotonRegresar to="/gestion-evento" text="Regresar" />

        <div style={{ paddingTop: "30px" }}>

         <h2 className="credenciallisttitle">JUEGOS</h2>
        <Row>
          {mantenimientosOptions.map((mantenimiento) => (
            <Col key={mantenimiento.id} xs={12} sm={6} md={4} lg={3} xl={2}>
              <TargetaMantenimiento
                mantenimiento={mantenimiento}

                showIcons={true}
              />
            </Col>
          ))}
        </Row>
        </div >


        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <div style={{ backgroundColor: "#e3f2fd", borderRadius: "10px", padding: "20px" }}>
            <Modal.Header closeButton>
              <Modal.Title>Detalles del Mantenimiento</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              {selectedMantenimiento && (
                <>
                  <img
                    src={selectedMantenimiento.image}
                    alt={selectedMantenimiento.title}
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
                    {selectedMantenimiento.title}
                  </h3>
                  <p style={{ color: "#6c757d", fontSize: "1rem" }}>
                    {selectedMantenimiento.description}
                  </p>
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

export default GestionJuegos;