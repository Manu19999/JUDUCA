import React, { useState } from "react";
import { Container, Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEye, FaCog } from "react-icons/fa";
import { useDropzone } from "react-dropzone";

import Nav from "../components/Dashboard/navDashboard";

import Inscripciones from "../assets/Eventos/Inscripciones.jpg";;
import Delegados from "../assets/Eventos/Delegados.jpg";
import Voluntariados from "../assets/Eventos/Voluntariado.jpg";
import Otras from "../assets/Eventos/otras.jpg";


import "../styles/Inicio/Caja-seguridad.css";
import "../styles/Evento/Eventos.css";

const CajaFichas = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nombreFicha, setNombreFicha] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [foto, setFoto] = useState(null);

  const fichas = [
    {
      id: 1,
      title: "Inscripción componente académico JUDUCA",
      image: Inscripciones,
      description: "Ficha para inscribir a los participantes al evento.",
      route: "/Formulario-fichas",
    },
    {
      id: 2,
      title: "Inscripción de delegados",
      image: Delegados,
      description: "Inscripción de los delegados de las universidades.",
      route: "/Formulario-fichas",
    },
    {
      id: 3,
      title: "Inscripción de voluntariado",
      image: Voluntariados,
      description: "Inscripción de los voluntariados al evento.",
      route: "/Formulario-fichas",
    },
    {
      id: 3,
      title: "Otras fichas",
      image: Otras,
      description: "Inscripción o registro de otras fichas.",
      route: "/Formulario-fichas",
    },
    {
      id: 3,
      title: "Otras fichas",
      image: Otras,
      description: "Inscripción o registro de otras fichas.",
      route: "/Formulario-fichas",
    },
    {
      id: 3,
      title: "Otras fichas",
      image: Otras,
      description: "Inscripción o registro de otras fichas.",
      route: "/Formulario-fichas",
    },
    {
      id: 3,
      title: "Otras fichas",
      image: Otras,
      description: "Inscripción o registro de otras fichas.",
      route: "/Formulario-fichas",
    },
  ];

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
            style={{ margin: "20px 0" }}
          >
            <FaArrowLeft size={20} /> Regresar
          </Button>

          <h2 className="caja-seguridad-title">Gestión de Fichas</h2>

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

          <div className="caja-seguridad-grid">
            {fichas.map((item) => (
              <div key={item.id} className="caja-seguridad-card">
                <img
                  src={item.image}
                  alt={item.title}
                  className="caja-seguridad-image"
                  onClick={() => navigate(item.route)}
                />
                <h3>{item.title}</h3>
                <p className="eventdescription">{item.description}</p>
                <div className="eventicons">
                  <FaEye
                    onClick={() => navigate("/ficha-participantes")}
                    className="eventicon manage-btn-credencial"
                    style={{ marginBottom: "10px", cursor: "pointer" }}
                  />
                  <FaCog
                    onClick={() => navigate("/Formulario-fichas")}
                    className="eventicon manage-btn-credencial"
                    style={{
                      marginBottom: "10px",
                      marginInline: "10px",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
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
            <Form>
              <Form.Group controlId="formFichaNombre">
                <Form.Label>Nombre de la Ficha</Form.Label>
                <Form.Control
                  type="text"
                  value={nombreFicha}
                  onChange={(e) => setNombreFicha(e.target.value)}
                  placeholder="Ingrese el nombre de la ficha"
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
                  <div>
                    <p>
                      <strong>Foto seleccionada:</strong>
                    </p>
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
                  </div>
                )}
              </Form.Group>
            </Form>
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
