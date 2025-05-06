import React, { useEffect, useState } from "react";
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
  const fichaSeleccionada = location.state?.fichaSeleccionada || null;

  // Obtener asignaciones iniciales
  useEffect(() => {
    const asignacionesStorage =
      location.state?.asignaciones ||
      JSON.parse(localStorage.getItem("asignaciones")) || {};
    setAsignaciones(asignacionesStorage);
  }, [location.state?.asignaciones]);

  // Guardar asignaciones en localStorage al cambiar
  useEffect(() => {
    localStorage.setItem("asignaciones", JSON.stringify(asignaciones));
  }, [asignaciones]);

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

  const handleVolver = () => {
    navigate("/AsignacionCampos", {
      state: {
        selectedFicha: fichaSeleccionada,
        asignaciones: asignaciones,
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

      {fichaSeleccionada ? (
        <>
<div className="text-center mb-4">
  <h3 className="fw-bold text-primary">
    Vista previa de la credencial: {fichaSeleccionada.title || "Sin título"}
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
