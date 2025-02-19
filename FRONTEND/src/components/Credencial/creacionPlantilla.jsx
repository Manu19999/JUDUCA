import React, { useState, } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import fondoCredencial from "../../assets/FondosCredencial/circulitos.png";


const ConfiguracionCredencial = () => {
  const [nombrePlantilla, setNombrePlantilla] = useState("");
  const [tipoFuente, setTipoFuente] = useState("Arial");
  const [tamañoFuente, setTamañoFuente] = useState("14px");
  const [colorTexto, setColorTexto] = useState("#000000");
  const [colorFondo, setColorFondo] = useState("#ffffff");
  const [estado, setEstado] = useState(false);
  const [plantillas, setPlantillas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const navigate = useNavigate();
const asignarCampos = (idPlantilla) => {
  navigate(`/diseñadorCredencial/${idPlantilla}`);
};

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

  const guardarPlantilla = () => {
    if (nombrePlantilla.trim() === "") {
      alert("El nombre de la plantilla no puede estar vacío.");
      return;
    }

    const nuevaPlantilla = {
      id: Date.now(),
      nombre: nombrePlantilla,
      tipoFuente,
      tamañoFuente,
      colorTexto,
      colorFondo,
    };

    const plantillasActualizadas = [...plantillas, nuevaPlantilla];

    // Guardar en estado
    setPlantillas(plantillasActualizadas);
  
    // Guardar en localStorage
    localStorage.setItem("plantillas", JSON.stringify(plantillasActualizadas));
  
    setNombrePlantilla("");
  };

  const eliminarPlantilla = (id) => {
    setPlantillas(plantillas.filter((plantilla) => plantilla.id !== id));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <h3 className="text-center my-3">Configuración de Credencial </h3>

          <div className="mb-3">
            <label className="form-label">NOMBRE DE PLANTILLA</label>
            <input
              type="text"
              className="form-control-credencial"
              value={nombrePlantilla}
              onChange={(e) => setNombrePlantilla(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">FUENTE</label>
            <select
              className="form-select-credencial"
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
              className="form-control-credencial"
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

          <div className="botones-container">
            <button className="btnAgg" onClick={guardarPlantilla}>
              Guardar Plantilla
            </button>
            <button
              className="btnVer"
              onClick={() => setModalVisible(true)}
            >
              Ver Plantillas
            </button>
          </div>
        </div>

        <div className="col-md-5 d-flex justify-content-center align-items-center">
          <div style={{ width: "400px", height: "400px" }}>
            <div style={estiloCredencial}>
              <strong>EJEMPLO DE PLANTILLA</strong>
              <p>EJEMPLO DE PLANTILLA</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para ver las plantillas guardadas */}
      {modalVisible && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-xl">
            {" "}
            {/* Modal más grande */}
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Plantillas Guardadas</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalVisible(false)}
                ></button>
              </div>
              <div style={{ overflowX: "auto", maxHeight: "350px" }}>

                {plantillas.length === 0 ? (
                  <p className="text-center">No hay plantillas guardadas.</p>
                ) : (
                  <table className="table-credencial table-striped table-hover table-bordered text-center" style={{ fontSize: "13px",  tableLayout: "fixed", width: "100%" }}>
                    <thead>
                      <tr>
                      <th style={{ width: "5%", whiteSpace: "nowrap" }}>#</th>
                      <th style={{ width: "10%", whiteSpace: "nowrap" }}>Nombre</th>
                      <th style={{ width: "10%", whiteSpace: "nowrap" }}>Fuente</th>
                      <th style={{ width: "5%", whiteSpace: "nowrap" }}>Tamaño</th>
                      <th style={{ width: "5%", whiteSpace: "nowrap" }}>Color Texto</th>
                      <th style={{ width: "5%", whiteSpace: "nowrap" }}>Color Fondo</th>
                      <th style={{ width: "10%", whiteSpace: "nowrap" }}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {plantillas.map((plantilla, index) => (
                        <tr key={plantilla.id}>
                          <td>{index + 1}</td>
                          <td>{plantilla.nombre}</td>
                          <td>{plantilla.tipoFuente}</td>
                          <td>{plantilla.tamañoFuente}</td>
                          <td>
                            <span
                              style={{
                                display: "inline-block",
                                width: "20px",
                                height: "20px",
                                backgroundColor: plantilla.colorTexto,
                                border: "1px solid #000",
                              }}
                            ></span>
                          </td>
                          <td>
                            <span
                              style={{
                                display: "inline-block",
                                width: "20px",
                                height: "20px",
                                backgroundColor: plantilla.colorFondo,
                                border: "1px solid #000",
                              }}
                            ></span>
                          </td>
                          <td>
                            <button className="btn btn-warning btn-sm me-2" onClick={() => asignarCampos(plantilla.id)}>
                              Seleccionar
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => eliminarPlantilla(plantilla.id)}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setModalVisible(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ConfiguracionCredencial;
