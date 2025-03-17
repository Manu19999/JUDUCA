import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Alert, Form } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import fondoCredencial from "../../assets/FondosCredencial/circulitos.png";

const AsignacionCampos = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedFicha = location.state?.selectedFicha || JSON.parse(localStorage.getItem("selectedFicha")) || null;
  const [fichaActual, setFichaActual] = useState(selectedFicha);
  const [error, setError] = useState(null);

  const [idCampoCredencial, setIdCampoCredencial] = useState(() => {
    return localStorage.getItem("idCampoCredencial") || Date.now();
  });

  useEffect(() => {
    localStorage.setItem("idCampoCredencial", idCampoCredencial);
  }, [idCampoCredencial]);

  const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState("");
  const [nuevaDescripcion, setNuevaDescripcion] = useState("");
  const [ladoFrente, setLadoFrente] = useState(true);
  const [leyenda, setLeyenda] = useState("");

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

  const [asignaciones, setAsignaciones] = useState(() => {
    const savedData = localStorage.getItem("asignaciones");
    return savedData ? JSON.parse(savedData) : {};
  });

  useEffect(() => {
    localStorage.setItem("asignaciones", JSON.stringify(asignaciones));
  }, [asignaciones]);

  const handleGuardar = () => {
    if (!ubicacionSeleccionada || nuevaDescripcion.trim() === "") {
      setError("Seleccione una ubicación y escriba una descripción.");
      return;
    }

    setAsignaciones((prev) => ({
      ...prev,
      [ubicacionSeleccionada]: { descripcion: nuevaDescripcion, lado: ladoFrente ? "frente" : "trasero", leyenda },
    }));

    setNuevaDescripcion("");
    setUbicacionSeleccionada("");
    setLadoFrente(true);
    setLeyenda("");
    setError(null);
  };

  const handleEliminar = (id) => {
    setAsignaciones((prev) => {
      const nuevasAsignaciones = { ...prev };
      delete nuevasAsignaciones[id];
      return nuevasAsignaciones;
    });
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
        <div className="col-md-4">
          <h3 className="text-center my-3">Configuración de Credencial</h3>
          <div className="mb-3">
            <label className="form-label">Ubicación:</label>
            <select
              className="form-control"
              value={ubicacionSeleccionada}
              onChange={(e) => setUbicacionSeleccionada(e.target.value)}
            >
              <option value="">Seleccione ubicación</option>
              {ubicaciones.map((ubicacion) => (
                <option key={ubicacion.id} value={ubicacion.id}>
                  {ubicacion.descripcion}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Descripción:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Escribir descripción"
              value={nuevaDescripcion}
              onChange={(e) => setNuevaDescripcion(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="checkbox"
              label="Ubicar en el frente"
              checked={ladoFrente}
              onChange={() => setLadoFrente(!ladoFrente)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Leyenda:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Texto adicional o leyenda"
              value={leyenda}
              onChange={(e) => setLeyenda(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button className="btn btn-primary" onClick={handleGuardar}>
              Guardar
            </button>
          </div>
        </div>
        <div className="col-md-6 d-flex flex-wrap">
          <h3 className="text-center w-100">Previsualización</h3>
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
            {Object.keys(asignaciones).map((id) => (
              <div key={id} style={{ border: "1px solid gray", textAlign: "center", padding: "5px", position: "relative" }}>
                <strong>{asignaciones[id]?.descripcion || "Vacío"}</strong>
                <button
                  onClick={() => handleEliminar(id)}
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsignacionCampos;