import React, { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Input, Select, Form, Card, Row, Col, DatePicker, Tabs, Button, Checkbox } from 'antd';
import { FaEye, FaCog } from "react-icons/fa";
import moment from "moment";
import EventImage6 from "../assets/Credencial.jpg";

import Nav from "../components/Dashboard/navDashboard";
import "../styles/Inicio/Caja-seguridad.css";
import ModalNuevo from "../components/Crud/Modal/ModalNuevo";
import ModalEditar from "../components/Crud/Modal/ModalEditar";
import ModalDetalles from "../components/Crud/Modal/ModalDetalles";
import { mostrarMensajeExito } from "../components/Crud/MensajeExito";
import { mostrarMensajeError } from "../components/Crud/MensajeError";
import ValidatedInput from "../utils/ValidatedInput";
import SubirImagen from '../components/SubirImagen';
import BotonRegresar from "../components/Dashboard/BotonRegresar";
import "../styles/Evento/Eventos.css";

const { Option } = Select;
const { TabPane } = Tabs;

// Constantes para URLs de API
const API_URL = "http://localhost:4000/api";
const FICHAS_ENDPOINT = `${API_URL}/fichas/fichasActivas`;
const INSERTAR_FICHAS_ENDPOINT = `${API_URL}/fichas/insFichaRegistros`;
const ACTUALIZAR_FICHAS_ENDPOINT = `${API_URL}/fichas/updFichaRegistros`;


const CajaFichas = () => {
  const navigate = useNavigate();
  const [activo, setActivo] = useState(1);  // o null para todos
  const [selectedFicha, setSelectedFicha] = useState(null);
  const [fichasOptions, setFichasOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [evento, setEvento] = useState(null);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [error, setError] = useState(null);
  const [showNuevoModal, setShowNuevoModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [formNuevo] = Form.useForm();
  const [formEditar] = Form.useForm();
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
      const response = await fetch(FICHAS_ENDPOINT, {
        method: "GET",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        }
      });

      const data = await response.json();

      if (data.hasError || !data.data) {
        setError("No se pudieron obtener las fichas. Intente más tarde.");
        setLoading(false);
        return;
      }

      const fichasFiltradas = data.data.filter(ficha => ficha.idEvento === eventoObj.id);

      const fichasConDatos = fichasFiltradas.map((ficha) => ({
        id: ficha.idFichaRegistro,
        title: ficha.nombreFicha,
        image: ficha.fotoFicha || EventImage6,
        description: ficha.comentarios || "Sin comentarios",
        idEvento: ficha.idEvento,
        activo: ficha.activo ? "Activo" : "Inactivo",
      }));

      setFichasOptions(fichasConDatos);
      setFichas(fichasConDatos);
      setLoading(false);
    } catch (error) {
      setError("Error al conectar con el servidor.");
      setLoading(false);
    }
  };

  const getFilteredFichas = () => {
    return fichasOptions.filter(ficha => {
      if (activeTab === "upcoming") {
        return ficha.activo === "Activo";
      } else {
        return ficha.activo === "Inactivo";
      }
    });
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  useEffect(() => {
    if (registroSeleccionado && showEditModal) {
      formEditar.setFieldsValue({
        nombreFicha: registroSeleccionado.title,
        comentarios: registroSeleccionado.description,
        fotoFicha: registroSeleccionado.image,
        activo: registroSeleccionado.activo === "Activo"
      });
    }
  }, [registroSeleccionado, showEditModal]);



  const handleImageClick = (ficha) => {
    localStorage.setItem("fichaSeleccionada", JSON.stringify(ficha));
    navigate(`/OpcionFicha`, { state: { selectedFicha: ficha } });
  };


  const handleNuevoRegistro = () => setShowNuevoModal(true);

  const handleEdit = (id) => {
    const registro = fichas.find((d) => d.id === id);
    setRegistroSeleccionado({ ...registro });
    setShowEditModal(true);
  };

  const handleDetails = (id) => {
    const registro = fichas.find((d) => d.id === id);
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


  const handleGuardarFicha = async (values, esEdicion = false) => {
    try {
      const fichaData = {
        nombreFicha: values.nombreFicha,
        comentarios: values.comentarios,
        fotoFicha: values.fotoFicha || null,
        activo: esEdicion ? values.activo : 1,
        idEvento: evento?.id || null,
        idObjeto: 1 // ajusta según tu bitácora
      };

      if (esEdicion) {
        fichaData.idFichaRegistro = registroSeleccionado.id;
      }

      const endpoint = esEdicion ? ACTUALIZAR_FICHAS_ENDPOINT : INSERTAR_FICHAS_ENDPOINT;
      const method = esEdicion ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fichaData)
      });

      const data = await response.json();

      if (!response.ok || data.hasError) {
        throw new Error(data.errors?.[0] || `Error al ${esEdicion ? 'actualizar' : 'crear'} ficha`);
      }

      mostrarMensajeExito(`Ficha ${esEdicion ? 'actualizada' : 'registrada'} correctamente`);
      setShowNuevoModal(false);
      setShowEditModal(false);
      formNuevo.resetFields();
      formEditar.resetFields();
      setLoading(true); // puedes volver a cargar fichas si agregas fetch
      await obtenerDatos(); // 🔁 Recarga la pantalla con los datos actualizados

    } catch (error) {
      mostrarMensajeError(error.message);
    }
  };

  const handleGuardarNuevaFicha = async () => {
    try {
      const values = await formNuevo.validateFields();
      await handleGuardarFicha(values, false);
    } catch (error) {
      console.error("Error al validar el formulario:", error);
    }
  };

  const handleGuardarEdicionFicha = async () => {
    try {
      const values = await formEditar.validateFields();
      await handleGuardarFicha(values, true);
    } catch (error) {
      console.error("Error al validar edición:", error);
    }
  };

  const renderFormularioFicha = (form, esEdicion = false) => (
    <Form layout="vertical" form={form}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Datos de la ficha" key="1">
          <Row gutter={20}>
            <Col span={10}>
              <ValidatedInput
                label="Nombre de la Ficha"
                name="nombreFicha"
                placeholder="Nombre de la ficha"
                rules={[{ required: true, message: "El nombre es obligatorio" }]}
                maxLength={100}
              />
            </Col>

            <Col span={14}>
              <ValidatedInput
                label="Comentarios"
                name="comentarios"
                placeholder="Comentarios"
                textarea
                maxLength={300}
              />
            </Col>
          </Row>

          <Row gutter={40}>

            <Col span={10}>
              <Form.Item label="Imagen de la ficha" name="fotoFicha">
                <SubirImagen
                  onImagenSubida={(url) => form.setFieldsValue({ fotoFicha: url })}
                  imagenActual={esEdicion ? registroSeleccionado?.image : null}
                  form={form}
                  key={esEdicion ? 'editFicha' : 'newFicha'}
                />
              </Form.Item>
            </Col>

            {esEdicion && (
              <Col span={10}>
                <Form.Item
                  name="activo"
                  valuePropName="checked"
                >
                  <Checkbox>Ficha activa</Checkbox>
                </Form.Item>
              </Col>
            )}
          </Row>
        </TabPane>
      </Tabs>
    </Form>
  );


  return (
    <Container>
      <Nav />
      <div className="espaciotexto">
        <BotonRegresar to="/gestion-evento" text="Regresar" />
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
          <button className="eventtab" onClick={handleNuevoRegistro}>
            Nuevo
          </button>
        </div>

        {loading ? (
          <p className="text-center">Cargando fichas...</p>
        ) : (
          <div className="caja-seguridad-grid">
            {getFilteredFichas().map((ficha) => (
              <div key={ficha.id} className="caja-seguridad-card">
                <div className="caja-seguridad-image-container">
                  <img
                    src={ficha.image}
                    alt={ficha.title}
                    className="caja-seguridad-image"
                    onClick={() => handleImageClick(ficha)}
                  />
                </div>
                <h3>{ficha.title}</h3>
                <p className="card-seguridad-description">{ficha.description}</p>
                <div className="eventicons">
                  <FaEye
                    style={{ marginTop: '10px', marginRight: '2px' }}
                    className="eventicon"
                    onClick={() => handleDetails(ficha.id)}
                  />
                  <FaCog
                    style={{ marginTop: '10px', marginRight: '5px' }}
                    className="eventicon"
                    onClick={() => handleEdit(ficha.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ModalNuevo
        show={showNuevoModal}
        onHide={handleCerrarNuevoModal}
        titulo="Nueva Ficha"
        onGuardar={handleGuardarNuevaFicha}
        form={formNuevo}
        width={700}
      >
        {renderFormularioFicha(formNuevo)}
      </ModalNuevo>

      <ModalEditar
        show={showEditModal}
        onHide={handleCerrarEditModal}
        titulo="Editar Ficha"
        onGuardar={handleGuardarEdicionFicha}
        form={formEditar}
        registroSeleccionado={registroSeleccionado}
        width={700}
      >
        {renderFormularioFicha(formEditar, true)}
      </ModalEditar>

      <ModalDetalles
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
        titulo="Detalles de la ficha"
        detalles={registroSeleccionado || {}}
        width={800}
        tipo="ficha"
      />

    </Container>

  );
};

export default CajaFichas;

