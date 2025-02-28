import React, { useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TargetaMantenimiento from "../Dashboard/TargetaMantenimientos";
import paises from "../../assets/Mantenimientos/paises.jpg";
import ciudades from "../../assets/Mantenimientos/ciudades.jpg";

import "../../styles/Credencial/credencial.css";
import { FaArrowLeft } from "react-icons/fa";

const GestionMantenimiento = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedMantenimiento, setSelectedMantenimiento] = useState(null);

  const mantenimientosOptions = [
    {
      id: 1,
      title: "Mantenimiento de Paises",
      image: paises,
      description: "Revisión y actualización de hardware",
    },
    {
      id: 2,
      title: "Mantenimiento de Ciudades",
      image: ciudades,
      description: "Optimización y monitoreo de la red",
    },
    {
      id: 3,
      title: "Mantenimiento de Software",
      image: paises,
      description: "Actualización y depuración de sistemas",
    },
    {
      id: 3,
      title: "Mantenimiento de Software",
      image: paises,
      description: "Actualización y depuración de sistemas",
    },
    {
      id: 3,
      title: "Mantenimiento de Software",
      image: paises,
      description: "Actualización y depuración de sistemas",
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

        <Button
          variant="outline-warning"
          onClick={() => navigate("/dashboard")}
          className="d-flex align-items-center gap-2"
          style={{ marginTop: '45px' }}
        >
          <FaArrowLeft size={20} /> Regresar
        </Button> <h2 className="mantenimiento-list-title" >Mantenimientos</h2>
        <Row>
          {mantenimientosOptions.map((mantenimiento) => (
            <Col key={mantenimiento.id} xs={4} sm={3} md={2} lg={2} xl={2}>
              <TargetaMantenimiento
                mantenimiento={mantenimiento}

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