import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fondoCredencial from "../../assets/FondosCredencial/circulitos.png";
import { FaArrowLeft } from "react-icons/fa";

const DiseñoCredencial = () => {
  const navigate = useNavigate();
  
  // Cargar datos del participante
  const [participante, setParticipante] = useState(() => {
    const savedData = localStorage.getItem("participanteSeleccionado");
    return savedData ? JSON.parse(savedData) : {};
  });

  // Cargar campos credencial y sus ubicaciones
  const [campos, setCampos] = useState(() => {
    const savedCampos = localStorage.getItem("camposCredencial");
    return savedCampos ? JSON.parse(savedCampos) : [];
  });

  // Estados para checkboxes
  const [camposSeleccionados, setCamposSeleccionados] = useState({});

  const handleCheckboxChange = (campoId) => {
    setCamposSeleccionados((prev) => ({
      ...prev,
      [campoId]: !prev[campoId],
    }));
  };

  return (
    <div className="container mt-4">
      <button className="btn btn-primary mb-3" onClick={() => navigate("/confCredencial")}>
        <FaArrowLeft size={20} /> Regresar
      </button>
      
      <div className="row g-4">
        {/* Datos del participante */}
        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <h4 className="text-center">Datos del Participante</h4>
            <hr />
            {Object.entries(participante).map(([key, value]) => (
              <p key={key} className="mb-1"><strong>{key}:</strong> {value}</p>
            ))}
          </div>
        </div>

        {/* Checkboxes para seleccionar campos */}
        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <h4 className="text-center">Seleccionar Campos</h4>
            <hr />
            {campos.map((campo) => (
              <div key={campo.id} className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={!!camposSeleccionados[campo.id]}
                  onChange={() => handleCheckboxChange(campo.id)}
                />
                <label className="form-check-label">{campo.nombre}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Vista previa de credencial */}
        <div className="col-md-4">
          <div className="card shadow-sm p-3 text-center">
            <h4>Vista Previa</h4>
            <hr />
            <div
              style={{
                backgroundImage: `url(${fondoCredencial})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "grid",
                width: "350px",
                height: "220px",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "5px",
                border: "3px solid black",
                padding: "10px",
                borderRadius: "10px",
                margin: "auto"
              }}
            >
              {campos.map((campo) => (
                <div
                  key={campo.id}
                  style={{
                    border: "1px solid gray",
                    minHeight: "50px",
                    textAlign: "center",
                    padding: "5px",
                    backgroundColor: camposSeleccionados[campo.id] ? "#d1ecf1" : "#fff",
                    fontWeight: camposSeleccionados[campo.id] ? "bold" : "normal",
                    color: camposSeleccionados[campo.id] ? "#0c5460" : "black"
                  }}
                >
                  {camposSeleccionados[campo.id] ? campo.nombre : ""}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseñoCredencial;
