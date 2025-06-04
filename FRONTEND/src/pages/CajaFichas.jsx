import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Button, Alert, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TargetaCredencial from "../components/Credencial/targetaCredencial";
import Inscripciones from "../assets/Eventos/Inscripciones.jpg";
import Delegados from "../assets/Eventos/Delegados.jpg";
import Voluntariados from "../assets/Eventos/Voluntariado.jpg";
import { FaArrowLeft, FaEye, FaCog } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import Nav from "../components/Dashboard/navDashboard";
import "../styles/Inicio/Caja-seguridad.css";
import BotonRegresar from "../components/Dashboard/BotonRegresar";
import "../styles/Evento/Eventos.css";


const CajaFichas = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedFicha, setSelectedFicha] = useState(null);
  const [fichasOptions, setFichasOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [evento, setEvento] = useState(null);
  const [activeTab, setActiveTab] = useState("upcoming");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fichas, setFichas] = useState([]);
  const [nombreFicha, setNombreFicha] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [foto, setFoto] = useState(null);

  const eventoActivo = JSON.parse(localStorage.getItem("eventoActivo"));


  // 🔹 Obtener el evento activo desde `localStorage`
  useEffect(() => {
    const eventoGuardado = localStorage.getItem("eventoActivo");
    if (eventoGuardado) {
      setEvento(JSON.parse(eventoGuardado));
    }
  }, []);

  const seleccionarFicha = (ficha) => {
    localStorage.setItem("fichaSeleccionada", JSON.stringify(ficha));
  };

  useEffect(() => {
    const obtenerDatos = async () => {
      const eventoGuardado = localStorage.getItem("eventoActivo");
      if (!eventoGuardado) {
        setError("No se encontró un evento activo en localStorage.");
        setLoading(false);
        return;
      }

      const eventoObj = JSON.parse(eventoGuardado);
      setEvento(eventoObj);

      try {
        const response = await fetch("http://localhost:4000/api/credencial/fichas", {
          method: "GET",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          }
        })

        const data = await response.json();

        if (data.hasError || !data.data) {
          setError("No se pudieron obtener las fichas. Intente más tarde.");
          setLoading(false);
          return;
        }

        const fichasFiltradas = data.data.filter(ficha => ficha.idEvento === eventoObj.id);

        if (fichasFiltradas.length === 0) {
          setError("No hay fichas disponibles para este evento.");
          setLoading(false);
          return;
        }

        const imagenesFichas = {
          1: Inscripciones,
          2: Delegados,
          3: Voluntariados,
        };

        const fichasConDatos = fichasFiltradas.map((ficha) => ({
          id: ficha.idFichaRegistro,
          title: ficha.nombreFicha,
          image: imagenesFichas[ficha.idFichaRegistro] || Inscripciones, // o imagen por defecto
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

    obtenerDatos();
  }, []);


const handleImageClick = (ficha) => {
  localStorage.setItem("fichaSeleccionada", JSON.stringify(ficha));
  navigate(`/OpcionFicha`, { state: { selectedFicha: ficha } });
};


  const handleVerInfo = (ficha) => {
    setSelectedFicha(ficha);
    setShowModal(true);
  };


  const closeModal = () => setIsModalOpen(false);

  const handleDrop = (acceptedFiles) => {
    setFoto(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: "image/*",
  });

  return (
    <Container>
      <Nav />
      <div className="espaciotexto">
        <BotonRegresar to="/gestion-evento" text="Regresar" />
        {/* 🔹 Mostrar el nombre y estado del evento */}
          <h2 className="caja-seguridad-title">
            {evento ? `Fichas del Evento :  ${evento.title}` : "Cargando evento..."}
          </h2>

        <div className="eventtabs">
          <button
            className={`eventtab ${activeTab === "past" ? "active" : ""}`}
            onClick={() => setActiveTab("past")}
          >
            Inactivas
          </button>
          <button
            className={`eventtab ${activeTab === "upcoming" ? "active" : ""}`}
            onClick={() => setActiveTab("upcoming")}
          >
            Activas
          </button>
          <button className="eventtab" onClick={() => setIsModalOpen(true)}>
            Nuevo
          </button>
        </div>

        {loading ? (
          <p className="text-center">Cargando fichas...</p>
        ) : error ? (
          <Alert variant="warning" className="text-center">
            {error}
          </Alert>
        ) : (
          <div className="caja-seguridad-grid">
          {fichasOptions.map((ficha) => (
            <div key={ficha.id} className="caja-seguridad-card" 
            >
              <div className="caja-seguridad-image-container">
                <img
                  src={ficha.image}
                  alt={ficha.title}
                  className="caja-seguridad-image"
                  onClick={() => handleImageClick(ficha.route)}
                />
              </div>
              <h3>{ficha.title}</h3>
              <p className="card-seguridad-description">{ficha.description}</p>
               <div className="eventicons">
               <FaEye className="eventicon" onClick={() => handleVerInfo(ficha)} />
                </div>
            </div>
          ))}
        </div>
        )}
      </div>

      <Modal show={isModalOpen} onHide={closeModal} centered>
        <div
          style={{
            backgroundColor: "#e3f2fd",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Crear Ficha</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formFichaNombre">
              <Form.Label>Nombre de la Ficha</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre de la ficha"
                value={nombreFicha}
                onChange={(e) => setNombreFicha(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formComentario">
              <Form.Label>Comentarios</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comentarios}
                onChange={(e) => setComentarios(e.target.value)}
                placeholder="Escriba sus comentarios"
              />
            </Form.Group>

            <Form.Group controlId="formFoto">
              <Form.Label>Foto</Form.Label>
              <div
                {...getRootProps()}
                style={{
                  border: "2px dashed #007bff",
                  padding: "20px",
                  textAlign: "center",
                  cursor: "pointer",
                  marginBottom: "10px",
                }}
              >
                <input {...getInputProps()} />
                <p>
                  Arrastra y suelta una foto aquí o haz clic para seleccionar
                </p>
              </div>
              {foto && (
                <img
                  src={URL.createObjectURL(foto)}
                  alt="Foto seleccionada"
                  style={{
                    width: "250px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              )}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={closeModal}>
              Cerrar
            </Button>
            <Button variant="primary">Guardar</Button>
          </Modal.Footer>
        </div>
      </Modal>

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

  );
};

export default CajaFichas;

