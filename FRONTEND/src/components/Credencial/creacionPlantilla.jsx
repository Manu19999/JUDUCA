import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Credencial/credencial.css";
import fondoCredencial from "../../assets/FondosCredencial/circulitos.png";

const ConfiguracionCredencial = () => {
  const [nombrePlantilla, setNombrePlantilla] = useState("");
  const [tipoFuente, setTipoFuente] = useState("Arial");
  const [tamañoFuente, setTamañoFuente] = useState("14px");
  const [colorTexto, setColorTexto] = useState("#000000");
  const [colorFondo, setColorFondo] = useState("#ffffff");
  const [plantillas, setPlantillas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Cargar plantillas guardadas desde localStorage
    const savedPlantillas =
      JSON.parse(localStorage.getItem("plantillas")) || [];
    setPlantillas(savedPlantillas);
  }, []);

  const asignarCampos = () => {
    navigate("/AsignacionCampos");
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
    if (!nombrePlantilla.trim()) {
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

    setPlantillas(plantillasActualizadas);
    localStorage.setItem("plantillas", JSON.stringify(plantillasActualizadas));

    setNombrePlantilla("");
  };

  const eliminarPlantilla = (id) => {
    const nuevasPlantillas = plantillas.filter(
      (plantilla) => plantilla.id !== id
    );
    setPlantillas(nuevasPlantillas);
    localStorage.setItem("plantillas", JSON.stringify(nuevasPlantillas));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Configuración de Credencial */}
        <div className="col-md-4">
          <h3 className="text-center my-3">Configuración de Credencial</h3>

          <div className="mb-3">
            <label className="form-label">Nombre de Plantilla</label>
            <input
              type="text"
              className="form-control-credencial"
              value={nombrePlantilla}
              onChange={(e) => setNombrePlantilla(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Fuente</label>
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
            <label className="form-label">Tamaño de Fuente</label>
            <input
              type="number"
              className="form-control-credencial"
              value={parseInt(tamañoFuente)}
              onChange={(e) => setTamañoFuente(`${e.target.value}px`)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Color de Texto</label>
            <input
              type="color"
              className="form-control form-control-color"
              value={colorTexto}
              onChange={(e) => setColorTexto(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Color de Fondo</label>
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
            <button className="btnVer" onClick={() => setModalVisible(true)}>
              Ver Plantillas
            </button>
          </div>
        </div>

        {/* Vista previa */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div style={{ width: "400px", height: "250px" }}>
            <div style={estiloCredencial}>
              <strong>EJEMPLO DE PLANTILLA</strong>
              <p>EJEMPLO DE PLANTILLA</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de plantillas guardadas */}
      {modalVisible && (
        <div className="modal fade show d-block">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Plantillas Guardadas</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalVisible(false)}
                ></button>
              </div>
              <div className="modal-body">
                {plantillas.length === 0 ? (
                  <p className="text-center">No hay plantillas guardadas.</p>
                ) : (
                  <table className="table table-bordered text-center">
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
                              className="color-box"
                              style={{ backgroundColor: plantilla.colorTexto }}
                            ></span>
                          </td>
                          <td>
                            <span
                              className="color-box"
                              style={{ backgroundColor: plantilla.colorFondo }}
                            ></span>
                          </td>
                          <td>
                            <button
                              className="btn btn-warning btn-sm me-2"
                              onClick={asignarCampos}
                            >
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
