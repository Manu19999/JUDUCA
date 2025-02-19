import { useState, useEffect } from "react";
import fondoCredencial from "../../assets/FondosCredencial/circulitos.png";


const DiseñoCredencial = () => {
  const [ubicaciones] = useState([
    { id: 1, descripcion: "Izquierda Superior" },
    { id: 2, descripcion: "Medio Superior" },
    { id: 3, descripcion: "Derecha Superior" },
    { id: 4, descripcion: "Medio Izquierda" },
    { id: 5, descripcion: "Medio Centro" },
    { id: 6, descripcion: "Medio Derecho" },
    { id: 7, descripcion: "Izquierda Inferior" },
    { id: 8, descripcion: "Medio Inferior" },
    { id: 9, descripcion: "Derecha Inferior" },
  ]);

  // Cargar configuraciones de la plantilla desde localStorage
  const [configPlantilla, setConfigPlantilla] = useState(() => {
    const savedConfig = localStorage.getItem("configPlantilla");
    return savedConfig
      ? JSON.parse(savedConfig)
      : { colorFondo: "#00000", tipoFuente: "Arial" };
  });

  const [nuevaDescripcion, setNuevaDescripcion] = useState("");
  const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState("");
  const [asignaciones, setAsignaciones] = useState(() => {
    const savedData = localStorage.getItem("asignaciones");
    return savedData ? JSON.parse(savedData) : {};
  });

  useEffect(() => {
    localStorage.setItem("asignaciones", JSON.stringify(asignaciones));
  }, [asignaciones]);

  const handleGuardar = () => {
    if (ubicacionSeleccionada && nuevaDescripcion.trim() !== "") {
      setAsignaciones({
        ...asignaciones,
        [ubicacionSeleccionada]: { descripcion: nuevaDescripcion },
      });
      setNuevaDescripcion("");
      setUbicacionSeleccionada("");
    }
  };

  return (
    <div className="container-fluid">
         <button className="btnAgg" onClick={() => navigate(/confCredencial/)}>
            Regresar
          </button>

      <div className="row">
        <div className="col-md-4">
          <h3 className="text-center my-3">Configuración de Credencial </h3>

          {/* FORMULARIO PARA INGRESAR DATOS */}
          <div className="mb-3">
            <label className="form-label">Ubicación:</label>
            <select
              className="form-control-credencial"
              value={ubicacionSeleccionada}
              onChange={(e) => setUbicacionSeleccionada(e.target.value)}
            >
              <option value="">Seleccione ubicación</option>
              {ubicaciones.map((ubicacion) => (
                <option key={ubicacion.id} value={ubicacion.id}>
                  {ubicacion.descripcion}
                </option>
              ))}
            </select>

            <div className="mb-3">
              <label className="form-label">Descripción:</label>
              <input
                type="text"
                className="form-control-credencial"
                placeholder="Escribir descripción"
                value={nuevaDescripcion}
                onChange={(e) => setNuevaDescripcion(e.target.value)}
              />
            </div>

            <div className="botones-container">
              <button className="btnAgg" onClick={handleGuardar}>
                Guardar
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-5 d-flex justify-content-center align-items-center">

      {/* VISTA PREVIA */}
      <div
        style={{
              backgroundImage: `url(${fondoCredencial})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
          display: "grid",
          width: "400px",
          height: "250px",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "5px",
          margin: "auto",
          border: "3px solid black",
          padding: "10px",
          backgroundColor: configPlantilla.colorFondo,
          fontFamily: configPlantilla.tipoFuente,
          borderRadius: "10px",
        }}
      >
        {ubicaciones.map((ubicacion) => (
          <div
            key={ubicacion.id}
            style={{
              border: "1px solid gray",
              minHeight: "50px",
              textAlign: "center",
              padding: "5px",
              backgroundColor: "#e9ecef",
              borderRadius: "5px",
              fontFamily: configPlantilla.tipoFuente,
            }}
          >
            <strong>
              {asignaciones[ubicacion.id]?.descripcion || "Vacío"}
            </strong>
          </div>
        ))}
      </div>
        </div>

      </div>

    </div>
  );
};

export default DiseñoCredencial;
