import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Alert, Form, Toast } from "react-bootstrap";
import BotonRegresar from "../../components/Dashboard/BotonRegresar";
import fondoCredencial from "../../assets/FondosCredencial/circulitos.png";

const LS_ASIGNACIONES = "asignaciones";

const FieldCard = ({ campo, onDragStart }) => (
  <div
    draggable
    onDragStart={(e) => onDragStart(e, campo)}
    className="p-2 mb-2 border rounded bg-light"
    style={{ cursor: "grab" }}
  >
    <strong>{campo.descripcion}</strong>
  </div>
);

const DropZone = ({ ubicacion, asignacion, onDrop, onDragOver, onDelete }) => (
  <div
    onDragOver={onDragOver}
    onDrop={(e) => onDrop(e, ubicacion.idUbicacionCampo)}
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
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(ubicacion.idUbicacionCampo)}
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
  const [ubicaciones, setUbicaciones] = useState([]);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [caracteristicasFicha, setCaracteristicasFicha] = useState([]);
  const [previewSide, setPreviewSide] = useState("frente");

  const selectedFicha =
    location.state?.selectedFicha ||
    JSON.parse(localStorage.getItem("selectedFicha")) ||
    null;

  const [asignaciones, setAsignaciones] = useState(() => {
    const saved = localStorage.getItem(LS_ASIGNACIONES);
    return saved ? JSON.parse(saved) : {};
  });

  const camposPendientes = useMemo(() => 
    caracteristicasFicha.filter(caracteristica => 
      !Object.values(asignaciones).some(asignado => asignado.id === caracteristica.id)
  ), [caracteristicasFicha, asignaciones]);

  useEffect(() => {
    localStorage.setItem(LS_ASIGNACIONES, JSON.stringify(asignaciones));
  }, [asignaciones]);

  useEffect(() => {
    const obtenerUbicaciones = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/credencial/ubicacionCampos");
        if (!response.ok) throw new Error("Error al obtener ubicaciones");
        setUbicaciones((await response.json()).data);
      } catch (error) {
        console.error("Error:", error);
        setError("No se pudieron cargar las ubicaciones.");
      }
    };
    obtenerUbicaciones();
  }, []);

  useEffect(() => {
    const obtenerCaracteristicas = async () => {
      try {
        if (!selectedFicha?.id) {
          setError("No se ha seleccionado ninguna ficha");
          return;
        }

        const response = await fetch(
          `http://localhost:4000/api/credencial/fichaCaracteristica/${selectedFicha.id}`
        );
        
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const { data } = await response.json();

        // Mapeo simplificado sin leyenda y lado
        const caracteristicasFormateadas = data.map(c => ({
          id: c.idCatalogoCaracteristica || c.id,
          descripcion: c.caracteristica,
          requerido: c.valorRequerido,
          principal: c.valorPrincipal
        }));

        setCaracteristicasFicha(caracteristicasFormateadas);
        
      } catch (error) {
        console.error("Error obteniendo características:", error);
        setError(`Error cargando características: ${error.message}`);
      }
    };

    obtenerCaracteristicas();
  }, [selectedFicha]);

  const showNotification = useCallback((message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }, []);

  const handleDragStart = useCallback((e, campo) => {
    e.dataTransfer.setData("campo", JSON.stringify(campo));
  }, []);

  const handleDragOver = useCallback((e) => e.preventDefault(), []);

  const handleDrop = useCallback((e, cellId) => {
    e.preventDefault();
    const campoData = e.dataTransfer.getData("campo");
    
    if (campoData) {
      const campo = JSON.parse(campoData);
      const key = `${previewSide}-${cellId}`;

      setAsignaciones(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(k => {
          if (updated[k]?.id === campo.id) delete updated[k];
        });
        updated[key] = campo;
        return updated;
      });

      showNotification("Campo asignado.");
    }
  }, [previewSide, showNotification]);


  const guardarAsignaciones = async () => {
    const asignacionesList = Object.entries(asignaciones).map(([key, campo]) => {
      const [ladoTexto, idUbicacionCampo] = key.split("-");
      const lado = ladoTexto === "frente"; // Convertimos a booleano
  
      return {
        idUbicacionCampo: parseInt(idUbicacionCampo),
        lado,
        caracteristica: campo.descripcion
      };
    });
  
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch("http://localhost:4000/api/credencial/campos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          idFichaRegistro: selectedFicha.id,
          campos: asignacionesList,
          fechaVigencia: new Date(),  // Ajusta si tienes un campo real
          idObjeto: 1  // Ajusta según sea necesario
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al guardar campos: ${response.status} - ${errorText}`);
      }
  
      showNotification("Asignaciones guardadas exitosamente");
      navigate("/diseñadorCredencial", {
        state: { fichaSeleccionada: selectedFicha, asignaciones }
      });
  
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };
  

  const handleEliminarAsignacion = useCallback((cellId) => {
    const key = `${previewSide}-${cellId}`;
    setAsignaciones(prev => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
    showNotification("Campo removido.");
  }, [previewSide, showNotification]);

  const handleClearAll = useCallback(() => {
    if (window.confirm("¿Limpiar todas las asignaciones?")) {
      setAsignaciones({});
      showNotification("Asignaciones limpiadas");
    }
  }, [showNotification]);

  return (
    <div className="container-fluid">

      <BotonRegresar to="/credencialView" text="Regresar"  />

      {selectedFicha && (
        <div className="text-center my-3">
          <h3>Ficha Seleccionada: {selectedFicha.title}</h3>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="row">
        <div className="col-md-4">
          <div className="d-flex gap-3 mb-3">
            <Button
              variant="success"
              onClick={guardarAsignaciones}>
            
              Terminar
            </Button>
            <Button
              variant="secondary"
              onClick={handleClearAll}
            >
              Limpiar
            </Button>
          </div>
          
          <h4 className="text-center my-3">Campos Disponibles</h4>
          <div className="mt-4" style={{ maxHeight: "400px", overflowY: "auto" }}>            {camposPendientes
              // Eliminamos el filtro por lado
              .map(campo => (
                <FieldCard 
                  key={campo.id} 
                  campo={campo} 
                  onDragStart={handleDragStart} 
                />
              ))}
          </div>
        </div>

        <div className="col-md-6">
          <h4 className="text-center my-3">Previsualización</h4>
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
            className="mx-auto p-2"
            style={{
              backgroundImage: `url(${fondoCredencial})`,
              backgroundSize: "cover",
              width: "750px",
              height: "450px",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "5px",
              border: "3px solid black",
              padding: "10px",
              backgroundColor: "#ffffff",
            }}
          >
            {ubicaciones.map(ubicacion => (
              <DropZone
                key={ubicacion.idUbicacionCampo}
                ubicacion={ubicacion}
                asignacion={asignaciones[`${previewSide}-${ubicacion.idUbicacionCampo}`]}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDelete={handleEliminarAsignacion}
              />
            ))}
          </div>
        </div>
      </div>

      <Toast 
        show={showToast} 
        onClose={() => setShowToast(false)} 
        className="position-fixed bottom-0 end-0 m-3"
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
};

export default AsignacionCampos;