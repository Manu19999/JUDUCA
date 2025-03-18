import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Alert, Form } from "react-bootstrap";
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

const FieldCard = ({ campo, onDragStart }) => (
  <div
    draggable
    onDragStart={(e) => onDragStart(e, campo)}
    style={{
      border: "1px solid #ccc",
      padding: "8px",
      marginBottom: "5px",
      cursor: "grab",
      backgroundColor: "#f8f9fa",
    }}
  >
    <strong>{campo.descripcion}</strong>
    <br />
    <small>{campo.leyenda}</small>
    <br />
    <em>{campo.lado}</em>
  </div>
);

const DropZone = ({ ubicacion, asignacion, onDrop, onDragOver, onDelete }) => (
  <div
    onDragOver={onDragOver}
    onDrop={(e) => onDrop(e, ubicacion.id)}
    style={{
      border: "1px solid gray",
      textAlign: "center",
      padding: "5px",
      position: "relative",
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
        <button
          onClick={() => onDelete(ubicacion.id)}
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "50%",
            padding: "2px 6px",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          X
        </button>
      </div>
    ) : (
      <span>{ubicacion.descripcion}</span>
    )}
  </div>
);

const AsignacionCampos = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedFicha =
    location.state?.selectedFicha ||
    JSON.parse(localStorage.getItem("selectedFicha")) ||
    null;
  const [error, setError] = useState(null);

  // Estado para definir la vista actual (frente o trasero)
  const [previewSide, setPreviewSide] = useState("frente");

  // Estados para crear un nuevo campo
  const [nuevaDescripcion, setNuevaDescripcion] = useState("");
  const [leyenda, setLeyenda] = useState("");
  const [ladoNuevo, setLadoNuevo] = useState(previewSide);

  // Si se cambia la vista, se actualiza el lado por defecto en la creación
  useEffect(() => {
    setLadoNuevo(previewSide);
  }, [previewSide]);

  // Lista de campos pendientes (solo los que corresponden al lado actual)
  const [camposPendientes, setCamposPendientes] = useState(() => {
    const stored = localStorage.getItem(LS_CAMPOS_PENDIENTES);
    return stored ? JSON.parse(stored) : [];
  });
  useEffect(() => {
    localStorage.setItem(LS_CAMPOS_PENDIENTES, JSON.stringify(camposPendientes));
  }, [camposPendientes]);

  // Asignaciones: se almacenan con clave `${side}-${ubicacion.id}`
  const [asignaciones, setAsignaciones] = useState(() => {
    const saved = localStorage.getItem(LS_ASIGNACIONES);
    return saved ? JSON.parse(saved) : {};
  });
  useEffect(() => {
    localStorage.setItem(LS_ASIGNACIONES, JSON.stringify(asignaciones));
  }, [asignaciones]);

  // Crear un nuevo campo y agregarlo a pendientes
  const handleCrearCampo = () => {
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
  };

  // Drag & Drop: maneja el inicio del drag
  const handleDragStart = (e, campo) => {
    e.dataTransfer.setData("campo", JSON.stringify(campo));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Al soltar, se asigna el campo a la celda con clave compuesta
  const handleDrop = (e, cellId) => {
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
    }
  };

  // Elimina la asignación de una celda y devuelve el campo a pendientes
  const handleEliminarAsignacion = (cellId) => {
    const key = `${previewSide}-${cellId}`;
    if (asignaciones[key]) {
      setCamposPendientes((prev) => [...prev, asignaciones[key]]);
      setAsignaciones((prev) => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
    }
  };

  return (
    <div className="container-fluid">
      <Button
        variant="outline-warning"
        onClick={() => navigate("/credencialView")}
        className="d-flex align-items-center gap-2"
        style={{ marginBottom: "20px", marginLeft: "20px" }}
      >
        <FaArrowLeft size={20} /> Regresar
      </Button>
      {error && <Alert variant="danger">{error}</Alert>}

      <div className="row">
        {/* Panel Izquierdo: Formulario para crear campo y lista de pendientes */}
        <div className="col-md-4">
          <h3 className="text-center my-3">Crear Campo</h3>
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
          <div className="mb-3">
            <Form.Check
              type="switch"
              id="switch-crear-lado"
              label={`Asignar a ${ladoNuevo === "frente" ? "Frente" : "Trasero"}`}
              checked={ladoNuevo === "trasero"}
              onChange={(e) => setLadoNuevo(e.target.checked ? "trasero" : "frente")}
            />
          </div>
          <div className="text-center">
            <Button variant="primary" onClick={handleCrearCampo}>
              Crear Campo (Arrastrar)
            </Button>
          </div>
          <div className="mt-4">
            <h5>Campos pendientes</h5>
            {camposPendientes
              .filter((campo) => campo.lado === previewSide)
              .map((campo) => (
                <FieldCard key={campo.id} campo={campo} onDragStart={handleDragStart} />
              ))}
          </div>
        </div>

        {/* Panel Derecho: Previsualización con switch para cambiar entre frente y trasero */}
        <div className="col-md-6">
          <h3 className="text-center my-3">Previsualización</h3>
          <div className="text-center mb-3">
            <Form.Check
              type="switch"
              id="switch-preview-side"
              label={`Vista ${previewSide === "frente" ? "Frontal" : "Trasera"}`}
              checked={previewSide === "trasero"}
              onChange={(e) => setPreviewSide(e.target.checked ? "trasero" : "frente")}
            />
          </div>
          <div
            style={{
              backgroundImage: `url(${fondoCredencial})`,
              backgroundSize: "cover",
              width: "600px",
              height: "350px",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "5px",
              margin: "auto",
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
    </div>
  );
};

export default AsignacionCampos;
