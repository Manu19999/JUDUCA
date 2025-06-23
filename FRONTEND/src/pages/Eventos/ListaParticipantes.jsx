import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Tabla from "../../components/Crud/Tabla.jsx";
import Nav from "../../components/Dashboard/navDashboard.jsx";
import { Spin, Alert } from "antd";
import { Modal } from "react-bootstrap";
import BotonRegresar from "../../components/Dashboard/BotonRegresar";
import "../../styles/Credencial/credencial.css";
import { FaUserCheck } from "react-icons/fa";
import { fetchWithAuth } from '../../utils/api';


 
function ListaParticipantes() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedFicha, setSelectedFicha] = useState(() => {
    const fichaFromState = location.state?.selectedFicha;
    const fichaFromStorage = localStorage.getItem("selectedFicha");
    return fichaFromState || (fichaFromStorage ? JSON.parse(fichaFromStorage) : null);
  });

  const [credenciales, setCredenciales] = useState([]);
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fichaGuardada = localStorage.getItem("selectedFicha");

    if (selectedFicha) {
      localStorage.setItem("selectedFicha", JSON.stringify(selectedFicha));
      cargarCredenciales(selectedFicha.idEvento, selectedFicha.id);
    } else if (fichaGuardada) {
      const fichaParseada = JSON.parse(fichaGuardada);
      cargarCredenciales(fichaParseada.idEvento, fichaParseada.id);
    } else {
      alert("No se ha seleccionado una ficha.");
      navigate("/credencialView");
    }
  }, [selectedFicha, navigate]);

  const cargarCredenciales = async (idEvento, idFichaRegistro) => {
    try {
      setLoading(true);
      const response = await fetchWithAuth(`http://localhost:4000/api/credencial/credenciales/${idEvento}/${idFichaRegistro}`);
      const data = await response.json();
      if (data.hasError) {
        throw new Error(data.errors.join(", "));
      }
      setCredenciales(data.data);
    } catch (err) {
      console.error("Error al obtener credenciales:", err.message);
      setError("No se pudieron cargar las credenciales.");
    } finally {
      setLoading(false);
    }
  };

  const handleDetails = (id) => {
    const registro = credenciales.find((d) => d.id === id);
    const datosCompletos = typeof registro?.DatosCompletos === "string"
      ? JSON.parse(registro.DatosCompletos)
      : registro?.DatosCompletos || {};

    setRegistroSeleccionado({
      participante: registro.Participante,
      detalles: datosCompletos
    });

    setShowDetailsModal(true);
  };



  // 🔹 Modal de detalles embebido
  const ModalDetalles = ({ show, onHide, datos }) => (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          DETALLES : {datos?.participante || "Sin nombre"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {datos?.detalles ? (
          Object.entries(datos.detalles)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {value}
              </p>
            ))
        ) : (
          <p>No hay datos para mostrar.</p>
        )}
      </Modal.Body>
    </Modal>
  );

  return (
    <div>
      <div className="container mx-auto p-4">
        <Nav />
        <BotonRegresar to="/OpcionFicha" text="Regresar" />
        <div className="credenciallisttitle text-center mt-3" style={{ marginBottom: "30px" }}>
          <h2>{selectedFicha?.title}</h2>
        </div>

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
              { nombre: "Participante", campo: "Participante", ancho: "70%" },
              { nombre: "Acción", campo: "accion", ancho: "25%" },
            ]}
            titulo="Gestión de participantes" // Título de la tabla
            icono={<FaUserCheck className="icono-titulo" />} // Ícono del título
            datos={credenciales}
             onGenerarReporte={() => console.log("Generar reporte en PDF")}

            onDetails={(id) => handleDetails(id)}
          />
        )}

        {/* 🔹 Modal embebido directamente */}
        <ModalDetalles
          show={showDetailsModal}
          onHide={() => setShowDetailsModal(false)}
          datos={registroSeleccionado}
        />
      </div>
    </div>
  );
}

export default ListaParticipantes;
