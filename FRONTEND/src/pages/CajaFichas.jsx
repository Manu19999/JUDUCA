import React, { useState, useEffect } from "react";
import { Container, Button, Modal, Spinner, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEye, FaCog } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import Nav from "../components/Dashboard/navDashboard";

const CajaFichas = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fichas, setFichas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nombreFicha, setNombreFicha] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [foto, setFoto] = useState(null);

  const eventoActivo = JSON.parse(localStorage.getItem("eventoActivo"));

  useEffect(() => {
    const fetchFichas = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/fichas/${eventoActivo.id}`
        );
        const data = await response.json();

        if (data.hasError) {
          throw new Error(data.errors.join(", "));
        }

        setFichas(
          data.data.map((ficha) => ({
            id: ficha.idFicha,
            title: ficha.nombreFicha,
            image: ficha.fotoFicha
              ? `data:image/png;base64,${ficha.fotoFicha}`
              : "default_ficha.jpg",
            description: ficha.descripcion,
            route: "/Formulario-fichas",
          }))
        );
      } catch (err) {
        setError("Error al cargar fichas.");
      } finally {
        setLoading(false);
      }
    };

    if (eventoActivo) {
      fetchFichas();
    } else {
      setError("No hay un evento seleccionado.");
      setLoading(false);
    }
  }, []);

  const closeModal = () => setIsModalOpen(false);

  const handleDrop = (acceptedFiles) => {
    setFoto(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: "image/*",
  });

  return (
    <section id="caja-seguridad" className="caja-seguridad-container">
      <Container>
        <Nav />
        <div className="crud">
          <Button
            variant="outline-warning"
            onClick={() => navigate("/dashboard")}
            className="d-flex align-items-center gap-2"
            style={{ marginTop: "20px" }}
          >
            <FaArrowLeft size={20} /> Regresar
          </Button>

          <h2 className="caja-seguridad-title">
            Fichas de {eventoActivo?.title || "Evento"}
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
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
              <p>Cargando fichas...</p>
            </div>
          ) : error ? (
            <p className="text-center text-danger">{error}</p>
          ) : (
            <div className="caja-seguridad-grid">
              {fichas.length === 0 ? (
                <p className="text-center">No hay fichas disponibles.</p>
              ) : (
                fichas.map((ficha) => (
                  <div key={ficha.id} className="caja-seguridad-card">
                    <img
                      src={ficha.image}
                      alt={ficha.title}
                      className="caja-seguridad-image"
                      onClick={() => navigate(ficha.route)}
                    />
                    <h3>{ficha.title}</h3>
                    <p className="eventdescription">{ficha.description}</p>
                    <div className="eventicons">
                      <FaEye
                        className="eventicon"
                        onClick={() => navigate("/ficha-participantes")}
                      />
                      <FaCog
                        className="eventicon"
                        onClick={() => navigate("/Formulario-fichas")}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </Container>

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
    </section>
  );
};

export default CajaFichas;

