import { useState, useEffect } from "react";

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
    <div className="container">
      <h3 className="text-center">Diseño de Credencial</h3>

      {/* FORMULARIO PARA INGRESAR DATOS */}
      <div className="form-group">
        <label>Ubicación:</label>
        <select
          className="form-control"
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
      </div>

      <div className="form-group mt-2">
        <label>Descripción:</label>
        <input
          type="text"
          className="form-control"
          placeholder="Escribir descripción..."
          value={nuevaDescripcion}
          onChange={(e) => setNuevaDescripcion(e.target.value)}
        />
      </div>

      <button className="btn btn-primary mt-3" onClick={handleGuardar}>
        Guardar
      </button>

      {/* VISTA PREVIA */}
      <h4 className="text-center mt-4">Vista previa de la plantilla</h4>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "5px",
          maxWidth: "450px",
          margin: "auto",
          border: "2px solid black",
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
  );
};

export default DiseñoCredencial;
