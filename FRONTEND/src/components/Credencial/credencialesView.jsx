import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TargetaCredencial from "../Credencial/targetaCredencial";
import EventImage6 from "../../assets/Credencial.jpg"; // Imagen de la ficha
import Inscripciones from "../../assets/Eventos/Inscripciones.jpg";
import Delegados from "../../assets/Eventos/Delegados.jpg";
import Voluntariados from "../../assets/Eventos/Voluntariado.jpg";
import "../../styles/Credencial/credencial.css";
import { FaArrowLeft } from "react-icons/fa";

const GestionCredenciales = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedFicha, setSelectedFicha] = useState(null);
  const [fichasOptions, setFichasOptions] = useState([]);

  // 🔹 Datos en duro basados en la estructura de tblFichasRegistros
  useEffect(() => {
    const datosFichas = [
      {
        idFichaRegistro: 1,
        idEvento: 1,
        nombreFicha: "Inscripción académico JUDUCA",
        fotoRegistro: Inscripciones,
        activo: true,
        comentarios: "Inscripción de los participantes.",
      },
      {
        idFichaRegistro: 2,
        idEvento: 2,
        nombreFicha: "Inscripción de delegados.",
        fotoRegistro: Delegados,
        activo: false,
        comentarios: "Inscripción de los delegados.",
      },
      {
        idFichaRegistro: 3,
        idEvento: 3,
        nombreFicha: "Inscripción de voluntariado",
        fotoRegistro: Voluntariados,
        activo: true,
        comentarios: "Inscripción de los voluntariados.",
      },
    ];

    // Transformamos los datos para la lista de credenciales
    const fichasConDatos = datosFichas.map((ficha) => ({
      id: ficha.idFichaRegistro,
      title: ficha.nombreFicha,
      image: ficha.fotoRegistro,
      description: ficha.comentarios,
      idEvento: ficha.idEvento,
      activo: ficha.activo ? "Activo" : "Inactivo",
    }));

    setFichasOptions(fichasConDatos);
  }, []);

  const handleImageClick = (ficha) => {
    navigate(`/OpcionCredencial`, { state: { selectedFicha: ficha } });
  };

  const handleVerInfo = (ficha) => {
    setSelectedFicha(ficha);
    setShowModal(true);
  };

  const handleConfigurarCredencial = (id) => {
    navigate(`/asignacionCampos`);
  };

  return (
    <section id="credenciales" className="eventlist">
      <Container>
        <Button
          variant="outline-warning"
          onClick={() => navigate("/gestion-evento")}
          className="d-flex align-items-center gap-2"
          style={{ marginTop: "30px" }}
        >
          <FaArrowLeft size={20} /> Regresar
        </Button>

        <h2 className="credenciallisttitle">Generar Credenciales</h2>
        <Row>
          {fichasOptions.map((ficha) => (
            <Col key={ficha.id} xs={12} sm={6} md={4} lg={3} xl={2}>
              <TargetaCredencial
                event={ficha}
                onImageClick={() => handleImageClick(ficha)}
                handleVerInfo={() => handleVerInfo(ficha)}
                handleConfigurarCredencial={() => handleConfigurarCredencial(ficha.id)}
                showIcons={true}
              />
            </Col>
          ))}
        </Row>

        {/* Modal con más información */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <div style={{ backgroundColor: "#e3f2fd", borderRadius: "10px" }}>
            <Modal.Header closeButton>
              <Modal.Title>Detalles de la Ficha</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              {selectedFicha && (
                <>
                  <img
                    src={selectedFicha.image}
                    alt={selectedFicha.title}
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
                    {selectedFicha.title}
                  </h3>
                  <p style={{ color: "#6c757d", fontSize: "1rem" }}>
                    {selectedFicha.description}
                  </p>
                  <hr />
                  <div style={{ textAlign: "left", padding: "10px" }}>
                    <p><strong>ID Evento:</strong> {selectedFicha.idEvento}</p>
                    <p><strong>Estado:</strong> {selectedFicha.activo}</p>
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