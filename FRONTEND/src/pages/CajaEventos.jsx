import React, { useState, useEffect } from "react";
import { Container, Modal, Spinner } from "react-bootstrap";
import { Input, Select, Form, Card, Row, Col, DatePicker, Tabs, Button, Checkbox } from 'antd';
import { useNavigate } from "react-router-dom";
import { FaEye, FaCog } from "react-icons/fa";
import moment from "moment";

import Nav from "../components/Dashboard/navDashboard";
import "../styles/Inicio/Caja-seguridad.css";
import "../styles/Evento/Eventos.css";
import ModalNuevo from "../components/Crud/Modal/ModalNuevo";
import ModalEditar from "../components/Crud/Modal/ModalEditar";
import ModalDetalles from "../components/Crud/Modal/ModalDetalles";
import { mostrarMensajeExito } from "../components/Crud/MensajeExito";
import { mostrarMensajeError } from "../components/Crud/MensajeError"; // Importar el componente de mensaje de error
import ValidatedInput from "../utils/ValidatedInput";
import SubirImagen from '../components/SubirImagen';
const { Option } = Select;
const { TabPane } = Tabs;
import BotonRegresar from "../components/Dashboard/BotonRegresar";


const CajaEventos = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Estados para controlar la visibilidad de los modales
  const [showNuevoModal, setShowNuevoModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  // Estado para almacenar el usuario seleccionado (para editar, eliminar o ver detalles)
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  // Hooks de Ant Design para gestionar formularios
  const [formNuevo] = Form.useForm(); // Formulario para el modal de nuevo registro
  const [formEditar] = Form.useForm(); // Formulario para el modal de edición



  const fetchEventos = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/credencial/", {
        method: "GET",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        }
      });

      const data = await response.json();
      console.log("Datos de eventos recibidos:", data);

      if (data.hasError) {
        throw new Error(data.errors.join(", "));
      }

      const eventosConDatos = data.data.map((evento) => ({
        id: evento.idEvento,
        idEvento: evento.idEvento, // incluye el idEvento original por si lo necesitas más adelante
        title: evento.nombreEvento || "Evento sin nombre",
        image: evento.fotoEvento,
        description: evento.descripcion || "Sin descripción",
        ubicacion: evento.ubicacion,
        FechaInicio: evento.fechaInicio,
        FechaFin: evento.fechaFin,
        Activo: evento.activo,
        route: "/gestion-evento",
      }));

      setEventos(eventosConDatos);
    } catch (err) {
      console.error("Error al obtener eventos:", err.message);
      setError("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  // Luego en el useEffect solo la llamas:
  useEffect(() => {
    fetchEventos();
  }, []);

  useEffect(() => {
  if (registroSeleccionado && showEditModal) {
    formEditar.setFieldsValue({
      nombre: registroSeleccionado.title,
      descripcion: registroSeleccionado.description,
      ubicacion: registroSeleccionado.ubicacion, // si tienes este campo
      fechaInicio: registroSeleccionado.FechaInicio ? moment(registroSeleccionado.fechaInicio) : null,
      fechaFin: registroSeleccionado.FechaFin ? moment(registroSeleccionado.fechaFin) : null,
      activo: registroSeleccionado.Activo,
      fotoEvento: registroSeleccionado.image || null,
    });
  }
}, [registroSeleccionado, showEditModal]);

  const seleccionarEvento = (evento) => {
    localStorage.setItem("eventoActivo", JSON.stringify(evento)); // Guardar evento en localStorage
    navigate("/gestion-evento");
  };


  // Abrir modal de nuevo registro
  const handleNuevoRegistro = () => {
    setShowNuevoModal(true);
  };

  // Abrir modal de edición
  const handleEdit = (id) => {
    const registro = eventos.find((d) => d.id === id);
    setRegistroSeleccionado({
      ...registro
    });
    setShowEditModal(true);
  };

  // Abrir modal de detalles
  const handleDetails = (id) => {
    const registro = eventos.find((d) => d.id === id);
    setRegistroSeleccionado(registro);
    setShowDetailsModal(true);
  };

  // Cerrar el modal de edición y reiniciar el formulario
  const handleCerrarEditModal = () => {
    setShowEditModal(false);
    setRegistroSeleccionado(null); // Limpiar el registro seleccionado
    formEditar.resetFields(); // Reiniciar el formulario
  };

  const handleCerrarNuevoModal = () => {
    setShowNuevoModal(false);
    formNuevo.resetFields(); // Esto limpiará todos los campos del formulario
  };



  // Guardar nuevo registro de usuario
  const handleGuardarNuevo = async () => {
    formNuevo.validateFields()
      .then(async (values) => {
        try {
          // Preparar los datos del evento
          const eventoData = {
            nombre: values.nombre,
            descripcion: values.descripcion,
            ubicacion: values.ubicacion,
            fechaInicio: values.fechaInicio ? values.fechaInicio.format('YYYY-MM-DD') : null,
            fechaFin: values.fechaFin ? values.fechaFin.format('YYYY-MM-DD') : null,
            activo: 1,
            fotoEvento: values.fotoEvento || null,
            idObjeto: 1 // ID del objeto para auditoría si aplica
          };
          console.log(eventoData)

          const response = await fetch("http://localhost:4000/api/eventos/insEventos", {
            method: "POST",
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(eventoData),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.errors?.[0] || "Error al registrar el evento");
          }

          fetchEventos();
          setShowNuevoModal(false);
          formNuevo.resetFields();
          mostrarMensajeExito("El evento se ha registrado correctamente.");
        } catch (error) {
          console.error("Error:", error);
          mostrarMensajeError(error.message);
        }
      })
      .catch((error) => {
        console.error("Error al validar el formulario:", error);
      });
  };

  const handleGuardarEdit = async () => {
    formEditar.validateFields()
      .then(async (values) => {
        try {
          const eventoData = {
            idEvento: registroSeleccionado.idEvento, // Asegúrate que este campo esté presente
            nombre: values.nombre,
            descripcion: values.descripcion,
            ubicacion: values.ubicacion,
            fechaInicio: values.fechaInicio ? values.fechaInicio.format('YYYY-MM-DD') : null,
            fechaFin: values.fechaFin ? values.fechaFin.format('YYYY-MM-DD') : null,
            activo: values.activo, // O podrías permitir editar este campo también si es necesario
            fotoEvento: values.fotoEvento || null,
            idObjeto: 1 // El mismo ID del objeto para auditoría
          };

          const response = await fetch("http://localhost:4000/api/eventos/updEventos", {
            method: "PUT",
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(eventoData),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.errors?.[0] || "Error al actualizar el evento");
          }

          fetchEventos(); // Recarga la lista de eventos
          setShowEditModal(false); // Cierra el modal
          formEditar.resetFields(); // Limpia el formulario
          mostrarMensajeExito("El evento se ha actualizado correctamente.");
        } catch (error) {
          console.error("Error:", error);
          mostrarMensajeError(error.message);
        }
      })
      .catch((error) => {
        console.error("Error al validar el formulario de edición:", error);
      });
  };

  const handleMantenimientoEvento = () => {
    navigate("/MantenimientoEventos", {
    });
  };

  return (
    <section id="caja-seguridad" className="caja-seguridad-container">
      <Container>
        <Nav />

        <div className="espaciotexto">
          <BotonRegresar to="/dashboard" text="Regresar" />
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
            <button className="eventtab" onClick={() => handleNuevoRegistro()}>
              Nuevo
            </button>
          </div>

          {/* Tarjetas de eventos */}
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
              <p>Cargando eventos...</p>
            </div>
          ) : error ? (
            <p className="text-center text-danger">{error}</p>
          ) : (
            <div className="caja-seguridad-grid">
              {eventos.length === 0 ? (
                <p className="text-center">No hay eventos disponibles.</p>
              ) : (
                eventos.map((evento) => (
                  <div key={evento.idEvento} className="caja-seguridad-card">
                    <div className="caja-seguridad-image-container">
                      <img
                        src={evento.image}
                        alt={evento.title}
                        className="caja-seguridad-image"
                        onClick={() => seleccionarEvento(evento)}
                      />
                    </div>
                    <h3>{evento.title}</h3>
                    <p className="card-seguridad-description">{evento.description}</p>
                    <div className="eventicons">
                      <FaEye
                        className="eventicon"
                        onClick={() => handleDetails(evento.id)} // Pasas el objeto completo
                      />

                      <FaCog className="eventicon"
                        onClick={() => handleEdit(evento.id)} />
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <ModalNuevo
          show={showNuevoModal} // Controla la visibilidad del modal
          onHide={handleCerrarNuevoModal} // Función para cerrar el modal
          titulo="Nuevo Evento" // Título del modal
          onGuardar={handleGuardarNuevo} // Función para guardar el nuevo registro
          form={formNuevo} // Pasar el formulario al modal
          width={800} // Ancho del modal
        >
          <Form layout="vertical" form={formNuevo}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Datos del Evento" key="1">
                <Row gutter={40}>
                  <Col span={13}>
                    <ValidatedInput
                      label="Nombre del evento"
                      name="nombre"
                      placeholder="Ingresa el nombre del evento"
                      rules={[{ required: true, message: "El nombre del evento es obligatorio" }]}
                      allowSpecialChars={true}  // Según si permites o no
                      maxLength={100}
                    />
                  </Col>

                  <Col span={11}>
                    <ValidatedInput
                      label="Ubicacion del evento"
                      name="ubicacion"
                      placeholder="Ingresa la ubicacion"
                      rules={[{ required: true, message: "La ubicacion es obligatoria" }]}
                      allowSpecialChars={true}
                      maxLength={100}
                    />
                  </Col>
                </Row>

                <Row gutter={40}>
                  <Col span={24}>
                    <ValidatedInput
                      label="Descripción del evento"
                      name="descripcion"
                      placeholder="Ingresa la descripción"
                      rules={[{ required: true, message: "La descripción es obligatoria" }]}
                      allowSpecialChars={true}
                      maxLength={500}
                      textarea  // Si tu ValidatedInput soporta textarea
                    />
                  </Col>
                </Row>

                <Row gutter={40}>
                  <Col span={12}>
                    <Form.Item
                      label="Fecha de Inicio"
                      name="fechaInicio"
                      rules={[{ required: true, message: "La fecha de inicio es obligatoria" }]}
                    >
                      <DatePicker format="YYYY-MM-DD" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Fecha Final"
                      name="fechaFin"
                      rules={[{ required: true, message: "La fecha final es obligatoria" }]}
                    >
                      <DatePicker format="YYYY-MM-DD" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={40}>
                  <Col span={10}>
                    <Form.Item label="Imagen del Evento" name="fotoEvento">
                      <SubirImagen
                        onImagenSubida={(url) => formNuevo.setFieldsValue({ fotoEvento: url })}
                        imagenActual={null}
                        form={formNuevo}
                        key={showNuevoModal ? 'open' : 'closed'}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </Form>
        </ModalNuevo>


        {/* Modal para Editar Registro */}
        <ModalEditar
          show={showEditModal}
          onHide={handleCerrarEditModal}
          titulo="Editar Evento"
          onGuardar={handleGuardarEdit}
          form={formEditar}
          registroSeleccionado={registroSeleccionado}
          width={800}
        >
          <Form
            layout="vertical"
            form={formEditar}
            initialValues={{ ...registroSeleccionado }}
          >
            <Tabs defaultActiveKey="1">
              <TabPane tab="Datos del Evento" key="1">
                <Row gutter={40}>
                  <Col span={13}>
                    <ValidatedInput
                      label="Nombre del evento"
                      name="nombre"
                      placeholder="Ingresa el nombre del evento"
                      rules={[{ required: true, message: "El nombre del evento es obligatorio" }]}
                      allowSpecialChars={true}  // Según si permites o no
                      maxLength={100}
                    />
                  </Col>

                  <Col span={11}>
                    <ValidatedInput
                      label="Ubicacion del evento"
                      name="ubicacion"
                      placeholder="Ingresa la ubicacion"
                      rules={[{ required: true, message: "La ubicacion es obligatoria" }]}
                      allowSpecialChars={true}
                      maxLength={100}
                    />
                  </Col>
                </Row>

                <Row gutter={40}>
                  <Col span={24}>
                    <ValidatedInput
                      label="Descripción del evento"
                      name="descripcion"
                      placeholder="Ingresa la descripción"
                      rules={[{ required: true, message: "La descripción es obligatoria" }]}
                      allowSpecialChars={true}
                      maxLength={500}
                      textarea  // Si tu ValidatedInput soporta textarea
                    />
                  </Col>
                </Row>

                <Row gutter={40}>
                  <Col span={12}>
                    <Form.Item
                      label="Fecha de Inicio"
                      name="fechaInicio"
                      rules={[{ required: true, message: "La fecha de inicio es obligatoria" }]}
                    >
                      <DatePicker format="YYYY-MM-DD" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Fecha Final"
                      name="fechaFin"
                      rules={[{ required: true, message: "La fecha final es obligatoria" }]}
                    >
                      <DatePicker format="YYYY-MM-DD" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={40}>
                  <Col span={10}>
                    <Form.Item label="Imagen del Evento" name="fotoEvento">
                      <SubirImagen
                        onImagenSubida={(url) => formEditar.setFieldsValue({ fotoEvento: url })}
                        imagenActual={registroSeleccionado?.fotoEvento}
                        form={formEditar}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={10}>
                    <Form.Item
                      name="activo"
                      valuePropName="checked"
                      rules={[{ required: true, message: "Debes seleccionar si el evento está activo" }]}
                    >
                      <Checkbox>Evento activo</Checkbox>
                    </Form.Item>
                  </Col>

                </Row>
              </TabPane>
            </Tabs>

          </Form>
        </ModalEditar>


        {/* Modal para detalles */}
        <ModalDetalles
          show={showDetailsModal}
          onHide={() => setShowDetailsModal(false)}
          titulo="Detalles del Evento"
          detalles={registroSeleccionado || {}}
          width={800}
          tipo="evento" // <-- esta línea es clave
        />

      </Container>
    </section>





  );
};

export default CajaEventos;
