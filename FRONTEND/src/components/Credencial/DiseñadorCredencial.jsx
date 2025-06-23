import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import fondoCredencial from "../../assets/FondosCredencial/circulitos.png";
import BotonRegresar from "../../components/Dashboard/BotonRegresar";
import "../../styles/Credencial/credencial.css";
import { FaCreditCard } from "react-icons/fa";
import Tabla from "../../components/Crud/Tabla.jsx";
import { fetchWithAuth } from '../../utils/api';


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

        const response = await fetchWithAuth(
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
        const response = await fetchWithAuth("http://localhost:4000/api/credencial/ubicacionCampos");
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
    window.print();
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


      <div className="no-print">
        <BotonRegresar to="/AsignacionCampos" text="Regresar" onClick={handleVolver} />
      </div>

      {selectedFicha ? (
        <>
          <div className="text-center mb-4">
            <h3>
              FORMATO DE LA CREDENCIAL : {selectedFicha.title || "Sin título"}
            </h3>
            <Form.Check
              type="switch"
              id="switch-preview-side"
              label={`Vista ${previewSide === "frente" ? "Frontal" : "Trasera"}`}
              checked={previewSide === "trasero"}
              onChange={(e) => setPreviewSide(e.target.checked ? "trasero" : "frente")}
              className="d-inline-block no-print mt-2"
              style={{ fontSize: "1rem" }}
            />
            <button style={{  display: "inline-flex", marginLeft: '40px'}} className="btn-nuevo-registro btn-sm no-print" onClick={handlePrint}>
              <FaCreditCard  />
              <span>Imprimir Diseño</span>
            </button>
          </div>

          {/* Vista previa en pantalla */}
          <div className="no-print" ref={printRef}>
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
                      key={clave}
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

          {/* Contenido para impresión */}
          <div className="d-none d-print-block">
            {["frente", "trasero"].map((lado, index) => (
              <div
                key={lado}
                className={`credencial-imprimible ${index === 0 ? "credencial-frente" : ""}`}
                style={index === 1 ? { marginTop: "6cm" } : {}}
              >
                <h5 className="text-center fw-bold mb-2">
                  {lado === "frente" ? "Frente de la credencial" : "Reverso de la credencial"}
                </h5>
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
                      const clave = `${lado}-${ubicacion.idUbicacionCampo}`;
                      const campo = asignaciones[clave];

                      return (
                        <div
                          key={clave}
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
            ))}
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
