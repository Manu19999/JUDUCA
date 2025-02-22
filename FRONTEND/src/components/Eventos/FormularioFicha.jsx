import { useState } from "react";
import "../../styles/Evento/Eventos.css";

const FormularioFichas = () => {
  const [secciones, setSecciones] = useState([]);
  const [nuevoCampo, setNuevoCampo] = useState({
    nombre: "",
    tipo: "text",
    seccionId: "",
  });
  const [nuevaSeccion, setNuevaSeccion] = useState("");

  // Agregar nueva sección con nombre personalizado
  const agregarSeccion = () => {
    if (nuevaSeccion.trim() === "") return;
    const nueva = {
      id: Date.now(),
      nombre: nuevaSeccion,
      campos: [],
    };
    setSecciones([...secciones, nueva]);
    setNuevaSeccion("");
  };

  // Eliminar una sección
  const eliminarSeccion = (id) => {
    setSecciones(secciones.filter((sec) => sec.id !== id));
  };

  // Agregar nuevo campo a una sección
  const agregarCampo = () => {
    if (!nuevoCampo.nombre || !nuevoCampo.seccionId) return;
    setSecciones((prev) =>
      prev.map((sec) =>
        sec.id === nuevoCampo.seccionId
          ? {
              ...sec,
              campos: [...sec.campos, { ...nuevoCampo, id: Date.now() }],
            }
          : sec
      )
    );
    setNuevoCampo({ nombre: "", tipo: "text", seccionId: "" });
  };

  // Guardar ficha (simulación de API)
  const guardarFicha = async () => {
    const fichaData = {
      nombreFicha: "Ficha de Registro",
      secciones,
    };
    console.log("Guardando ficha:", fichaData);
    alert("Ficha guardada con éxito!");
  };

  return (
    <div className="ficha-form">
      <h2>Características de las Fichas de Registro</h2>

      {/* Secciones y Campos */}
      {secciones.map((seccion) => (
        <div key={seccion.id} className="seccion">
          <h3>
            {seccion.nombre}{" "}
            <button onClick={() => eliminarSeccion(seccion.id)}>❌</button>
          </h3>
          {seccion.campos.map((campo) => (
            <div key={campo.id} className="campo">
              <label>{campo.nombre}</label>
              {campo.tipo === "text" && <input type="text" />}
              {campo.tipo === "number" && <input type="number" />}
              {campo.tipo === "select" && (
                <select>
                  <option>Opción 1</option>
                  <option>Opción 2</option>
                </select>
              )}
            </div>
          ))}
        </div>
      ))}

      {/* Agregar nueva sección */}
      <div className="nueva-seccion">
        <input
          type="text"
          placeholder="Nombre de la Sección"
          value={nuevaSeccion}
          onChange={(e) => setNuevaSeccion(e.target.value)}
        />
        <button onClick={agregarSeccion}>Agregar Sección</button>
      </div>

      {/* Agregar nuevo campo */}
      <div className="nuevo-campo">
        <input
          type="text"
          placeholder="Nombre del campo"
          value={nuevoCampo.nombre}
          onChange={(e) =>
            setNuevoCampo({ ...nuevoCampo, nombre: e.target.value })
          }
        />
        <select
          value={nuevoCampo.tipo}
          onChange={(e) =>
            setNuevoCampo({ ...nuevoCampo, tipo: e.target.value })
          }
        >
          <option value="text">Texto</option>
          <option value="number">Número</option>
          <option value="select">Lista Desplegable</option>
        </select>
        <select
          value={nuevoCampo.seccionId}
          onChange={(e) =>
            setNuevoCampo({ ...nuevoCampo, seccionId: Number(e.target.value) })
          }
        >
          <option value="">Seleccionar Sección</option>
          {secciones.map((sec) => (
            <option key={sec.id} value={sec.id}>
              {sec.nombre}
            </option>
          ))}
        </select>
        <button onClick={agregarCampo}> Agregar Campo</button>
      </div>

      {/* Botones finales */}
      <button className="guardar-btn" onClick={guardarFicha}>
        Guardar Ficha
      </button>
    </div>
  );
};

export default FormularioFichas;
