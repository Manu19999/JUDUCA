import React, { useState } from "react";
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

    setPlantillas([...plantillas, nuevaPlantilla]);
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
              className="form-control"
              value={nombrePlantilla}
              onChange={(e) => setNombrePlantilla(e.target.value)}
              required
            />
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
          <div style={{ width: "400px", height: "490px" }}>
            <div style={estiloCredencial}>
              <strong>Nombre: Juan Pérez</strong>
              <p>ID: 123456</p>
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
                  <table className="table table-hover table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Fuente</th>
                        <th>Tamaño</th>
                        <th>Color Texto</th>
                        <th>Color Fondo</th>
                        <th>Acciones</th>
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
                            <button className="btn btn-warning btn-sm me-2">
                              Editar
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
