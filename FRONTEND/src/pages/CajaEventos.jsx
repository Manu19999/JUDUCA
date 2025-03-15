import React, { useState } from "react";
import { Container, Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEye, FaCog } from "react-icons/fa";
import { useDropzone } from "react-dropzone";

import Nav from "../components/Dashboard/navDashboard";

import JUDUCA from "../assets/Eventos/JUDUCA.jpg";
import FUCAIN from "../assets/Eventos/FUCAIN.jpg";
import DANZA from "../assets/Eventos/DANZA.jpg";

import "../styles/Inicio/Caja-seguridad.css";
import "../styles/Evento/Eventos.css";

const CajaEventos = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Modal para crear evento
  const [isViewModalOpen, setIsViewModalOpen] = useState(false); // Modal para ver detalles
  const [selectedEvent, setSelectedEvent] = useState(null); // Evento seleccionado para ver detalles
  const [event, setEvent] = useState({
    name: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [foto, setFoto] = useState(null);
  const [previewFoto, setPreviewFoto] = useState(null);

const items = [
  {
    id: 1,
    title: "JUDUCA",
    image: JUDUCA,
    description: "Juegos Deportivos Universitarios Centroamericanos.",
    route: "/gestion-evento",
    fechaInicio: "2023-10-01",
    fechaFin: "2023-10-10",
    ubicacion: "UNAH, Honduras",
    estado: "Activo",
    fechaCreacion: "2025-09-01",
    fechaActualizacion: "2025-09-15",
  },
  {
    id: 2,
    title: "FUCAIN",
    image: FUCAIN,
    description: "Juegos deportivos JUCAIN.",
    route: "/gestion-evento",
    fechaInicio: "2023-11-15",
    fechaFin: "2023-11-20",
    ubicacion: "Managua, Nicaragua",
    estado: "Activo",
    fechaCreacion: "2025-10-01",
    fechaActualizacion: "2025-11-01",
  },
  {
    id: 3,
    title: "DANZA",
    image: DANZA,
    description: "Danza folclórica universitaria.",
    route: "/gestion-evento",
    fechaInicio: "2023-12-05",
    fechaFin: "2023-12-10",
    ubicacion: "Tegucigalpa, Honduras",
    estado: "Activo",
    fechaCreacion: "2025-11-01",
    fechaActualizacion: "2025-11-15",
  },
];


  const handleImageClick = (route) => {
    navigate(route);
  };

  const handleViewClick = (event) => {
    setSelectedEvent(event);
    setIsViewModalOpen(true); // Abre el modal de detalles
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFoto(file);
    setPreviewFoto(URL.createObjectURL(file));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: "image/*",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Evento guardado:", { ...event, foto });
    setIsCreateModalOpen(false);
    setEvent({
      name: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    setFoto(null);
    setPreviewFoto(null);
  };

  return (
    <section id="caja-seguridad" className="caja-seguridad-container">
      <Container>
        <Nav />

        <div className="crud">
          <Button
            variant="outline-warning"
            onClick={() => navigate("/dashboard")}
            className="d-flex align-items-center gap-2"
            style={{ marginTrim: "80px" }}
          >
            <FaArrowLeft size={20} /> Regresar
          </Button>

          <h2 className="caja-seguridad-title">Gestión de Eventos</h2>

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
            <button
              className="eventtab"
              onClick={() => setIsCreateModalOpen(true)}
            >
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
                <div className="eventicons">
                  <FaEye
                    onClick={() => handleViewClick(item)}
                    className="eventicon manage-btn-credencial"
                    style={{ cursor: "pointer" }}
                  />
                  <FaCog
                    onClick={() => navigate("/control-eventos")}
                    className="eventicon manage-btn-credencial"
                    style={{ cursor: "pointer", marginLeft: "10px" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Modal para crear evento */}
      <Modal
        show={isCreateModalOpen}
        onHide={() => setIsCreateModalOpen(false)}
        centered
      >
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

              <Form.Group controlId="eventPhoto">
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
                  <p>Arrastra una foto aquí o haz clic para seleccionar</p>
                </div>

                {previewFoto && (
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

              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setIsCreateModalOpen(false)}
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

      {/* Modal para ver detalles del evento */}
      <Modal
        show={isViewModalOpen}
        onHide={() => setIsViewModalOpen(false)}
        centered
      >
        <div
          style={{
            backgroundColor: "#e3f2fd",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Detalles del Evento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedEvent && (
              <div>
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "20px",
                  }}
                />
                <h3>{selectedEvent.title}</h3>
                <p>{selectedEvent.description}</p>
                <p>
                  <strong>Fecha de inicio:</strong> {selectedEvent.fechaInicio}
                </p>
                <p>
                  <strong>Fecha de fin:</strong> {selectedEvent.fechaFin}
                </p>
                <p>
                  <strong>Ubicación:</strong> {selectedEvent.ubicacion}
                </p>
                <p>
                  <strong>Estado:</strong> {selectedEvent.estado}
                </p>
                <p>
                  <strong>Fecha de creación:</strong>{" "}
                  {selectedEvent.fechaCreacion}
                </p>
                <p>
                  <strong>Fecha de actualización:</strong>{" "}
                  {selectedEvent.fechaActualizacion}
                </p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setIsViewModalOpen(false)}
            >
              Cerrar
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </section>
  );
};

export default CajaEventos;
