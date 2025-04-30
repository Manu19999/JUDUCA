import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Tabla from "../../components/Crud/Tabla.jsx";
import Nav from "../../components/Dashboard/navDashboard.jsx";
import { FaIdBadge } from "react-icons/fa";
import ModalNuevo from "../../components/Crud/Modal/ModalNuevo.jsx";
import { mostrarMensajeExito } from "../../components/Crud/MensajeExito.jsx";
import { Input, Select, Form, Row, Col, Spin, Alert } from "antd";
import { Button } from "react-bootstrap";
import BotonRegresar from "../../components/Dashboard/BotonRegresar";
import "../../styles/Credencial/credencial.css";

const { Option } = Select;

function CrearCredenciales() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedFicha } = location.state || {}; // Recibir la ficha seleccionada

  const [fichaActual, setFichaActual] = useState(null);
  const [credenciales, setCredenciales] = useState([]); // Lista de credenciales generadas
  const [participantes, setParticipantes] = useState([]); // Lista de participantes
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Control del modal
  const [participanteSeleccionado, setParticipanteSeleccionado] = useState(null); // Participante seleccionado

  const [form] = Form.useForm(); // Formulario Ant Design

  // ✅ Cargar credenciales y participantes al montar el componente
  useEffect(() => {
    if (selectedFicha) {
      setFichaActual(selectedFicha);
      cargarCredenciales(selectedFicha.idEvento, selectedFicha.id);
      cargarParticipantes(selectedFicha.idEvento, selectedFicha.id);
    } else {
      alert("No se ha seleccionado una ficha.");
      navigate("/credencialView"); // Redirigir si no hay ficha seleccionada
    }
  }, [selectedFicha, navigate]);

  // 🔹 Cargar credenciales desde la API
  const cargarCredenciales = async (idEvento, idFichaRegistro) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:4000/api/credencial/credenciales/${idEvento}/${idFichaRegistro}`
      );
      const data = await response.json();

      if (data.hasError) {
        throw new Error(data.errors.join(", "));
      }

      setCredenciales(data.data); // Guardar las credenciales en el estado
    } catch (err) {
      console.error("Error al obtener credenciales:", err.message);
      setError("No se pudieron cargar las credenciales.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Cargar participantes desde la API
  const cargarParticipantes = async (idEvento, idFichaRegistro) => {
    try {
      setLoading(true);
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
  const handleAbrirModal = () => {
    setShowModal(true);
    form.resetFields();
  };

  // 🔹 Guardar la credencial en la base de datos
  const handleGuardarCredencial = async () => {
    try {
      const values = await form.validateFields();

      if (!participanteSeleccionado) {
        throw new Error("Debe seleccionar un participante.");
      }

      const credencial = {
        idEvento: fichaActual.idEvento,
        idRegistroParticipanteEvento: participanteSeleccionado,
        tipoAcceso: values.tipoAcceso,
        fechaEmision: values.fechaEmision || new Date().toISOString().split("T")[0],
        fechaVencimiento: values.fechaVencimiento || null,
        activo: values.activo ?? true,
        usuarioRegistro: "admin",
        fechaRegistro: new Date().toISOString(),
        idFicha: fichaActual.id,
        idUsuario: 1,
        idObjeto: 1,
      };

      const response = await fetch("http://localhost:4000/api/credencial/insCredencial", {
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
      cargarCredenciales(fichaActual.idEvento, fichaActual.id);
    } catch (err) {
      console.error("Error al asignar credencial:", err.message);
    }
  };

  return (
    <div className="crud">
      <Nav />
      <BotonRegresar to="/credencialView" text="Regresar" />
      

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
          <p>Cargando credenciales...</p>
        </div>
      ) : error ? (
        <Alert message={error} type="error" className="text-center" />
      ) : (
        <Tabla
          columnas={[
            { nombre: "#", campo: "idCredencial", ancho: "5%" },
            { nombre: "Nombre", campo: "nombreParticipante", ancho: "30%" },
            { nombre: "Tipo de Acceso", campo: "tipoAcceso", ancho: "20%" },
            { nombre: "Fecha Emisión", campo: "fechaEmision", ancho: "20%" },
            { nombre: "Fecha Vencimiento", campo: "fechaVencimiento", ancho: "20%" },
            { nombre: "Acción", campo: "accion", ancho: "20%" },
          ]}
          datos={credenciales}
          titulo="Credenciales Generadas"
          icono={<FaIdBadge className="icono-titulo" />}
          onNuevoRegistro={handleAbrirModal} // Agregar nueva credencial
        />
      )}

      {/* 🔹 Modal para Asignar Credencial */}
      <ModalNuevo
        show={showModal}
        onHide={() => setShowModal(false)}
        titulo="Asignar Credencial"
        onGuardar={handleGuardarCredencial}
        form={form}
        width={700}
      >
        <Form layout="vertical" form={form}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Participante"
                name="participante"
                rules={[{ required: true, message: "Seleccione un participante" }]}
              >
                <Select
                  placeholder="Seleccione un participante"
                  onChange={(value) => setParticipanteSeleccionado(value)}
                >
                  {participantes.map((p) => (
                    <Option key={p.idRegistroParticipanteEvento} value={p.idRegistroParticipanteEvento}>
                      {p.nombreParticipante}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
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
          </Row>
          <Row gutter={25}>
            <Col span={10}>
              <Form.Item label="Fecha de Emisión" name="fechaEmision">
                <Input type="date" />
              </Form.Item>
            </Col>
            <Col span={10}>
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
