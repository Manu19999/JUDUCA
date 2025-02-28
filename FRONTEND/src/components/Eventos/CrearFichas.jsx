import React, { useState } from "react";
import { Container, Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import TargetaCredencial from "../Credencial/targetaCredencial";
import { FaArrowLeft } from "react-icons/fa";
import { useDropzone } from "react-dropzone"; // Importamos la librería
import EventImage from "../../assets/FichaInscripcion.jpg"; // Imágenes de demostración
import EventImage2 from "../../assets/Delegados.jpg";
import EventImage3 from "../../assets/Voluntariado.jpg";
import "../../styles/Inicio/EventList.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/Evento/Eventos.css";
/* ************  Componete que nos permite crear fichas a los eventos selccionados ************* */
const CrearFichas = () => {
  const navigate = useNavigate();

  const upcomingEvents = [
    {
      id: 1,
      title: "Inscripción componente académico JUDUCA",
      image: EventImage,
      description: "Ficha para inscribir a los participantes al evento.",
    },
    {
      id: 2,
      title: "Inscripción de delegados",
      image: EventImage2,
      description: "Inscripción de los delegados de las universidades.",
    },
    {
      id: 3,
      title: "Inscripción de voluntariado",
      image: EventImage3,
      description: "Inscripción de los voluntariados al evento.",
    },
  ];

  const [activeTab, setActiveTab] = useState("upcoming");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFicha, setSelectedFicha] = useState(null);
  const [nombreFicha, setNombreFicha] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [foto, setFoto] = useState(null);

  const handleImageClick = (id) => {
    if (id === 1 || id === 2 || id === 3) navigate("/Formulario-fichas");
  };

  const handleEditClick = (id) => {
    console.log(`Editar evento con id ${id}`);
  };

  const handleManageClick = (id) => {
    console.log(`Gestionar evento con id ${id}`);
  };

  const openModal = (ficha) => {
    setSelectedFicha(ficha);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDrop = (acceptedFiles) => {
    setFoto(acceptedFiles[0]);
  };

  // Configuración de Dropzone
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: "image/*",
  });

  // Configuración del carrusel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section id="events" className="eventlist">
      <Container>
        <h2 className="eventlisttitle">Fichas de Registro</h2>
        <div className="eventtabs">
          <button
            className={`eventtab ${activeTab === "upcoming" ? "active" : ""}`}
            onClick={() => setActiveTab("upcoming")}
          >
            Activos
          </button>
          <button
            className={`eventtab ${activeTab === "past" ? "active" : ""}`}
            onClick={() => setActiveTab("past")}
          >
            Inactivos
          </button>
          <button className="eventtab" onClick={() => setIsModalOpen(true)}>
            Nuevo
          </button>
        </div>
        <Slider {...settings}>
          {upcomingEvents.map((event) => (
            <div key={event.id}>
              <TargetaCredencial
                event={event}
                onImageClick={() => handleImageClick(event.id)}
                onEditClick={() => handleEditClick(event.id)}
                onManageClick={() => handleManageClick(event.id)}
                showIcons={true}
              />
            </div>
          ))}
        </Slider>
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
                        width: "150px",
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

export default CrearFichas;
