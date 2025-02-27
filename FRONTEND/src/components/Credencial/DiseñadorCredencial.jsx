import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import fondoCredencial from "../../assets/FondosCredencial/circulitos.png";

const credencialReducer = (state, action) => {
  switch (action.type) {
    case "SET_EVENTO":
      return { ...state, eventoSeleccionado: action.payload, fichaSeleccionada: null };
    case "SET_FICHA":
      return { ...state, fichaSeleccionada: action.payload };
    case "SET_CAMPO_UBICACION":
      return {
        ...state,
        camposUbicaciones: {
          ...state.camposUbicaciones,
          [action.payload.ubicacion]: action.payload.campo,
        },
      };
    default:
      return state;
  }
};

const VistaPreviaCredencial = ({ camposUbicaciones, persona, handleDrop, handleDragOver }) => {
  return (
    <div
      className="credencial"
      style={{
        backgroundImage: `url(${fondoCredencial})`,
        backgroundSize: "cover",
        width: "400px",
        height: "250px",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "5px",
        padding: "10px",
        border: "3px solid black",
        borderRadius: "10px",
      }}
    >
      {[...Array(9)].map((_, index) => (
        <div
          key={index}
          className="grid-item"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
          style={{
            border: "1px solid gray",
            textAlign: "center",
            padding: "5px",
            backgroundColor: "#e9ecef",
            borderRadius: "5px",
            minHeight: "50px",
          }}
        >
          {camposUbicaciones[index] ? (
            <strong>{camposUbicaciones[index].nombre}:</strong>
          ) : (
            "Arrastra aquí"
          )}
          <br />
          {persona && camposUbicaciones[index]
            ? persona[camposUbicaciones[index].nombre.toLowerCase()] || "Vacío"
            : "Vacío"}
        </div>
      ))}
    </div>
  );
};

const DisenoCredencial = () => {
  const [state, dispatch] = useReducer(credencialReducer, {
    eventoSeleccionado: null,
    fichaSeleccionada: null,
    camposUbicaciones: {},
  });
  const navigate = useNavigate();

  const handleDragStart = (e, campo) => {
    e.dataTransfer.setData("campo", JSON.stringify(campo));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, ubicacion) => {
    e.preventDefault();
    const campo = JSON.parse(e.dataTransfer.getData("campo"));
    dispatch({ type: "SET_CAMPO_UBICACION", payload: { ubicacion, campo } });
  };

  const eventos = [
    { id: 1, nombre: "JUDUCA" },
    { id: 2, nombre: "SUCA" },
  ];

  const camposDisponibles = [
    { id: 1, nombre: "Nombre" },
    { id: 2, nombre: "Apellido" },
    { id: 3, nombre: "DNI" },
    { id: 4, nombre: "Cargo" },
    { id: 5, nombre: "Empresa" },
  ];

  return (
    <div className="container-fluid">
      <button className="btnAgg" onClick={() => navigate("/asignacionCampos")}> <FaArrowLeft size={20} /> Regresar </button>
      <div className="row">
        <div className="col-md-4">
          <h3>Configuración de Credencial</h3>
          <label>Campos Disponibles:</label>
          <div>
            {camposDisponibles.map((campo) => (
              <div
                key={campo.id}
                draggable
                onDragStart={(e) => handleDragStart(e, campo)}
                style={{ padding: "10px", border: "1px solid #ccc", cursor: "grab" }}
              >
                {campo.nombre}
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <VistaPreviaCredencial camposUbicaciones={state.camposUbicaciones} handleDrop={handleDrop} handleDragOver={handleDragOver} />
        </div>
      </div>
    </div>
  );
};

export default DisenoCredencial;