import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import fondoCredencial from "../../assets/FondosCredencial/circulitos.png";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "react-bootstrap";

const AsignacionCampos = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedFicha } = location.state || {};

  const [fichaActual, setFichaActual] = useState(null);
  const [ubicaciones] = useState([
    { id: "arriba-izquierda", descripcion: "Arriba a la Izquierda" },
    { id: "arriba-centro", descripcion: "Arriba al Centro" },
    { id: "arriba-derecha", descripcion: "Arriba a la Derecha" },
    { id: "medio-izquierda", descripcion: "Medio a la Izquierda" },
    { id: "centro-exacto", descripcion: "Centro Exacto" },
    { id: "medio-derecha", descripcion: "Medio a la Derecha" },
    { id: "abajo-izquierda", descripcion: "Abajo a la Izquierda" },
    { id: "abajo-centro", descripcion: "Abajo al Centro" },
    { id: "abajo-derecha", descripcion: "Abajo a la Derecha" },
  ]);

  const [configPlantilla] = useState(() => {
    const savedConfig = localStorage.getItem("configPlantilla");
    return savedConfig
      ? JSON.parse(savedConfig)
      : { colorFondo: "#ffffff", tipoFuente: "Arial" };
  });

  const [nuevaDescripcion, setNuevaDescripcion] = useState("");
  const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState("");
  const [asignaciones, setAsignaciones] = useState(() => {
    const savedData = localStorage.getItem("asignaciones");
    return savedData ? JSON.parse(savedData) : {};
  });

  const [idCampoCredencial, setIdCampoCredencial] = useState(() => {
    // Obtener el idCampoCredencial desde localStorage
    return localStorage.getItem("idCampoCredencial");
  });

  useEffect(() => {
    if (selectedFicha) {
      setFichaActual(selectedFicha);
    } else {
      alert("No se ha seleccionado una ficha.");
      navigate("/credencialView");
    }
  }, [selectedFicha, navigate]);

  useEffect(() => {
    localStorage.setItem("asignaciones", JSON.stringify(asignaciones));
  }, [asignaciones]);

  const handleGuardar = () => {
    if (!ubicacionSeleccionada || nuevaDescripcion.trim() === "") {
      alert("Por favor, seleccione una ubicación y escriba una descripción.");
      return;
    }

    setAsignaciones((prev) => ({
      ...prev,
      [ubicacionSeleccionada]: { descripcion: nuevaDescripcion },
    }));

    setNuevaDescripcion("");
    setUbicacionSeleccionada("");
    verificarYRedirigir();
  };

  const handleEliminar = (id) => {
    const nuevasAsignaciones = { ...asignaciones };
    delete nuevasAsignaciones[id];
    setAsignaciones(nuevasAsignaciones);
  };

  const verificarYRedirigir = () => {
    const todasLlenas = ubicaciones.every(
      (ubicacion) => asignaciones[ubicacion.id]
    );
    if (todasLlenas) {
      navigate("/DiseñadorCredencial", {
        state: { selectedFicha: fichaActual, idCampoCredencial },
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

      {fichaActual && (
        <div className="text-center my-4">
          <h2>Diseñador de Credencial para: {fichaActual.title}</h2>
          <p>{fichaActual.description}</p>
        </div>
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
              backgroundColor: configPlantilla.colorFondo,
              fontFamily: configPlantilla.tipoFuente,
              borderRadius: "10px",
            }}
          >
            {ubicaciones.map((ubicacion) => (
              <div
                key={ubicacion.id}
                style={{
                  border: "1px solid gray",
                  minHeight: "50px",
                  textAlign: "center",
                  padding: "5px",
                  backgroundColor: "#e9ecef",
                  borderRadius: "5px",
                  fontFamily: configPlantilla.tipoFuente,
                  position: "relative",
                }}
              >
                <strong>
                  {asignaciones[ubicacion.id]?.descripcion || "Vacío"}
                </strong>
                {asignaciones[ubicacion.id] && (
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
