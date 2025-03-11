import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import fondoCredencial from "../../assets/FondosCredencial/circulitos.png";

const AsignacionCampos = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Recuperar ficha seleccionada
  const selectedFicha = location.state?.selectedFicha || JSON.parse(localStorage.getItem("selectedFicha")) || null;
  const [fichaActual, setFichaActual] = useState(selectedFicha);
  const [error, setError] = useState(null);

  // Recuperar o mantener el mismo ID de campo credencial sin incrementarlo
  const [idCampoCredencial, setIdCampoCredencial] = useState(() => {
    return localStorage.getItem("idCampoCredencial") || Date.now();
  });

  useEffect(() => {
    localStorage.setItem("idCampoCredencial", idCampoCredencial);
  }, [idCampoCredencial]);

  // Estado para manejar la asignación de múltiples ubicaciones
  const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState("");
  const [nuevaDescripcion, setNuevaDescripcion] = useState("");

  // Lista de ubicaciones posibles
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

  // Recuperar asignaciones desde `localStorage`
  const [asignaciones, setAsignaciones] = useState(() => {
    const savedData = localStorage.getItem("asignaciones");
    return savedData ? JSON.parse(savedData) : { [idCampoCredencial]: {} };
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
      [idCampoCredencial]: {
        ...prev[idCampoCredencial],
        [ubicacionSeleccionada]: { descripcion: nuevaDescripcion },
      },
    }));

    setNuevaDescripcion("");
    setUbicacionSeleccionada("");
    setError(null);
  };

  const handleEliminar = (ubicacion) => {
    setAsignaciones((prev) => {
      const nuevasAsignaciones = { ...prev };
      delete nuevasAsignaciones[idCampoCredencial][ubicacion];
      return nuevasAsignaciones;
    });
  };

  const verificarYRedirigir = () => {
    navigate("/DiseñadorCredencial", { state: { selectedFicha: fichaActual, idCampoCredencial } });
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

      {fichaActual ? (
        <div className="text-center my-4">
          <h2>Diseñador de Credencial para: {fichaActual.title}</h2>
          <p>{fichaActual.description}</p>
        </div>
      ) : (
        <Alert variant="warning" className="text-center">
          No se seleccionó ninguna ficha. 
          <Button variant="primary" onClick={() => navigate("/SeleccionarFicha")} className="mt-2">
            Seleccionar Ficha
          </Button>
        </Alert>
      )}

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
          <div className="text-center">
            <button className="btn btn-primary" onClick={handleGuardar}>
              Guardar
            </button>
            <button className="btn btn-success ms-2" onClick={verificarYRedirigir}>
              Finalizar y Diseñar
            </button>
          </div>
        </div>

        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div
            style={{
              backgroundImage: `url(${fondoCredencial})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "grid",
              width: "600px",
              height: "350px",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "5px",
              margin: "auto",
              border: "3px solid black",
              padding: "10px",
              backgroundColor: "#ffffff",
              fontFamily: "Arial",
              borderRadius: "10px",
            }}
          >
            {ubicaciones.map((ubicacion) => (
              <div key={ubicacion.id} style={{ border: "1px solid gray", textAlign: "center", padding: "5px", position: "relative" }}>
                <strong>{asignaciones[idCampoCredencial]?.[ubicacion.id]?.descripcion || "Vacío"}</strong>
                {asignaciones[idCampoCredencial]?.[ubicacion.id] && (
                  <button
                    onClick={() => handleEliminar(ubicacion.id)}
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
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsignacionCampos;
