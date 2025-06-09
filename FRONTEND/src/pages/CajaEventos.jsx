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
import { mostrarMensajeError } from "../components/Crud/MensajeError";
import ValidatedInput from "../utils/ValidatedInput";
import SubirImagen from '../components/SubirImagen';
import BotonRegresar from "../components/Dashboard/BotonRegresar";

const { Option } = Select;
const { TabPane } = Tabs;

// Constantes para URLs de API
const API_URL = "http://localhost:4000/api";
const EVENTOS_ENDPOINT = `${API_URL}/eventos/eventosActivos`;
const INSERTAR_EVENTO_ENDPOINT = `${API_URL}/eventos/insEventos`;
const ACTUALIZAR_EVENTO_ENDPOINT = `${API_URL}/eventos/updEventos`;

const CajaEventos = () => {
  const [activo, setActivo] = useState(1);  // o null para todos
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNuevoModal, setShowNuevoModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [formNuevo] = Form.useForm();
  const [formEditar] = Form.useForm();

  // Función para mapear datos del evento
  const mapearDatosEvento = (evento) => ({
    id: evento.idEvento,
    idEvento: evento.idEvento,
    title: evento.nombreEvento || "Evento sin nombre",
    image: evento.fotoEvento,
    description: evento.descripcion || "Sin descripción",
    ubicacion: evento.ubicacion,
    fechaInicio: evento.fechaInicio,
    fechaFin: evento.fechaFin,
    activo: evento.activo,
    route: "/gestion-evento",
  });

  const fetchEventos = async () => {
    try {
      setLoading(true);
      let url = `${EVENTOS_ENDPOINT}`;
      if (activo !== null && activo !== undefined) {
        url += `/${activo}`; // pasamos 1 o 0 para activo/inactivo
      }
      const response = await fetch(url, {
        method: "GET",
        credentials: 'include',
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) throw new Error("Error al obtener eventos");

      const data = await response.json();

      if (data.hasError) {
        throw new Error(data.errors?.join(", ") || "Error desconocido");
      }

      setEventos(data.data.map(mapearDatosEvento));
    } catch (err) {
      console.error("Error al obtener eventos:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "past") {
      setActivo(0);  // eventos inactivos
    } else if (tab === "upcoming") {
      setActivo(1);  // eventos activos
    } else {
      setActivo(null); // si tienes otro caso, muestra todos
    }
  };

  useEffect(() => {
    fetchEventos();
  }, [activo]);

  useEffect(() => {
    if (registroSeleccionado && showEditModal) {
      formEditar.setFieldsValue({
        nombre: registroSeleccionado.title,
        descripcion: registroSeleccionado.description,
        ubicacion: registroSeleccionado.ubicacion,
        fechaInicio: registroSeleccionado.fechaInicio ? moment(registroSeleccionado.fechaInicio) : null,
        fechaFin: registroSeleccionado.fechaFin ? moment(registroSeleccionado.fechaFin) : null,
        activo: registroSeleccionado.activo,
        fotoEvento: registroSeleccionado.image || null,
      });
    }
  }, [registroSeleccionado, showEditModal]);

  const seleccionarEvento = (evento) => {
    localStorage.setItem("eventoActivo", JSON.stringify(evento));
    navigate("/gestion-evento");
  };

  const handleNuevoRegistro = () => setShowNuevoModal(true);

  const handleEdit = (id) => {
    const registro = eventos.find((d) => d.id === id);
    setRegistroSeleccionado({ ...registro });
    setShowEditModal(true);
  };

  const handleDetails = (id) => {
    const registro = eventos.find((d) => d.id === id);
    setRegistroSeleccionado(registro);
    setShowDetailsModal(true);
  };

  const handleCerrarEditModal = () => {
    setShowEditModal(false);
    setRegistroSeleccionado(null);
    formEditar.resetFields();
  };

  const handleCerrarNuevoModal = () => {
    setShowNuevoModal(false);
    formNuevo.resetFields();
  };

  const handleGuardarEvento = async (values, esEdicion = false) => {
    try {
      const eventoData = {
        nombre: values.nombre,
        descripcion: values.descripcion,
        ubicacion: values.ubicacion,
        fechaInicio: values.fechaInicio?.format('YYYY-MM-DD') || null,
        fechaFin: values.fechaFin?.format('YYYY-MM-DD') || null,
        activo: esEdicion ? values.activo : 1,
        fotoEvento: values.fotoEvento || null,
        idObjeto: 1
      };

      if (esEdicion) {
        eventoData.idEvento = registroSeleccionado.idEvento;
      }

      const endpoint = esEdicion ? ACTUALIZAR_EVENTO_ENDPOINT : INSERTAR_EVENTO_ENDPOINT;
      const method = esEdicion ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventoData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors?.[0] || `Error al ${esEdicion ? 'actualizar' : 'registrar'} el evento`);
      }

      fetchEventos();
      esEdicion ? setShowEditModal(false) : setShowNuevoModal(false);
      formEditar.resetFields();
      formNuevo.resetFields();
      mostrarMensajeExito(`El evento se ha ${esEdicion ? 'actualizado' : 'registrado'} correctamente.`);
    } catch (error) {
      console.error("Error:", error);
      mostrarMensajeError(error.message);
    }
  };

  const handleGuardarNuevo = async () => {
    try {
      const values = await formNuevo.validateFields();
      await handleGuardarEvento(values, false);
    } catch (error) {
      console.error("Error al validar el formulario:", error);
    }
  };

  const handleGuardarEdit = async () => {
    try {
      const values = await formEditar.validateFields();
      await handleGuardarEvento(values, true);
    } catch (error) {
      console.error("Error al validar el formulario de edición:", error);
    }
  };

  const renderFormularioEvento = (form, esEdicion = false) => (
    <Form layout="vertical" form={form}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Datos del Evento" key="1">
          <Row gutter={40}>
            <Col span={13}>
              <ValidatedInput
                label="Nombre del evento"
                name="nombre"
                placeholder="Ingresa el nombre del evento"
                rules={[{ required: true, message: "El nombre del evento es obligatorio" }]}
                allowSpecialChars={true}
                maxLength={100}
              />
            </Col>
            <Col span={11}>
              <ValidatedInput
                label="Ubicación del evento"
                name="ubicacion"
                placeholder="Ingresa la ubicación"
                rules={[{ required: true, message: "La ubicación es obligatoria" }]}
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
                textarea
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
                <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Fecha Final"
                name="fechaFin"
                rules={[{ required: true, message: "La fecha final es obligatoria" }]}
              >
                <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={40}>
            <Col span={10}>
              <Form.Item label="Imagen del Evento" name="fotoEvento">
                <SubirImagen
                  onImagenSubida={(url) => form.setFieldsValue({ fotoEvento: url })}
                  imagenActual={esEdicion ? registroSeleccionado?.image : null}
                  form={form}
                  key={esEdicion ? 'edit' : 'new'}
                />
              </Form.Item>
            </Col>

            {esEdicion && (
              <Col span={10}>
                <Form.Item
                  name="activo"
                  valuePropName="checked"
                  rules={[{ required: true, message: "Debes seleccionar si el evento está activo" }]}
                >
                  <Checkbox>Evento activo</Checkbox>
                </Form.Item>
              </Col>
            )}
          </Row>
        </TabPane>
      </Tabs>
    </Form>
  );

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
              onClick={() => handleTabChange("past")}
            >
              Pasados
            </button>
            <button
              className={`eventtab ${activeTab === "upcoming" ? "active" : ""}`}
              onClick={() => handleTabChange("upcoming")}
            >
              Próximos
            </button>
            <button className="eventtab" onClick={handleNuevoRegistro}>
              Nuevo
            </button>
          </div>

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
                        style={{ marginTop: '10px', marginRight: '10px' }}
                        className="eventicon"
                        onClick={() => handleDetails(evento.id)}
                      />
                      <FaCog
                        style={{ marginTop: '10px', marginRight: '5px' }}
                        className="eventicon"
                        onClick={() => handleEdit(evento.id)}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <ModalNuevo
          show={showNuevoModal}
          onHide={handleCerrarNuevoModal}
          titulo="Nuevo Evento"
          onGuardar={handleGuardarNuevo}
          form={formNuevo}
          width={800}
        >
          {renderFormularioEvento(formNuevo)}
        </ModalNuevo>

        <ModalEditar
          show={showEditModal}
          onHide={handleCerrarEditModal}
          titulo="Editar Evento"
          onGuardar={handleGuardarEdit}
          form={formEditar}
          registroSeleccionado={registroSeleccionado}
          width={800}
        >
          {renderFormularioEvento(formEditar, true)}
        </ModalEditar>

        <ModalDetalles
          show={showDetailsModal}
          onHide={() => setShowDetailsModal(false)}
          titulo="Detalles del Evento"
          detalles={registroSeleccionado || {}}
          width={800}
          tipo="evento"
        />
      </Container>
    </section>
  );
};

export default CajaEventos;