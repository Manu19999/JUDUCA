import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import fondoCredencial from "../../assets/FondosCredencial/circulitos.png";

// Ubicaciones 3x3
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

const DisenoCredencial = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Obtenemos la ficha seleccionada y las asignaciones desde la vista anterior
  const { fichaSeleccionada, asignaciones } = location.state || {};

  // Estados
  const [fechaVigencia, setFechaVigencia] = useState("");
  const [usuarioRegistro] = useState("admin"); // Podrías obtenerlo de sesión
  const [error, setError] = useState(null);
  const [previewSide, setPreviewSide] = useState("frente"); // Frente / Trasero

  // Función para guardar (simulado)
  const handleGuardarDiseno = () => {
    try {
      if (!fichaSeleccionada) {
        setError("No hay ficha seleccionada para guardar el diseño.");
        return;
      }
      setError(null);

      // Convertir asignaciones en un array
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
      alert("Diseño guardado (simulado). Revisa la consola.");

      // Regresar a alguna ruta o mostrar confirmación
      navigate("/credencialView");
    } catch (err) {
      console.error(err);
      setError("Error al guardar diseño: " + err.message);
    }
  };

  // Vista previa 3x3
  const renderPreview = () => (
    <div
      style={{
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
      }}
    >
      {ubicaciones.map((ubicacion) => {
        const key = `${previewSide}-${ubicacion.id}`;
        const campo = asignaciones ? asignaciones[key] : null;
        return (
          <div
            key={ubicacion.id}
            style={{
              border: "1px solid gray",
              textAlign: "center",
              padding: "5px",
              overflow: "hidden",
              borderRadius: "4px",
              backgroundColor: campo ? "#d1e7dd" : "#fff",
            }}
          >
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
      })}
    </div>
  );

  return (
    <div className="container-fluid">
      {/* Botón de regresar */}
      <Button
        variant="outline-warning"
        onClick={() => navigate("/AsignacionCampos")}
        className="d-flex align-items-center gap-2 mt-3 ms-3"
      >
        <FaArrowLeft size={20} /> Regresar
      </Button>

      {/* Mensajes de error */}
      {error && (
        <Alert variant="danger" className="m-3">
          {error}
        </Alert>
      )}

      <div className="row">
        {/* Panel Izquierdo */}
        <div className="col-md-4">
          <h4 className="mt-3">Diseño de Credencial</h4>
          {!fichaSeleccionada ? (
            <Alert variant="danger">No se recibió ninguna ficha seleccionada.</Alert>
          ) : (
            <>
              <div className="mb-3">
                <strong>Ficha Seleccionada:</strong> {fichaSeleccionada.title}
              </div>

              {/* Fecha de vigencia */}
              <Form.Group className="mb-3">
                <Form.Label>Fecha de Vigencia</Form.Label>
                <Form.Control
                  type="date"
                  value={fechaVigencia}
                  onChange={(e) => setFechaVigencia(e.target.value)}
                />
              </Form.Group>

              {/* Switch para cambiar entre frente y trasero */}
              <Form.Check
                type="switch"
                id="switch-preview-side"
                label={`Vista ${previewSide === "frente" ? "Frontal" : "Trasera"}`}
                checked={previewSide === "trasero"}
                onChange={(e) => setPreviewSide(e.target.checked ? "trasero" : "frente")}
                className="mb-3"
              />

              {/* Botón Guardar */}
              <Button variant="primary" onClick={handleGuardarDiseno}>
                Guardar Diseño
              </Button>
            </>
          )}
        </div>

        {/* Panel Derecho: Vista previa */}
        <div className="col-md-6 d-flex flex-wrap">
          <h4 className="w-100 mt-3 text-center">Previsualización</h4>
          <div style={{ margin: "auto" }}>{renderPreview()}</div>
        </div>
      </div>
    </div>
  );
};

export default DisenoCredencial;
