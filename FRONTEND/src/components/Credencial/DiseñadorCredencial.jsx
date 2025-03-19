import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Button, Alert, Form, Toast } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import fondoCredencial from "../../assets/FondosCredencial/circulitos.png";

// Estilos centralizados para la vista previa y las celdas
const previewContainerStyle = {
  backgroundImage: `url(${fondoCredencial})`,
  backgroundSize: "cover",
  width: "600px",
  height: "450px",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "5px",
  border: "3px solid black",
  padding: "10px",
  backgroundColor: "#ffffff",
};

const cellStyle = (hasCampo) => ({
  border: "1px solid gray",
  textAlign: "center",
  padding: "5px",
  overflow: "hidden",
  borderRadius: "4px",
  backgroundColor: hasCampo ? "#d1e7dd" : "#fff",
});

// Componente para mostrar cada campo pendiente (draggable)
const FieldCard = ({ campo, onDragStart }) => (
  <div
    draggable
    onDragStart={(e) => onDragStart(e, campo)}
    className="p-2 mb-2 border rounded bg-light"
    style={{ cursor: "grab" }}
  >
    <strong>{campo.descripcion}</strong>
    <br />
    <small>{campo.leyenda}</small>
    <br />
    <em>{campo.lado}</em>
  </div>
);

// Componente para cada celda de la cuadrícula (DropZone)
const DropZone = ({ ubicacion, asignacion, onDrop, onDragOver, onDelete }) => (
  <div
    onDragOver={onDragOver}
    onDrop={(e) => onDrop(e, ubicacion.id)}
    className="p-2 border text-center position-relative rounded"
    style={{
      minHeight: "80px",
      backgroundColor: asignacion ? "#d1e7dd" : "#fff",
      overflow: "hidden",
    }}
  >
    {asignacion ? (
      <div>
        <strong>{asignacion.descripcion}</strong>
        <br />
        <small>{asignacion.leyenda}</small>
        <br />
        <em>{asignacion.lado}</em>
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(ubicacion.id)}
          className="position-absolute top-0 end-0 m-1"
        >
          X
        </Button>
      </div>
    ) : (
      <span>{ubicacion.descripcion}</span>
    )}
  </div>
);

const DisenoCredencial = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extraer datos de la vista anterior
  const { fichaSeleccionada, asignaciones } = location.state || {};

  // Estados
  const [fechaVigencia, setFechaVigencia] = useState("");
  const [usuarioRegistro] = useState("admin");
  const [error, setError] = useState(null);
  const [previewSide, setPreviewSide] = useState("frente");

  // Estado para cargar las ubicaciones desde el endpoint
  const [ubicaciones, setUbicaciones] = useState([]);

  // Estados para Toast
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Notificación Toast
  const showNotification = useCallback((message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }, []);

  // Obtener ubicaciones desde el endpoint
  useEffect(() => {
    const fetchUbicaciones = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/credencial/ubicacionCampos");
        if (!response.ok) throw new Error("Error al obtener ubicaciones");
        const data = await response.json();
        // Se espera que la API retorne { success: true, data: [...] }
        setUbicaciones(data.data);
      } catch (err) {
        console.error("Error fetching ubicaciones:", err);
        setError("No se pudieron cargar las ubicaciones.");
      }
    };
    fetchUbicaciones();
  }, []);

  // Función para guardar (simulado)
  const handleGuardarDiseno = useCallback(() => {
    if (!fichaSeleccionada) {
      setError("No hay ficha seleccionada para guardar el diseño.");
      return;
    }
    setError(null);

    const camposAsignados = Object.entries(asignaciones || {}).map(([key, campo]) => {
      const [lado, ubicacionId] = key.split("-");
      return {
        descripcion: campo.descripcion,
        leyenda: campo.leyenda,
        lado,
        ubicacionId,
      };
    });

    const payload = {
      idFichaRegistro: fichaSeleccionada.idFichaRegistro,
      fechaVigencia,
      usuarioRegistro,
      campos: camposAsignados,
    };

    console.log("Simulando guardado Diseño Credencial con payload:", payload);
    showNotification("Diseño guardado (simulado). Revisa la consola.");
    navigate("/credencialView");
  }, [fichaSeleccionada, fechaVigencia, usuarioRegistro, asignaciones, navigate, showNotification]);

  // Renderiza la cuadrícula 3x3 usando las ubicaciones cargadas desde el endpoint
  const renderPreview = useCallback(() => (
    <div style={previewContainerStyle}>
      {ubicaciones.length > 0 ? (
        ubicaciones.map((ubicacion) => {
          const key = `${previewSide}-${ubicacion.id}`;
          const campo = asignaciones ? asignaciones[key] : null;
          return (
            <div key={ubicacion.id} style={cellStyle(!!campo)}>
              {campo ? (
                <div>
                  <strong>{campo.descripcion}</strong>
                  <br />
                  <small>{campo.leyenda}</small>
                  <br />
                  <em>{campo.lado}</em>
                </div>
              ) : (
                <span>{ubicacion.descripcion}</span>
              )}
            </div>
          );
        })
      ) : (
        <p className="text-center">Cargando ubicaciones...</p>
      )}
    </div>
  ), [previewSide, asignaciones, ubicaciones]);

  return (
    <div className="container-fluid">
      <Button
        variant="outline-warning"
        onClick={() => navigate("/AsignacionCampos")}
        className="d-flex align-items-center gap-2 mt-3 ms-3"
      >
        <FaArrowLeft size={20} /> Regresar
      </Button>

      {error && (
        <Alert variant="danger" className="m-3">
          {error}
        </Alert>
      )}

      <Row>
        {/* Panel Izquierdo: Datos y formulario */}
        <Col md={4}>
          <h4 className="mt-3">Diseño de Credencial</h4>
          {!fichaSeleccionada ? (
            <Alert variant="danger">No se recibió ninguna ficha seleccionada.</Alert>
          ) : (
            <>
              <div className="mb-3">
                <strong>Ficha Seleccionada:</strong> {fichaSeleccionada.title}
              </div>
              <Form.Group className="mb-3">
                <Form.Label>Fecha de Vigencia</Form.Label>
                <Form.Control
                  type="date"
                  value={fechaVigencia}
                  onChange={(e) => setFechaVigencia(e.target.value)}
                />
              </Form.Group>
              <Form.Check
                type="switch"
                id="switch-preview-side"
                label={`Configurando: ${previewSide === "frente" ? "Frontal" : "Trasera"}`}
                checked={previewSide === "trasero"}
                onChange={(e) => setPreviewSide(e.target.checked ? "trasero" : "frente")}
                className="mb-3"
              />
              <Button variant="primary" onClick={handleGuardarDiseno}>
                Guardar Diseño
              </Button>
            </>
          )}
        </Col>

        {/* Panel Derecho: Vista previa */}
        <Col md={6} className="d-flex flex-column">
          <h4 className="w-100 mt-3 text-center">
            Previsualización - {previewSide === "frente" ? "Frontal" : "Trasera"}
          </h4>
          <div className="mx-auto" style={{ marginTop: "10px" }}>
            {renderPreview()}
          </div>
        </Col>
      </Row>

      {/* Toast de notificaciones */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="position-fixed bottom-0 end-0 p-3"
        style={{ zIndex: 5 }}
      >
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </div>
    </div>
  );
};

export default DisenoCredencial;
