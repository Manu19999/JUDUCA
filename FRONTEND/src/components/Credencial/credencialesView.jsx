import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TargetaCredencial from "../Credencial/targetaCredencial";
import EventImage6 from "../../assets/Credencial.jpg"; // Imagen de respaldo
import Inscripciones from "../../assets/Eventos/Inscripciones.jpg";
import Delegados from "../../assets/Eventos/Delegados.jpg";
import Voluntariados from "../../assets/Eventos/Voluntariado.jpg";
import "../../styles/Credencial/credencial.css";
import BotonRegresar from "../../components/Dashboard/BotonRegresar";


const GestionCredenciales = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedFicha, setSelectedFicha] = useState(null);
  const [fichasOptions, setFichasOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [evento, setEvento] = useState(null);

  // 🔹 Obtener el evento activo desde `localStorage`
  useEffect(() => {
    const eventoGuardado = localStorage.getItem("eventoActivo");
    if (eventoGuardado) {
      setEvento(JSON.parse(eventoGuardado));
    }
  }, []);

  useEffect(() => {
    const obtenerFichas = async () => {
      if (!evento) return; // Evitar hacer la petición si el evento aún no se ha cargado

      try {
        const response = await fetch("http://localhost:4000/api/credencial/fichas");
        const data = await response.json();

        if (data.hasError) {
          setError("No se pudieron obtener las fichas. Intente más tarde.");
          setLoading(false);
          return;
        }

        if (!data.data || data.data.length === 0) {
          setError("No hay fichas disponibles.");
          setLoading(false);
          return;
        }

        // 🔹 Filtrar fichas para mostrar solo las del evento activo
        const fichasFiltradas = data.data.filter(ficha => ficha.idEvento === evento.id);

        if (fichasFiltradas.length === 0) {
          setError("No hay fichas disponibles para este evento.");
          setLoading(false);
          return;
        }

        // Asignar imágenes locales según el ID de la ficha
        const imagenesFichas = {
          1: Inscripciones,
          2: Delegados,
          3: Voluntariados,
        };

        // Transformar los datos para la UI
        const fichasConDatos = fichasFiltradas.map((ficha) => ({
          id: ficha.idFichaRegistro,
          title: ficha.nombreFicha,
          image: imagenesFichas[ficha.idFichaRegistro] || EventImage6, // Imagen por defecto
          description: ficha.comentarios || "Sin comentarios",
          idEvento: ficha.idEvento,
          activo: ficha.activo ? "Activo" : "Inactivo",
        }));

        setFichasOptions(fichasConDatos);
        setLoading(false);
      } catch (error) {
        setError("Error al conectar con el servidor.");
        setLoading(false);
      }
    };

    obtenerFichas();
  }, [evento]); // 🔹 Ejecutar cuando el evento cambie

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
      <Container>

        <BotonRegresar to="/gestion-evento" text="Regresar" />


        {/* 🔹 Mostrar el nombre y estado del evento */}
        <div className="credenciallisttitle text-center mt-3">

        <h2>
          {evento ? `FICHAS DEL EVENTO :  ${evento.title}` : "Cargando evento..."}
        </h2>
        </div>

        {loading ? (
          <p className="text-center">Cargando fichas...</p>
        ) : error ? (
          <Alert variant="warning" className="text-center">
            {error}
          </Alert>
        ) : (
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
        )}

        {/* Modal con más información */}
        <Modal  show={showModal} onHide={() => setShowModal(false)} centered>
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
  );
};

export default GestionCredenciales;
