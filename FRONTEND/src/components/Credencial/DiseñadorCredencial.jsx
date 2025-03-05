import React, { useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import fondoCredencial from "../../assets/FondosCredencial/circulitos.png";

const initialState = JSON.parse(localStorage.getItem("credencialState")) || {
  eventoSeleccionado: null,
  fichaSeleccionada: null,
  camposUbicaciones: {},
};

const credencialReducer = (state, action) => {
  switch (action.type) {
    case "SET_EVENTO":
      return { ...state, eventoSeleccionado: action.payload, fichaSeleccionada: null, camposUbicaciones: {} };
    case "SET_FICHA":
      return { ...state, fichaSeleccionada: action.payload };
    case "SET_CAMPO_UBICACION":
      return {
        ...state,
        camposUbicaciones: { ...state.camposUbicaciones, [action.payload.ubicacion]: action.payload.campo },
      };
    case "RESET_CREDENCIAL":
      return initialState;
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
  const [state, dispatch] = useReducer(credencialReducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("credencialState", JSON.stringify(state));
  }, [state]);

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

  const fichas = {
    1: [
      { id: 101, nombre: "Ficha 101", participante: { nombre: "Juan", apellido: "Pérez", dni: "123456", cargo: "Atleta", empresa: "UNAH" } },
      { id: 102, nombre: "Ficha 102", participante: { nombre: "María", apellido: "Gómez", dni: "654321", cargo: "Entrenadora", empresa: "USAC" } },
    ],
    2: [
      { id: 201, nombre: "Ficha 201", participante: { nombre: "Carlos", apellido: "Ruiz", dni: "987654", cargo: "Árbitro", empresa: "UCR" } },
    ],
  };

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
      <button className="btnReset" onClick={() => dispatch({ type: "RESET_CREDENCIAL" })}> Reiniciar </button>
      <div className="row">
        <div className="col-md-4">
          <h3>Configuración de Credencial</h3>
          <label>Selecciona un evento:</label>
          <select className="form-control" onChange={(e) => dispatch({ type: "SET_EVENTO", payload: e.target.value })}>
            <option value="">-- Selecciona un evento --</option>
            {eventos.map((evento) => (<option key={evento.id} value={evento.id}>{evento.nombre}</option>))}
          </select>
          {state.eventoSeleccionado && (
            <>
              <label>Selecciona una ficha:</label>
              <select className="form-control" onChange={(e) => {
                const ficha = fichas[state.eventoSeleccionado]?.find((f) => f.id === parseInt(e.target.value));
                dispatch({ type: "SET_FICHA", payload: ficha });
              }}>
                <option value="">-- Selecciona una ficha --</option>
                {fichas[state.eventoSeleccionado]?.map((ficha) => (<option key={ficha.id} value={ficha.id}>{ficha.nombre}</option>))}
              </select>
            </>
          )}
          <label>Campos Disponibles:</label>
          <div>
            {camposDisponibles.map((campo) => (
              <div key={campo.id} draggable onDragStart={(e) => handleDragStart(e, campo)} style={{ padding: "10px", border: "1px solid #ccc", cursor: "grab" }}>{campo.nombre}</div>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <VistaPreviaCredencial camposUbicaciones={state.camposUbicaciones} persona={state.fichaSeleccionada?.participante} handleDrop={handleDrop} handleDragOver={handleDragOver} />
        </div>
      </div>
    </div>
  );
};

export default DisenoCredencial;
