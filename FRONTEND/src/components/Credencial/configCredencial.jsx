import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import fondoCredencial from "../../assets/FondosCredencial/triangulos.png";

const ConfiguracionCredencial = () => {
  const [tipoFuente, setTipoFuente] = useState("Arial");
  const [tamañoFuente, setTamañoFuente] = useState("14px");
  const [colorTexto, setColorTexto] = useState("#000000");
  const [colorFondo, setColorFondo] = useState("#ffffff");

  // Estilos dinámicos para la credencial
  const estiloCredencial = {
    backgroundImage: `url(${fondoCredencial})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    fontFamily: tipoFuente,
    fontSize: tamañoFuente,
    color: colorTexto,
    backgroundColor: colorFondo,
    padding: "20px",
    border: "2px solid black",
    borderRadius: "10px",
    textAlign: "center",
    width: "100%", 
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div className="container-fluid">
      <h3 className="text-center my-3">Configuración de Credencial</h3>

      <div className="row">
        {/* Controles a la izquierda */}
        <div className="col-md-4">
          <div className="mb-3">
            <label className="form-label">NOMBRE DE PLANTILLA</label>
            <input type="text" className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label">FUENTE</label>
            <select
              className="form-select"
              value={tipoFuente}
              onChange={(e) => setTipoFuente(e.target.value)}
            >
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Roboto">Roboto</option>
              <option value="Courier New">Courier New</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">TAMAÑO DE FUENTE</label>
            <input
              type="number"
              className="form-control"
              value={parseInt(tamañoFuente)}
              onChange={(e) => setTamañoFuente(`${e.target.value}px`)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">COLOR DE TEXTO</label>
            <input
              type="color"
              className="form-control form-control-color"
              value={colorTexto}
              onChange={(e) => setColorTexto(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">COLOR DE FONDO</label>
            <input
              type="color"
              className="form-control form-control-color"
              value={colorFondo}
              onChange={(e) => setColorFondo(e.target.value)}
            />
          </div>

          <button className="btn btn-primary w-100 mt-3">Guardar Configuración</button>
        </div>

        {/* Vista previa ocupando más espacio */}
        <div className="col-md-8 d-flex justify-content-center align-items-center">
          <div style={{ width: "400px", height: "500px" }}>
            <div style={estiloCredencial}>
              <strong>Nombre: Juan Pérez</strong>
              <p>ID: 123456</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracionCredencial;
