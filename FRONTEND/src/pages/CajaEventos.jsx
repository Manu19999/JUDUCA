import React, { useState } from "react";
import { Container, Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import Nav from "../components/Dashboard/navDashboard";

import JUDUCA from "../assets/Eventos/JUDUCA.jpg";
import FUCAIN from "../assets/Eventos/FUCAIN.jpg";
import UniversidadesImage from "../assets/Eventos/DANZA.jpg";

import "../styles/Inicio/Caja-seguridad.css";
import "../styles/Evento/Eventos.css";

const CajaEventos = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [event, setEvent] = useState({
    name: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const items = [
    {
      id: 1,
      title: "JUDUCA",
      image: JUDUCA,
      description: "Juegos Deportivos Universitarios Centroamericanos.",
      route: "/gestion-evento",
    },
    {
      id: 2,
      title: "FUCAIN",
      image: FUCAIN,
      description: "Juegos deportivos JUCAIN.",
      route: "/gestion-evento",
    },
    {
      id: 3,
      title: "DANZA",
      image: UniversidadesImage,
      description: "Danza folclórica universitaria.",
      route: "/gestion-evento",
    },
  ];

  const handleImageClick = (route) => {
    navigate(route);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Evento guardado:", event);
    setIsModalOpen(false);
  };

  return (
    <section id="caja-seguridad" className="caja-seguridad-container">
      <Container>
        <Nav />

        {/* Botón de regreso */}
        <div className="crud">
          <Button
            variant="outline-warning"
            onClick={() => navigate("/dashboard")}
            className="d-flex align-items-center gap-2"
            style={{ marginTrim: "80px" }}
          >
            <FaArrowLeft size={20} /> Regresar
          </Button>

          {/* Título */}
          <h2 className="caja-seguridad-title">Gestión de Eventos</h2>

          {/* Botones de tabs */}
          <div className="eventtabs">
            <button
              className={`eventtab ${activeTab === "past" ? "active" : ""}`}
              onClick={() => setActiveTab("past")}
            >
              Pasados
            </button>
            <button
              className={`eventtab ${activeTab === "upcoming" ? "active" : ""}`}
              onClick={() => setActiveTab("upcoming")}
            >
              Próximos
            </button>
            <button className="eventtab" onClick={() => setIsModalOpen(true)}>
              Nuevo
            </button>
          </div>

          {/* Tarjetas de eventos */}
          <div className="caja-seguridad-grid">
            {items.map((item) => (
              <div key={item.id} className="caja-seguridad-card">
                <img
                  src={item.image}
                  alt={item.title}
                  className="caja-seguridad-image"
                  onClick={() => handleImageClick(item.route)}
                />
                <h3>{item.title}</h3>
                <p className="eventdescription">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Modal para crear un nuevo evento */}
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} centered>
        <div
          style={{
            backgroundColor: "#e3f2fd",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Crear Evento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="eventName">
                <Form.Label>Nombre del evento</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={event.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="eventLocation">
                <Form.Label>Ubicación</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={event.location}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="eventStartDate">
                <Form.Label>Fecha de inicio</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={event.startDate}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="eventEndDate">
                <Form.Label>Fecha de fin</Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={event.endDate}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="eventDescription">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={event.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cerrar
                </Button>
                <Button variant="primary" type="submit">
                  Guardar
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </div>
      </Modal>
    </section>
  );
};

export default CajaEventos;
