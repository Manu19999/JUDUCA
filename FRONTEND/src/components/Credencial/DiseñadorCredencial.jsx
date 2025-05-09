import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import fondoCredencial from "../../assets/FondosCredencial/circulitos.png";
import BotonRegresar from "../../components/Dashboard/BotonRegresar";

const DiseñadorCredencial = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [previewSide, setPreviewSide] = useState("frente");
  const [asignaciones, setAsignaciones] = useState({});
  const [ubicaciones, setUbicaciones] = useState([]);
  const printRef = useRef();
  const [selectedFicha, setSelectedFicha] = useState(() => {
    return location.state?.selectedFicha || JSON.parse(localStorage.getItem("selectedFicha"));
  });


  useEffect(() => {
    if (!selectedFicha?.idFichaRegistro) {
      console.log("No se ha seleccionado una ficha");
      return;
    }
    // Hacer la llamada a la API...
  }, [selectedFicha]);

  useEffect(() => {
    if (selectedFicha) {
      localStorage.setItem("selectedFicha", JSON.stringify(selectedFicha));
    }
  }, [selectedFicha]);

  useEffect(() => {
    const fetchAsignaciones = async () => {
      try {
        if (!selectedFicha?.id) return;

        const response = await fetch(
          `http://localhost:4000/api/credencial/diseCredencial/${selectedFicha.id}`
        );

        if (!response.ok) throw new Error("Error al obtener diseño de credencial");

        const result = await response.json();

        console.log("Datos recibidos del diseño de credencial:", result.data); // 👈 Aquí ves la data

        const asignacionesMap = {};
        if (Array.isArray(result.data)) {
          result.data.forEach((item) => {
            const lado = parseInt(item.lado, 10) === 1 ? "frente" : "trasero";
            const clave = `${item.lado ? "frente" : "trasero"}-${item.idUbicacionCampo}`;
            asignacionesMap[clave] = {
              idCampoCredencial: item.idCampoCredencial,
              descripcion: item.caracteristica,
            };
          });
        }

        setAsignaciones(asignacionesMap);
      } catch (error) {
        console.error("Error cargando diseño:", error);
      }
    };

    fetchAsignaciones();
  }, [selectedFicha]);

  // Obtener ubicaciones desde API
  useEffect(() => {
    const fetchUbicaciones = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/credencial/ubicacionCampos");
        if (!response.ok) throw new Error("Error al obtener ubicaciones");
        const data = await response.json();
        if (Array.isArray(data.data)) {
          setUbicaciones(data.data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchUbicaciones();
  }, []);

  const handlePrint = () => {
  const printContents = printRef.current.innerHTML;
  const originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
  window.location.reload(); // Recargar para volver al estado original
};

  const handleVolver = () => {
    navigate("/AsignacionCampos", {
      state: {
        selectedFicha: selectedFicha,
      },
    });
  };

  return (
    <div className="container-fluid">
      <BotonRegresar
        to="/AsignacionCampos"
        text="Regresar"
        onClick={handleVolver}
      />


      {selectedFicha ? (
        <>
          <div className="text-center mb-4">
            <h3 className="fw-bold text-primary">
              Diseño de la credencial: {selectedFicha.title || "Sin título"}
              <div className="text-center my-3">
                <button className="btn btn-success" onClick={handlePrint}>
                  Imprimir Credencial
                </button>
              </div>
            </h3>

            <Form.Check
              type="switch"
              id="switch-preview-side"
              label={`Vista ${previewSide === "frente" ? "Frontal" : "Trasera"}`}
              checked={previewSide === "trasero"}
              onChange={(e) =>
                setPreviewSide(e.target.checked ? "trasero" : "frente")
              }
              className="d-inline-block mt-2"
              style={{ fontSize: "1rem" }}
            />
          </div>


          {/* Contenedor con fondo y cuadrícula superpuesta */}
          <div ref={printRef}>
            <div
              className="mx-auto position-relative"
              style={{
                width: "750px",
                height: "450px",
                backgroundImage: `url(${fondoCredencial})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                border: "3px solid black",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <div
                className="position-absolute top-0 start-0 w-100 h-100 d-grid"
                style={{
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gridTemplateRows: "repeat(3, 1fr)",
                  gap: "5px",
                  padding: "10px",
                }}
              >
                {ubicaciones.map((ubicacion) => {
                  const clave = `${previewSide}-${ubicacion.idUbicacionCampo}`;
                  const campo = asignaciones[clave];

                  return (
                    <div
                      key={ubicacion.idUbicacionCampo}
                      className="p-2 border rounded text-center"
                      style={{
                        backgroundColor: campo ? "#cfe2ff" : "rgba(255,255,255,0.6)",
                        color: campo ? "#084298" : "#6c757d",
                        border: campo ? "2px solid #084298" : "1px dashed #ced4da",
                        minHeight: "80px",
                        fontWeight: campo ? "bold" : "normal",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.9rem",
                      }}
                    >
                      {campo ? campo.descripcion : <small>{ubicacion.descripcion}</small>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-muted mt-4">
          <p>No se ha seleccionado una ficha para mostrar la vista previa.</p>
        </div>
      )}
    </div>
  );
};

export default DiseñadorCredencial;
