import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import fondoCredencial from "../../assets/FondosCredencial/circulitos.png";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "react-bootstrap";

const AsignacionCampos = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedFicha } = location.state || {}; // Recibir la ficha seleccionada

  const [fichaActual, setFichaActual] = useState(null);

  // Validar si la ficha seleccionada está presente
  useEffect(() => {
    if (selectedFicha) {
      setFichaActual(selectedFicha);
    } else {
      alert("No se ha seleccionado una ficha.");
      navigate("/credencialView"); // Redirigir si no hay ficha seleccionada
    }
  }, [selectedFicha, navigate]);

  const [ubicaciones] = useState([
    { id: 1, descripcion: "Arriba a la Izquierda", value: "arriba-izquierda" },
    { id: 2, descripcion: "Arriba al Centro", value: "arriba-centro" },
    { id: 3, descripcion: "Arriba a la Derecha", value: "arriba-derecha" },
    { id: 4, descripcion: "Medio a la Izquierda", value: "medio-izquierda" },
    { id: 5, descripcion: "Centro Exacto", value: "centro-exacto" },
    { id: 6, descripcion: "Medio a la Derecha", value: "medio-derecha" },
    { id: 7, descripcion: "Abajo a la Izquierda", value: "abajo-izquierda" },
    { id: 8, descripcion: "Abajo al Centro", value: "abajo-centro" },
    { id: 9, descripcion: "Abajo a la Derecha", value: "abajo-derecha" },
  ]);

  // Cargar configuraciones de la plantilla desde localStorage
  const [configPlantilla, setConfigPlantilla] = useState(() => {
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

  useEffect(() => {
    localStorage.setItem("asignaciones", JSON.stringify(asignaciones));
  }, [asignaciones]);

  const verificarYRedirigir = () => {
    // Verifica si todas las ubicaciones tienen asignaciones
    const todasLlenas = ubicaciones.every((ubicacion) => asignaciones[ubicacion.id]);

    if (todasLlenas) {
      navigate("/DiseñadorCredencial", { state: { selectedFicha: fichaActual } }); // Pasar la ficha seleccionada
    }
  };

  const handleGuardar = () => {
    if (ubicacionSeleccionada && nuevaDescripcion.trim() !== "") {
      setAsignaciones((prev) => {
        const nuevasAsignaciones = {
          ...prev,
          [ubicacionSeleccionada]: { descripcion: nuevaDescripcion },
        };
        localStorage.setItem("asignaciones", JSON.stringify(nuevasAsignaciones));
        return nuevasAsignaciones;
      });

      setNuevaDescripcion("");
      setUbicacionSeleccionada("");

      // Verifica si todos los campos están llenos y redirige
      verificarYRedirigir();
    } else {
      alert("Por favor, seleccione una ubicación y escriba una descripción.");
    }
  };

  const handleEliminar = (id) => {
    const nuevasAsignaciones = { ...asignaciones };
    delete nuevasAsignaciones[id];
    setAsignaciones(nuevasAsignaciones);
  };

  return (
    <div className="container-fluid2">


      <Button
        variant="outline-warning"
        onClick={() => navigate("/credencialView")}
       className="d-flex align-items-center gap-2"
        style={{ marginBottom: '55px', marginLeft: '55px' }}
        >
        <FaArrowLeft size={20} /> Regresar
      </Button>

                {/* Mostrar la ficha seleccionada */}
                {fichaActual && (
        <div className="credenciallisttitle" style={{ marginTop: '20px', alignContent: 'center', textAlign: 'center' }}>
          <h2>Diseñador de Credencial para : {fichaActual.title}</h2>
          <p>{fichaActual.description}</p>
        </div>
      )}

      <div className="row">
        <div className="col-md-4">
          <h3 className="text-center my-3">Configuración de Credencial</h3>

          {/* FORMULARIO PARA INGRESAR DATOS */}
          <div className="mb-3">
            <label className="form-label">Ubicación:</label>
            <select
              className="form-control-credencial"
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

            <div className="mb-3">
              <label className="form-label">Descripción:</label>
              <input
                type="text"
                className="form-control-credencial"
                placeholder="Escribir descripción"
                value={nuevaDescripcion}
                onChange={(e) => setNuevaDescripcion(e.target.value)}
              />
            </div>

            <div className="botones-container">
              <button className="btnAgg" onClick={handleGuardar}>
                Guardar
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-5 d-flex justify-content-center align-items-center">
          {/* VISTA PREVIA */}
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
                }}
              >
                <strong>
                  {asignaciones[ubicacion.id]?.descripcion || "Vacío"}
                </strong>
                {asignaciones[ubicacion.id] && (
                  <button
                    onClick={() => handleEliminar(ubicacion.id)}
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      padding: "2px 5px",
                      marginLeft: "5px",
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