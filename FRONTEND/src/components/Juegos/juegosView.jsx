import React, { useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TargetaMantenimiento from "../Dashboard/TargetaMantenimientos";
import competencias from "../../assets/Mantenimientos/competencias.jpg";
import disciplinas from "../../assets/Mantenimientos/disciplinas.jpg";
import reglas from "../../assets/Mantenimientos/reglas.jpg";
import BotonRegresar from "../../components/Dashboard/BotonRegresar";
import "../../styles/Inicio/Caja-seguridad.css";

import "../../styles/Inicio/GestionAreas.css"; // Estilos de las cajas


const GestionJuegos = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedMantenimiento, setSelectedMantenimiento] = useState(null);

  const mantenimientosOptions = [
    {
      id: 1,
      title: "Competencias",
      image: competencias,
      description: "Gestión de eventos o torneos escolares.",
    },
    {
      id: 2,
      title: "Disciplinas",
      image: disciplinas,
      description: "Registro de áreas deportivas o académicas.",
    },
    {
      id: 3,
      title: "Reglas",
      image: reglas,
      description: "Configuración de normas y criterios.",
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
    <section id="otrosmantenimientos" className="mantenimiento-list">
      <Container>
      <div className="espaciotexto">
        <BotonRegresar to="/gestion-evento" text="Regresar" />
         <h2 className="caja-seguridad-title">Juegos</h2>
         <div className="caja-seguridad-grid">
            {mantenimientosOptions.map((mantenimiento) => (
            <div key={mantenimiento.id} className="caja-seguridad-card">
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
        </div >
      </Container>
    </section>
  );
};

export default GestionJuegos;