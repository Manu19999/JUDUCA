import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Alert, Form, Toast, Card } from "react-bootstrap";
import BotonRegresar from "../../components/Dashboard/BotonRegresar";
import fondoCredencial from "../../assets/FondosCredencial/circulitos.png";
import Swal from "sweetalert2";


const FieldCard = ({ campo, onDragStart }) => (
  <Card
    draggable
    onDragStart={(e) => onDragStart(e, campo)}
    className="mb-2 shadow-sm border-0"
    style={{ cursor: "grab", transition: "transform 0.2s" }}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
    <Card.Body className="d-flex align-items-center justify-content-between">
      <span className="fw-bold">{campo.descripcion}</span>
      <i className="bi bi-grip-vertical text-muted" style={{ fontSize: "1.2rem" }}></i>
    </Card.Body>
  </Card>
);

const DropZone = ({ ubicacion, asignacion, onDrop, onDragOver, onDelete }) => (
  <div
    onDragOver={onDragOver}
    onDrop={(e) => onDrop(e, ubicacion.idUbicacionCampo)}
    className={`p-3 rounded border text-center position-relative shadow-sm ${asignacion ? "bg-success bg-opacity-10" : "bg-light"}`}
    style={{ minHeight: "100px", transition: "background-color 0.3s" }}
  >
    {asignacion ? (
      <div>
        <strong>{asignacion.descripcion}</strong>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => onDelete(ubicacion.idUbicacionCampo)}
          className="position-absolute top-0 end-0 m-1 px-2 py-0"
        >
          <i className="bi bi-x-lg"></i>
        </Button>
      </div>
    ) : (
      <span className="text-muted">{ubicacion.descripcion}</span>
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

  const [selectedFicha, setSelectedFicha] = useState(() => {
    return location.state?.selectedFicha || JSON.parse(localStorage.getItem("selectedFicha"));
  });
  
  const [asignaciones, setAsignaciones] = useState({});

  const camposPendientes = useMemo(() =>
    caracteristicasFicha.filter(caracteristica =>
      !Object.values(asignaciones).some(asignado => asignado.id === caracteristica.id)
    ), [caracteristicasFicha, asignaciones]);

    useEffect(() => {
      if (selectedFicha) {
        localStorage.setItem("selectedFicha", JSON.stringify(selectedFicha));
      }
    }, [selectedFicha]);



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


  useEffect(() => {
    const obtenerAsignaciones = async () => {
      try {
        if (!selectedFicha?.id) return;

        const response = await fetch(`http://localhost:4000/api/credencial/CamposCredencial/${selectedFicha.id}`);
        if (!response.ok) throw new Error(`Error al obtener asignaciones: ${response.status}`);

        const { data } = await response.json();
        console.log(data)
        const asignacionesMap = {};
        for (const asignacion of data) {
          const key = `${asignacion.lado ? 'frente' : 'trasero'}-${asignacion.idUbicacionCampo}`;
          asignacionesMap[key] = {
            id: asignacion.idCampoCredencial,
            descripcion: asignacion.caracteristica
          };
        }

        setAsignaciones(asignacionesMap);
      } catch (error) {
        console.error("Error al obtener asignaciones desde la API:", error);
      }
    };

    obtenerAsignaciones();
  }, [selectedFicha]);


  const showNotification = useCallback((message) => {
    if (typeof message === "object") {
      setToastMessage(message.message);  // Set only the message content
      // You can also handle `type` and `duration` if needed, depending on your implementation
    } else {
      setToastMessage(message);  // Handle string messages normally
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
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

      showNotification("Campo asignado correctamente.");
    }
  }, [previewSide, showNotification]);


  const guardarAsignaciones = async () => {
  const asignacionesList = Object.entries(asignaciones).map(([key, campo]) => {
    const [ladoTexto, idUbicacionCampo] = key.split("-");
    const lado = ladoTexto === "frente";

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
        idObjeto: 1
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al guardar campos: ${response.status} - ${errorText}`);
    }

    await Swal.fire({
      icon: "success",
      title: "¡Asignaciones guardadas!",
      text: "Las asignaciones fueron registradas correctamente.",
      confirmButtonColor: "#253A69",
    });

    navigate("/diseñadorCredencial", {
      state: { fichaSeleccionada: selectedFicha }
    });

  } catch (err) {
    console.error(err);

    await Swal.fire({
      icon: "error",
      title: "Error al guardar",
      text: err.message || "Ocurrió un problema al guardar las asignaciones.",
      confirmButtonColor: "#d33",
    });

    setError(err.message);
  }
};


 const handleEliminarAsignacion = useCallback((cellId) => {
  const key = `${previewSide}-${cellId}`;
  const campo = asignaciones[key];  // Encuentra el campo asignado para la celda
  if (!campo) return;

  // Llamada al backend para eliminar el campo
  const token = localStorage.getItem("token");

  fetch("http://localhost:4000/api/credencial/deleteCampos", {
    method: "POST", // O "DELETE" dependiendo de lo que requiera el backend
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      idCampos : [campo.id],  // Envia el idCampoCredencial en lugar de idUbicacionCampo
      idFichaRegistro: selectedFicha.id,
      lado: previewSide === "frente",
      idObjeto: 1 // O el valor que necesites
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.hasError) {
        console.error("Error al eliminar campo:", data.errors);
        setError(data.errors.join(", "));
      } else {
        showNotification("Campo eliminado correctamente.");
        // Eliminarlo del estado local si es necesario
        setAsignaciones(prev => {
          const updated = { ...prev };
          delete updated[key];
          return updated;
        });
      }
    })
    .catch(err => {
      console.error("Error al eliminar campo:", err);
      setError("Error al eliminar campo.");
    });
}, [previewSide, selectedFicha.id, asignaciones, showNotification]);


const handleClearAll = useCallback(() => {
  const camposAEliminar = Object.values(asignaciones).map(campo => campo.id);

  // Si no hay asignaciones para limpiar
  if (camposAEliminar.length === 0) {
    showNotification({
      message: "¡Ups! No hay asignaciones para limpiar.",
      type: "warning",
      duration: 3000,
    });
    return;
  }

  Swal.fire({
    title: "¿Estás seguro?",
    text: "Esto eliminará todas las asignaciones de esta credencial.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#253A69",
    cancelButtonColor: "#ffcc00",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      const token = localStorage.getItem("token");

      fetch("http://localhost:4000/api/credencial/deleteCampos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          idCampos: camposAEliminar,
          idFichaRegistro: selectedFicha.id,
          lado: previewSide === "frente",
          idObjeto: 1
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.hasError) {
            console.error("Error al eliminar campos:", data.errors);
            setError(data.errors.join(", "));
            showNotification({
              message: "Hubo un problema al intentar eliminar los campos. Por favor, intenta más tarde.",
              type: "error",
              duration: 3000,
            });
          } else {
            showNotification({
              message: "¡Las asignaciones han sido eliminadas exitosamente!",
              type: "success",
              duration: 3000,
            });
            setAsignaciones({});
          }
        })
        .catch(err => {
          console.error("Error al eliminar campos:", err);
          setError("Error al eliminar campos.");
          showNotification({
            message: "¡Ocurrió un error inesperado! Por favor, intenta nuevamente.",
            type: "error",
            duration: 3000,
          });
        });
    }
  });
}, [asignaciones, showNotification, selectedFicha.id, previewSide]);

const handleVolver = () => {
  navigate("/OpcionCredencial", {
    state: {
      selectedFicha: selectedFicha
    },
  });
};

  return (
    <div className="container-fluid">

      <BotonRegresar
        to="/OpcionCredencial"
        text="Regresar"
        onClick={handleVolver}
      />

      {selectedFicha && (
        <div className="text-center my-3">
          <h3>FICHA SELECCIONADA : {selectedFicha.title}</h3>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="row">
        <div className="col-md-4">
          <div className="d-flex gap-4 mb-4">
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