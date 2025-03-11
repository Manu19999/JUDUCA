import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Tabla from "../../components/Crud/Tabla.jsx";
import Nav from "../../components/Dashboard/navDashboard.jsx";
import { FaIdBadge, FaArrowLeft } from "react-icons/fa";
import ModalNuevo from "../../components/Crud/Modal/ModalNuevo.jsx";
import { mostrarMensajeExito } from "../../components/Crud/MensajeExito.jsx";
import { Input, Select, Form, Row, Col, Spin, Alert } from "antd";
import { Container, Modal, Button } from "react-bootstrap";

import "../../styles/Credencial/credencial.css";


const { Option } = Select;

function CrearCredenciales() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedFicha } = location.state || {}; // Recibir la ficha seleccionada

  const [fichaActual, setFichaActual] = useState(null);
  const [participantes, setParticipantes] = useState([]); // Participantes disponibles
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Control del modal
  const [participanteSeleccionado, setParticipanteSeleccionado] = useState(null); // Participante seleccionado

  const [form] = Form.useForm(); // Formulario Ant Design

  // Validar si la ficha seleccionada está presente
  useEffect(() => {
    if (selectedFicha) {
      setFichaActual(selectedFicha);
      cargarParticipantes(selectedFicha.idEvento, selectedFicha.id); // Cargar participantes
    } else {
      alert("No se ha seleccionado una ficha.");
      navigate("/credencialView"); // Redirigir si no hay ficha seleccionada
    }
  }, [selectedFicha, navigate]);

  // 🔹 Cargar participantes desde la API
  const cargarParticipantes = async (idEvento, idFichaRegistro) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/credencial/participantes/${idEvento}/${idFichaRegistro}`
      );
      const data = await response.json();

      if (data.hasError) {
        throw new Error(data.errors.join(", "));
      }

      setParticipantes(data.data); // Guardar los participantes en el estado
    } catch (err) {
      console.error("Error al obtener participantes:", err.message);
      setError("No se pudieron cargar los participantes.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Abrir el modal y seleccionar participante
  const handleAsignarCredencial = (id) => {
    const participante = participantes.find((p) => p.idRegistroParticipanteEvento === id);
    if (participante) {
      setParticipanteSeleccionado(participante);
      setShowModal(true);
      form.setFieldsValue({
        nombre: participante.nombreParticipante,
        tipoAcceso: "",
        fechaEmision: "",
        fechaVencimiento: "",
        activo: true,
      });
    }
  };

  // 🔹 Guardar la credencial en la base de datos
  const handleGuardarCredencial = async () => {
    try {
      const values = await form.validateFields();
      const credencial = {
        idEvento: fichaActual.idEvento,
        idRegistroParticipanteEvento: participanteSeleccionado.idRegistroParticipanteEvento,
        tipoAcceso: values.tipoAcceso,
        fechaEmision: values.fechaEmision,
        fechaVencimiento: values.fechaVencimiento,
        activo: values.activo,
      };

      const response = await fetch("http://localhost:4000/api/credencial/asignar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credencial),
      });

      const data = await response.json();

      if (data.hasError) {
        throw new Error(data.errors.join(", "));
      }

      mostrarMensajeExito("Credencial asignada correctamente.");
      setShowModal(false);
      cargarParticipantes(fichaActual.idEvento, fichaActual.id); // Recargar la tabla
    } catch (err) {
      console.error("Error al asignar credencial:", err.message);
    }
  };

  return (
    <div className="crud">
      <Nav />

      <Button
          variant="outline-warning"
          onClick={() => navigate("/gestion-evento")}
          className="d-flex align-items-center gap-2"
          style={{ marginTop: "30px" }}
        >
          <FaArrowLeft size={20} /> Regresar
        </Button>


      {fichaActual && (
        <div className="credenciallisttitle" style={{ textAlign: "center", marginTop: "20px" }}>
          <h2>Gestión de Credenciales para: {fichaActual.title}</h2>
          <p>{fichaActual.description}</p>
        </div>
      )}

      {/* 🔹 Mostrar estado de carga o error */}
      {loading ? (
        <div className="text-center">
          <Spin size="large" />
          <p>Cargando participantes...</p>
        </div>
      ) : error ? (
        <Alert message={error} type="error" className="text-center" />
      ) : (
        <Tabla
          columnas={[
            { nombre: "#", campo: "idRegistroParticipanteEvento", ancho: "5%" },
            { nombre: "Nombre", campo: "nombreParticipante", ancho: "30%" },
            { nombre: "Estado", campo: "estado", ancho: "20%" },
            { nombre: "Fecha Registro", campo: "fechaRegistro", ancho: "20%" },
            { nombre: "Acción", campo: "accion", ancho: "20%" },
          ]}
          datos={participantes}
          titulo="Gestión de credenciales"
          icono={<FaIdBadge className="icono-titulo" />}
          onEdit={handleAsignarCredencial} // Seleccionar persona para asignar credencial
        />
      )}

      {/* 🔹 Modal para Asignar Credencial */}
      <ModalNuevo
        show={showModal}
        onHide={() => setShowModal(false)}
        titulo="Asignar Credencial"
        onGuardar={handleGuardarCredencial}
        form={form}
      >
        <Form layout="vertical" form={form}>
          <Row gutter={15}>
            <Col span={24}>
              <Form.Item label="Nombre del Participante" name="nombre">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col span={12}>
              <Form.Item
                label="Tipo de Acceso"
                name="tipoAcceso"
                rules={[{ required: true, message: "Seleccione un tipo de acceso" }]}
              >
                <Select placeholder="Selecciona un tipo de acceso">
                  <Option value="ATLETA">ATLETA</Option>
                  <Option value="ENTRENADOR">ENTRENADOR</Option>
                  <Option value="AUTORIDAD">AUTORIDAD</Option>
                  <Option value="VOLUNTARIO">VOLUNTARIO</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Fecha de Emisión" name="fechaEmision">
                <Input type="date" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Fecha de Vencimiento" name="fechaVencimiento">
                <Input type="date" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </ModalNuevo>
    </div>
  );
}

export default CrearCredenciales;
