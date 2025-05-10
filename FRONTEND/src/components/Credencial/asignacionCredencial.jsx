import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Tabla from "../../components/Crud/Tabla.jsx";
import Nav from "../../components/Dashboard/navDashboard.jsx";
import ModalDetalles from "../../components/Crud/Modal/ModalDetalles";
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
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [fichaActual, setFichaActual] = useState(null);
  const [credenciales, setCredenciales] = useState([]); // Lista de credenciales generadas
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [participantes, setParticipantes] = useState([]); // Lista de participantes
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

    const handleVolver = () => {
    navigate("/OpcionCredencial", {
      state: {
        selectedFicha: selectedFicha,
      },
    });
  };

    const handleDetails = (id) => {
    const registro = credenciales.find((d) => d.id === id);
    setRegistroSeleccionado(registro);
    setShowDetailsModal(true);
  };

  // 🔹 Abrir el modal y seleccionar participante
  const handleAbrirModal = () => {
    setShowModal(true);
    form.resetFields();
  };

  /* 🔹 Guardar la credencial en la base de datos
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
*/

  return (
    <div >
      <Nav />
      <BotonRegresar to="/credencialView" text="Regresar" onClick={handleVolver}  />
      {fichaActual && (
        <div className="credenciallisttitle text-center mt-3" style={{marginBottom:'30px'}}>
          <h2>GESTION DE CREDENCIALES : {fichaActual.title}</h2>
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
            { nombre: "#", campo: "id", ancho: "5%" },
            { nombre: "Nombre del participante", campo: "Participante", ancho: "70%" },
            { nombre: "Acción", campo: "accion", ancho: "25%" },
          ]}
          datos={credenciales}
          onGenerarReporte={() => console.log("Generar reporte en PDF")}
          onDetails={handleDetails} // Función para abrir el modal de detalles


        />
      )}

      <ModalDetalles
              show={showDetailsModal} // Controla la visibilidad del modal
              onHide={() => setShowDetailsModal(false)} // Función para cerrar el modal
              titulo="Detalles del participante" // Título del modal
              detalles={registroSeleccionado || {}} // Detalles del usuario seleccionado
              width={600} // Ancho personalizado
            />
    </div>
  );
}

export default CrearCredenciales;
