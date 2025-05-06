import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import fondoCredencial from "../../assets/FondosCredencial/circulitos.png";
import BotonRegresar from "../../components/Dashboard/BotonRegresar";

const DiseñadorCredencial = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [previewSide, setPreviewSide] = useState("frente");
  const [asignaciones, setAsignaciones] = useState({});
  const [ubicaciones, setUbicaciones] = useState([]);
  const fichaSeleccionada = location.state?.fichaSeleccionada || null;

  useEffect(() => {
    // Obtener asignaciones desde location o localStorage
    const asignacionesStorage = location.state?.asignaciones || JSON.parse(localStorage.getItem("asignaciones")) || {};
    setAsignaciones(asignacionesStorage);
  }, [location.state]);

  useEffect(() => {
    // Obtener ubicaciones desde el backend
    const fetchUbicaciones = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/credencial/ubicacionCampos");
        if (!response.ok) throw new Error("Error al obtener ubicaciones");
        const data = await response.json();
        setUbicaciones(data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchUbicaciones();
  }, []);

  const handleVolver = () => {
    // Al volver, pasar las asignaciones y ficha seleccionada como estado
    navigate("/AsignacionCampos", {
      state: {
        selectedFicha: fichaSeleccionada,
        asignaciones: asignaciones // Pasar las asignaciones a la página anterior
      }
    });
  };

  return (
    <div className="container-fluid">
      {/* Usando BotonRegresar con onClick */}
      <BotonRegresar
        to="/AsignacionCampos"
        text="Volver"
        onClick={handleVolver} // Pasar handleVolver como onClick
      />

      {fichaSeleccionada && (
        <div className="text-center mb-4">
          <h3>Vista previa de la credencial: {fichaSeleccionada.title}</h3>
          <div className="text-center mb-3">
        <Form.Check
          type="switch"
          id="switch-preview-side"
          label={`Vista ${previewSide === "frente" ? "Frontal" : "Trasera"}`}
          checked={previewSide === "trasero"}
          onChange={(e) => setPreviewSide(e.target.checked ? "trasero" : "frente")}
        />
      </div>
        </div>
      )}



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
        {ubicaciones.map((ubicacion) => {
          const clave = `${previewSide}-${ubicacion.idUbicacionCampo}`;
          const campo = asignaciones[clave];

          return (
            <div
              key={ubicacion.idUbicacionCampo}
              className="p-2 border rounded text-center"
              style={{
                backgroundColor: campo ? "#d1e7dd" : "#f8f9fa",
                minHeight: "80px",
                fontWeight: campo ? "bold" : "normal",
              }}
            >
              {campo ? campo.descripcion : <small>{ubicacion.descripcion}</small>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DiseñadorCredencial;
