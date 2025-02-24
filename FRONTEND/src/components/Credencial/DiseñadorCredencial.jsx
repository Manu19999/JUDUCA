import React, { useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Container, Row, Col } from "react-bootstrap";
import fondoCredencial from "../../assets/FondosCredencial/circulitos.png";
import { FaArrowLeft } from "react-icons/fa";

// Reducer para manejar el estado
const credencialReducer = (state, action) => {
  switch (action.type) {
    case "SET_EVENTO":
      return { ...state, eventoSeleccionado: action.payload };
    case "SET_FICHA":
      return { ...state, fichaSeleccionada: action.payload };
    case "SET_CAMPO_SELECCIONADO":
      return { ...state, campoSeleccionado: action.payload };
    default:
      return state;
  }
};

const VistaPreviaCredencial = ({ campos, persona }) => {
  return (
    <div
      className="credencial"
      style={{ backgroundImage: `url(${fondoCredencial})` }}
    >
      <div className="grid-3x3">
        {campos.map((campo) => (
          <div key={campo.id} className={`grid-item ${campo.ubicacion}`}>
            <span>
              {persona
                ? persona[campo.nombre.toLowerCase()] || "Vacío"
                : "Vacío"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const DisenoCredencial = () => {
  const [state, dispatch] = useReducer(credencialReducer, {
    eventoSeleccionado: null,
    fichaSeleccionada: null,
    campoSeleccionado: "",
  });

  const { eventoSeleccionado, fichaSeleccionada, campoSeleccionado } = state;

  const eventos = [
    { id: 1, nombre: "JUDUCA" },
    { id: 2, nombre: "SUCA" },
  ];

  const fichas = {
    1: [
      {
        id: 101,
        nombre: "Ficha 1",
        persona: {
          nombre: "Juan",
          apellido: "Pérez",
          dni: "12345678",
          cargo: "Gerente",
          empresa: "Empresa A",
          foto: "url_foto_juan",
        },
      },
      {
        id: 102,
        nombre: "Ficha 2",
        persona: {
          nombre: "Ana",
          apellido: "Gómez",
          dni: "87654321",
          cargo: "Directora",
          empresa: "Empresa B",
          foto: "url_foto_ana",
        },
      },
    ],
    2: [
      {
        id: 201,
        nombre: "Ficha 3",
        persona: {
          nombre: "Carlos",
          apellido: "López",
          dni: "11223344",
          cargo: "Analista",
          empresa: "Empresa C",
          foto: "url_foto_carlos",
        },
      },
      {
        id: 202,
        nombre: "Ficha 4",
        persona: {
          nombre: "María",
          apellido: "Martínez",
          dni: "44332211",
          cargo: "Supervisora",
          empresa: "Empresa D",
          foto: "url_foto_maria",
        },
      },
    ],
  };

  const camposDisponibles = [
    { id: 1, nombre: "Nombre", ubicacion: "arriba-izquierda" },
    { id: 2, nombre: "Apellido", ubicacion: "arriba-centro" },
    { id: 3, nombre: "DNI", ubicacion: "arriba-derecha" },
    { id: 4, nombre: "Cargo", ubicacion: "medio-izquierda" },
    { id: 5, nombre: "Empresa", ubicacion: "centro-exacto" },
    { id: 6, nombre: "Foto", ubicacion: "medio-derecha" },
  ];

  const navigate = useNavigate();

  // Obtener la persona asociada a la ficha seleccionada
  const personaSeleccionada = fichaSeleccionada
    ? fichas[eventoSeleccionado]?.find(
        (ficha) => ficha.id === parseInt(fichaSeleccionada)
      )?.persona
    : null;

  return (
      <div className="container-fluid2">
        <button
          className="btnAgg"
          onClick={() => navigate("/asignacionCampos")}
          style={{ marginBottom: "10px" }}
        >
          <FaArrowLeft size={20} /> Regresar
        </button>

        <div className="row">
          {/* Configuración de Credencial */}
          <div className="col-md-4">
            <h3 className="text-center my-3">Configuración de Credencial</h3>

            <div className="mb-3">
              <label className="form-label">Evento:</label>
              <select
                className="form-control-credencial"
                onChange={(e) =>
                  dispatch({ type: "SET_EVENTO", payload: e.target.value })
                }
              >
                <option value="">Seleccione un evento</option>
                {eventos.map((evento) => (
                  <option key={evento.id} value={evento.id}>
                    {evento.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Ficha:</label>
              <select
                className="form-control-credencial"
                onChange={(e) =>
                  dispatch({ type: "SET_FICHA", payload: e.target.value })
                }
                disabled={!eventoSeleccionado}
              >
                <option value="">Seleccione una ficha</option>
                {eventoSeleccionado &&
                  fichas[eventoSeleccionado]?.map((ficha) => (
                    <option key={ficha.id} value={ficha.id}>
                      {ficha.nombre}
                    </option>
                  ))}
              </select>
            </div>
            <div className="botones-container">
              <button className="btnAgg">
                Guardar
              </button>
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div style={{ width: "400px", height: "250px" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <VistaPreviaCredencial
                  campos={camposDisponibles}
                  persona={personaSeleccionada}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default DisenoCredencial;
