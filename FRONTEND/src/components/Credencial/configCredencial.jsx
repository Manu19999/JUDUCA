import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ConfiguracionCredencial = () => {
  const [tipoFuente, setTipoFuente] = useState("Arial");
  const [tamañoFuente, setTamañoFuente] = useState("14px");
  const [colorTexto, setColorTexto] = useState("#000000");
  const [colorFondo, setColorFondo] = useState("#ffffff");


  // Estilos dinámicos para la credencial
  const estiloCredencial = {
    fontFamily: tipoFuente,
    fontSize: tamañoFuente,
    color: colorTexto,
    backgroundColor: colorFondo,
    padding: "20px",
    border: "2px solid black",
    borderRadius: "10px",
    textAlign: "center",
    width: "400px",
    height: "250px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div className="container">
      <h3>Configuración de Credencial</h3>

      {/* Controles para personalizar la credencial */}
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Nombre Plantilla:</label>
            <select
              className=""
              value={tipoFuente}
              onChange={(e) => setTipoFuente(e.target.value)}
            >
  
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Tamaño de Fuente:</label>
            <input
              type="number"
              className="form-control"
              value={parseInt(tamañoFuente)}
              onChange={(e) => setTamañoFuente(`${e.target.value}px`)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Color de Texto:</label>
            <input
              type="color"
              className="form-control form-control-color"
              value={colorTexto}
              onChange={(e) => setColorTexto(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Color de Fondo:</label>
            <input
              type="color"
              className="form-control form-control-color"
              value={colorFondo}
              onChange={(e) => setColorFondo(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <div className="d-flex justify-content-center mt-4">
              <div style={estiloCredencial}>
                <strong>Nombre: Juan Pérez</strong>
                <p>ID: 123456</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button className="btn btn-primary mt-3">Guardar Configuración</button>
    </div>
  );
};

export default ConfiguracionCredencial;
