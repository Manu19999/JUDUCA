import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Alert, Form, Toast } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import fondoCredencial from "../../assets/FondosCredencial/circulitos.png";

const LS_CAMPOS_PENDIENTES = "camposPendientes";
const LS_ASIGNACIONES = "asignaciones";

// Definición de ubicaciones (las 9 celdas de la cuadrícula)
const ubicaciones = [
  { id: "arriba-izquierda", descripcion: "Arriba a la Izquierda" },
  { id: "arriba-centro", descripcion: "Arriba al Centro" },
  { id: "arriba-derecha", descripcion: "Arriba a la Derecha" },
  { id: "medio-izquierda", descripcion: "Medio a la Izquierda" },
  { id: "centro-exacto", descripcion: "Centro Exacto" },
  { id: "medio-derecha", descripcion: "Medio a la Derecha" },
  { id: "abajo-izquierda", descripcion: "Abajo a la Izquierda" },
  { id: "abajo-centro", descripcion: "Abajo al Centro" },
  { id: "abajo-derecha", descripcion: "Abajo a la Derecha" },
];

// Componente FieldCard: muestra un campo pendiente, es draggable
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

// Componente DropZone: celda de la cuadrícula para soltar campos
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

const AsignacionCampos = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extraer la ficha seleccionada
  const selectedFicha =
    location.state?.selectedFicha ||
    JSON.parse(localStorage.getItem("selectedFicha")) ||
    null;

  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Estado para vista (frente o trasero)
  const [previewSide, setPreviewSide] = useState("frente");

  // Estados para crear un campo nuevo
  const [nuevaDescripcion, setNuevaDescripcion] = useState("");
  const [leyenda, setLeyenda] = useState("");
  const [ladoNuevo, setLadoNuevo] = useState(previewSide);

  // Actualizar lado al cambiar la vista
  useEffect(() => {
    setLadoNuevo(previewSide);
  }, [previewSide]);

  // Cargar campos pendientes de localStorage
  const [camposPendientes, setCamposPendientes] = useState(() => {
    const stored = localStorage.getItem(LS_CAMPOS_PENDIENTES);
    return stored ? JSON.parse(stored) : [];
  });
  useEffect(() => {
    localStorage.setItem(LS_CAMPOS_PENDIENTES, JSON.stringify(camposPendientes));
  }, [camposPendientes]);

  // Cargar asignaciones de localStorage
  const [asignaciones, setAsignaciones] = useState(() => {
    const saved = localStorage.getItem(LS_ASIGNACIONES);
    return saved ? JSON.parse(saved) : {};
  });
  useEffect(() => {
    localStorage.setItem(LS_ASIGNACIONES, JSON.stringify(asignaciones));
  }, [asignaciones]);

  // Notificaciones Toast
  const showNotification = useCallback((message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }, []);

  // Crear un nuevo campo
  const handleCrearCampo = useCallback(() => {
    if (nuevaDescripcion.trim() === "") {
      setError("Escriba una descripción para el campo.");
      return;
    }
    const nuevoCampo = {
      id: Date.now().toString(),
      descripcion: nuevaDescripcion,
      lado: ladoNuevo,
      leyenda,
    };
    setCamposPendientes((prev) => [...prev, nuevoCampo]);
    setNuevaDescripcion("");
    setLeyenda("");
    setError(null);
    showNotification("Campo creado. Arrastre para asignar.");
  }, [nuevaDescripcion, ladoNuevo, leyenda, showNotification]);

  // Handlers de drag & drop
  const handleDragStart = useCallback((e, campo) => {
    e.dataTransfer.setData("campo", JSON.stringify(campo));
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e, cellId) => {
    e.preventDefault();
    const campoData = e.dataTransfer.getData("campo");
    if (campoData) {
      const campo = JSON.parse(campoData);
      const key = `${previewSide}-${cellId}`;
      setAsignaciones((prev) => ({
        ...prev,
        [key]: campo,
      }));
      setCamposPendientes((prev) => prev.filter((c) => c.id !== campo.id));
      showNotification("Campo asignado.");
    }
  }, [previewSide, showNotification]);

  const handleEliminarAsignacion = useCallback((cellId) => {
    const key = `${previewSide}-${cellId}`;
    if (asignaciones[key]) {
      setCamposPendientes((prev) => [...prev, asignaciones[key]]);
      setAsignaciones((prev) => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
      showNotification("Campo removido.");
    }
  }, [asignaciones, previewSide, showNotification]);

  const handleClearAll = useCallback(() => {
    if (window.confirm("¿Seguro que deseas limpiar todas las asignaciones y pendientes?")) {
      setAsignaciones({});
      setCamposPendientes([]);
      showNotification("Todas las asignaciones eliminadas.");
    }
  }, [showNotification]);

  return (
    <div className="container-fluid">
      <Button
        variant="outline-warning"
        onClick={() => navigate("/credencialView")}
        className="d-flex align-items-center gap-2 mt-3 ms-3"
      >
        <FaArrowLeft size={20} /> Regresar
      </Button>

      {selectedFicha && (
        <div className="text-center my-3">
          <h3>Ficha Seleccionada: {selectedFicha.title}</h3>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="row">
        {/* Panel Izquierdo: Crear campo y lista de pendientes */}
        <div className="col-md-4">
          <h4 className="text-center my-3">Crear Campo</h4>
          <Form.Group className="mb-3">
            <Form.Label>Descripción:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Escribir descripción"
              value={nuevaDescripcion}
              onChange={(e) => setNuevaDescripcion(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Leyenda:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Texto adicional o leyenda"
              value={leyenda}
              onChange={(e) => setLeyenda(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              id="switch-crear-lado"
              label={`Asignar a ${ladoNuevo === "frente" ? "Frente" : "Trasero"}`}
              checked={ladoNuevo === "trasero"}
              onChange={(e) =>
                setLadoNuevo(e.target.checked ? "trasero" : "frente")
              }
            />
          </Form.Group>
          <div className="d-flex">
            <Button size="md" variant="primary" onClick={handleCrearCampo} className="me-2">
              Crear Campo
            </Button>
            <Button
              size="md"
              variant="success"
              onClick={() => {
                navigate("/diseñadorCredencial", {
                  state: {
                    fichaSeleccionada: selectedFicha,
                    asignaciones,
                  },
                });
              }}
            >
              Terminar
            </Button>

            <Button size="md" style={{marginLeft:'10px'}} variant="secondary" onClick={handleClearAll} className="me-2">
              Limpiar
            </Button>

          </div>
          <div className="mt-4">
            <h5>Campos pendientes:</h5>
            {camposPendientes
              .filter((campo) => campo.lado === previewSide)
              .map((campo) => (
                <FieldCard key={campo.id} campo={campo} onDragStart={handleDragStart} />
              ))}
          </div>
        </div>

        {/* Panel Derecho: Vista previa */}
        <div className="col-md-6">
          <h4 className="text-center my-3">Previsualización</h4>
          <div className="text-center mb-3">
            <Form.Check
              type="switch"
              id="switch-preview-side"
              label={`Vista ${previewSide === "frente" ? "Frontal" : "Trasera"}`}
              checked={previewSide === "trasero"}
              onChange={(e) =>
                setPreviewSide(e.target.checked ? "trasero" : "frente")
              }
            />
          </div>
          <div
            className="mx-auto p-2"
            style={{
              backgroundImage: `url(${fondoCredencial})`,
              backgroundSize: "cover",
              width: "650px",
              height: "450px",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "5px",
              border: "3px solid black",
              padding: "10px",
              backgroundColor: "#ffffff",
            }}
          >
            {ubicaciones.map((ubicacion) => (
              <DropZone
                key={ubicacion.id}
                ubicacion={ubicacion}
                asignacion={asignaciones[`${previewSide}-${ubicacion.id}`]}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDelete={handleEliminarAsignacion}
              />
            ))}
          </div>
        </div>
      </div>

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

export default AsignacionCampos;
