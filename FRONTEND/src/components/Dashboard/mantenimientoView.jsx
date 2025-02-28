import React, { useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import targetaMantenimiento from "../Dashboard/TargetaMantenimientos";
import { FaArrowLeft } from "react-icons/fa";

const GestionMantenimiento = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedMantenimiento, setSelectedMantenimiento] = useState(null);

  const mantenimientosOptions = [
    {
      id: 1,
      title: "Mantenimiento de Servidores",
      image: MantenimientoImage,
      description: "Revisión y actualización de hardware",
    },
    {
      id: 2,
      title: "Mantenimiento de Red",
      image: MantenimientoImage,
      description: "Optimización y monitoreo de la red",
    },
    {
      id: 3,
      title: "Mantenimiento de Software",
      image: MantenimientoImage,
      description: "Actualización y depuración de sistemas",
    }
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
        <Button
          variant="outline-dark"
          onClick={() => navigate("/gestion-mantenimiento")}
          className="d-flex align-items-center gap-2"
          style={{ marginTop: '30px' }}
        >
          <FaArrowLeft size={20} /> Regresar
        </Button>

        <h2 className="mantenimiento-list-title">Gestión de Mantenimientos</h2>
        <Row>
          {mantenimientosOptions.map((mantenimiento) => (
            <Col key={mantenimiento.id} xs={4} sm={3} md={2} lg={2} xl={2}>
              <targetaMantenimiento
                mantenimiento={mantenimiento}
                onImageClick={() => handleImageClick(mantenimiento.id)}
                handleVerInfo={() => handleVerInfo(mantenimiento)}
                showIcons={true}
              />
            </Col>
          ))}
        </Row>

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

export default GestionMantenimiento;