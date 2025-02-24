import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../../styles/Evento/Eventos.css";

const FormularioFichas = () => {
  const [secciones, setSecciones] = useState([]);
  const [nuevoCampo, setNuevoCampo] = useState({
    nombre: "",
    tipo: "text",
    opciones: "",
    seccionId: "",
  });
  const [nuevaSeccion, setNuevaSeccion] = useState("");
  const [editando, setEditando] = useState({ seccionId: null, campoId: null });
  const [valorEditando, setValorEditando] = useState("");

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

  const editarSeccion = (id, nuevoNombre) => {
    setSecciones(
      secciones.map((sec) =>
        sec.id === id ? { ...sec, nombre: nuevoNombre } : sec
      )
    );
  };

  const eliminarSeccion = (id) => {
    setSecciones(secciones.filter((sec) => sec.id !== id));
  };

  const agregarCampo = () => {
    if (!nuevoCampo.nombre || !nuevoCampo.seccionId) return;
    setSecciones((prev) =>
      prev.map((sec) =>
        sec.id === Number(nuevoCampo.seccionId)
          ? {
              ...sec,
              campos: [...sec.campos, { ...nuevoCampo, id: Date.now() }],
            }
          : sec
      )
    );
    setNuevoCampo({ nombre: "", tipo: "text", opciones: "", seccionId: "" });
  };

  const editarCampo = (seccionId, campoId, nuevoNombre) => {
    setSecciones((prev) =>
      prev.map((sec) =>
        sec.id === seccionId
          ? {
              ...sec,
              campos: sec.campos.map((campo) =>
                campo.id === campoId ? { ...campo, nombre: nuevoNombre } : campo
              ),
            }
          : sec
      )
    );
  };

  const eliminarCampo = (seccionId, campoId) => {
    setSecciones((prev) =>
      prev.map((sec) =>
        sec.id === seccionId
          ? {
              ...sec,
              campos: sec.campos.filter((campo) => campo.id !== campoId),
            }
          : sec
      )
    );
  };

  const abrirEdicion = (seccionId, campoId, valor) => {
    setEditando({ seccionId, campoId });
    setValorEditando(valor);
  };

  const guardarEdicion = () => {
    if (editando.campoId === null) {
      editarSeccion(editando.seccionId, valorEditando);
    } else {
      editarCampo(editando.seccionId, editando.campoId, valorEditando);
    }
    setEditando({ seccionId: null, campoId: null });
    setValorEditando("");
  };

  const guardarFicha = () => {
    const fichaData = {
      nombreFicha: "Ficha de Registro",
      secciones,
    };
    console.log("Guardando ficha:", fichaData);
    alert("Ficha guardada con éxito!");
  };

  return (
    <div className="contenedor-fichas">
      {/* Panel Izquierdo: Configuración y edición */}
      <div className="ficha-izquierda">
        <h2>Características de las Fichas de Registro</h2>
        {secciones.map((seccion) => (
          <div key={seccion.id} className="seccion">
            <div className="seccion-header">
              <span>{seccion.nombre}</span>
              <div className="botones-editar-eliminar">
                <button
                  className="editar-btn"
                  onClick={() => abrirEdicion(seccion.id, null, seccion.nombre)}
                >
                  <FaEdit style={{ color: "black" }} />
                </button>
                <button
                  className="eliminar-btn"
                  onClick={() => eliminarSeccion(seccion.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            {seccion.campos.map((campo) => (
              <div key={campo.id} className="campo">
                <label>
                  <span>{campo.nombre}</span>
                  <div className="botones-editar-eliminar">
                    <button
                      className="editar-btn"
                      onClick={() =>
                        abrirEdicion(seccion.id, campo.id, campo.nombre)
                      }
                    >
                      <FaEdit style={{ color: "black" }} />
                    </button>
                    <button
                      className="eliminar-btn"
                      onClick={() => eliminarCampo(seccion.id, campo.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </label>
                {campo.tipo === "text" && <input type="text" disabled />}
                {campo.tipo === "number" && <input type="number" disabled />}
                {campo.tipo === "select" && (
                  <select disabled>
                    {campo.opciones ? (
                      campo.opciones
                        .split(",")
                        .map((op, idx) => (
                          <option key={idx}>{op.trim()}</option>
                        ))
                    ) : (
                      <option>Seleccionar</option>
                    )}
                  </select>
                )}
                {campo.tipo === "file" && (
                  <input type="file" accept=".pdf,.png,.jpg" disabled />
                )}
              </div>
            ))}
          </div>
        ))}

        {/* Formulario para nueva sección */}
        <div className="nueva-seccion">
          <input
            type="text"
            placeholder="Nombre de la Sección"
            value={nuevaSeccion}
            onChange={(e) => setNuevaSeccion(e.target.value)}
          />
          <button onClick={agregarSeccion}>Agregar Sección</button>
        </div>

        {/* Formulario para nuevo campo */}
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
            <option value="file">Archivo (PDF, PNG, JPG)</option>
          </select>
          {nuevoCampo.tipo === "select" && (
            <input
              type="text"
              placeholder="Opciones (separadas por comas)"
              value={nuevoCampo.opciones}
              onChange={(e) =>
                setNuevoCampo({ ...nuevoCampo, opciones: e.target.value })
              }
            />
          )}
          <select
            value={nuevoCampo.seccionId}
            onChange={(e) =>
              setNuevoCampo({
                ...nuevoCampo,
                seccionId: Number(e.target.value),
              })
            }
          >
            <option value="">Seleccionar Sección</option>
            {secciones.map((sec) => (
              <option key={sec.id} value={sec.id}>
                {sec.nombre}
              </option>
            ))}
          </select>
          <button onClick={agregarCampo}>Agregar Campo</button>
        </div>

        <button className="guardar-btn" onClick={guardarFicha}>
          Guardar Ficha
        </button>
      </div>

      {/* Panel Derecho: Vista previa de la ficha */}
      <div className="ficha-derecha">
        <h2>Vista Previa de la Ficha de Registro</h2>
        {secciones.map((seccion) => (
          <div key={seccion.id} className="seccion">
            <h3>{seccion.nombre}</h3>
            {seccion.campos.map((campo) => (
              <div key={campo.id} className="campo">
                <label>{campo.nombre}</label>
                {campo.tipo === "text" && <input type="text" disabled />}
                {campo.tipo === "number" && <input type="number" disabled />}
                {campo.tipo === "select" && (
                  <select disabled>
                    {campo.opciones ? (
                      campo.opciones
                        .split(",")
                        .map((op, idx) => (
                          <option key={idx}>{op.trim()}</option>
                        ))
                    ) : (
                      <option>Seleccionar</option>
                    )}
                  </select>
                )}
                {campo.tipo === "file" && (
                  <input type="file" accept=".pdf,.png,.jpg" disabled />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Diálogo de edición */}
      {editando.seccionId !== null && (
        <div className="edit-dialog">
          <input
            type="text"
            value={valorEditando}
            onChange={(e) => setValorEditando(e.target.value)}
          />
          <button onClick={guardarEdicion}>Guardar</button>
        </div>
      )}
    </div>
  );
};

export default FormularioFichas;

/*import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../../styles/Evento/Eventos.css";

const FormularioFichas = () => {
  const [secciones, setSecciones] = useState([]);
  const [nuevoCampo, setNuevoCampo] = useState({
    nombre: "",
    tipo: "text",
    opciones: "",
    seccionId: "",
  });
  const [nuevaSeccion, setNuevaSeccion] = useState("");

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

  const agregarCampo = () => {
    if (!nuevoCampo.nombre || !nuevoCampo.seccionId) return;
    setSecciones((prev) =>
      prev.map((sec) =>
        sec.id === Number(nuevoCampo.seccionId)
          ? {
              ...sec,
              campos: [...sec.campos, { ...nuevoCampo, id: Date.now() }],
            }
          : sec
      )
    );
    setNuevoCampo({ nombre: "", tipo: "text", opciones: "", seccionId: "" });
  };

  const eliminarSeccion = (id) => {
    setSecciones(secciones.filter((sec) => sec.id !== id));
  };

  const eliminarCampo = (seccionId, campoId) => {
    setSecciones((prev) =>
      prev.map((sec) =>
        sec.id === seccionId
          ? {
              ...sec,
              campos: sec.campos.filter((campo) => campo.id !== campoId),
            }
          : sec
      )
    );
  };

  return (
    <div className="contenedor-fichas">
      <div className="ficha-izquierda">
        <h2>Características de las Fichas de Registro</h2>
        {secciones.map((seccion) => (
          <div key={seccion.id} className="seccion">
            <div className="seccion-header">
              <input type="text" value={seccion.nombre} readOnly />
              <div className="botones-editar-eliminar">
                <button className="editar-btn">
                  <FaEdit style={{ color: "black" }} />
                </button>
                <button
                  className="eliminar-btn"
                  onClick={() => eliminarSeccion(seccion.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            {seccion.campos.map((campo) => (
              <div key={campo.id} className="campo">
                <label>
                  <input type="text" value={campo.nombre} readOnly />
                  <div className="botones-editar-eliminar">
                    <button className="editar-btn">
                      <FaEdit style={{ color: "black" }} />
                    </button>
                    <button
                      className="eliminar-btn"
                      onClick={() => eliminarCampo(seccion.id, campo.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </label>
                {campo.tipo === "text" && <input type="text" />}
                {campo.tipo === "number" && <input type="number" />}
                {campo.tipo === "select" && (
                  <select>
                    {campo.opciones.split(",").map((op, idx) => (
                      <option key={idx}>{op.trim()}</option>
                    ))}
                  </select>
                )}
                {campo.tipo === "file" && (
                  <input type="file" accept=".pdf,.png,.jpg" />
                )}
              </div>
            ))}
          </div>
        ))}

        <div className="nueva-seccion">
          <input
            type="text"
            placeholder="Nombre de la Sección"
            value={nuevaSeccion}
            onChange={(e) => setNuevaSeccion(e.target.value)}
          />
          <button onClick={agregarSeccion}>Agregar Sección</button>
        </div>

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
            <option value="file">Archivo (PDF, PNG, JPG)</option>
          </select>
          {nuevoCampo.tipo === "select" && (
            <input
              type="text"
              placeholder="Opciones (separadas por comas)"
              value={nuevoCampo.opciones}
              onChange={(e) =>
                setNuevoCampo({ ...nuevoCampo, opciones: e.target.value })
              }
            />
          )}
          <select
            value={nuevoCampo.seccionId}
            onChange={(e) =>
              setNuevoCampo({
                ...nuevoCampo,
                seccionId: Number(e.target.value),
              })
            }
          >
            <option value="">Seleccionar Sección</option>
            {secciones.map((sec) => (
              <option key={sec.id} value={sec.id}>
                {sec.nombre}
              </option>
            ))}
          </select>
          <button onClick={agregarCampo}>Agregar Campo</button>
        </div>

        <button className="guardar-btn">Guardar Ficha</button>
      </div>
    </div>
  );
};

export default FormularioFichas;

*/

/*import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../../styles/Evento/Eventos.css";

const FormularioFichas = () => {
  const [secciones, setSecciones] = useState([]);
  const [nuevoCampo, setNuevoCampo] = useState({
    nombre: "",
    tipo: "text",
    seccionId: "",
  });
  const [nuevaSeccion, setNuevaSeccion] = useState("");
  const [editando, setEditando] = useState({ seccionId: null, campoId: null });
  const [valorEditando, setValorEditando] = useState("");

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

  const editarSeccion = (id, nuevoNombre) => {
    setSecciones(
      secciones.map((sec) =>
        sec.id === id ? { ...sec, nombre: nuevoNombre } : sec
      )
    );
  };

  const eliminarSeccion = (id) => {
    setSecciones(secciones.filter((sec) => sec.id !== id));
  };

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

  const editarCampo = (seccionId, campoId, nuevoNombre) => {
    setSecciones((prev) =>
      prev.map((sec) =>
        sec.id === seccionId
          ? {
              ...sec,
              campos: sec.campos.map((campo) =>
                campo.id === campoId ? { ...campo, nombre: nuevoNombre } : campo
              ),
            }
          : sec
      )
    );
  };

  const eliminarCampo = (seccionId, campoId) => {
    setSecciones((prev) =>
      prev.map((sec) =>
        sec.id === seccionId
          ? {
              ...sec,
              campos: sec.campos.filter((campo) => campo.id !== campoId),
            }
          : sec
      )
    );
  };

  const abrirEdicion = (seccionId, campoId, valor) => {
    setEditando({ seccionId, campoId });
    setValorEditando(valor);
  };

  const guardarEdicion = () => {
    if (editando.campoId === null) {
      editarSeccion(editando.seccionId, valorEditando);
    } else {
      editarCampo(editando.seccionId, editando.campoId, valorEditando);
    }
    setEditando({ seccionId: null, campoId: null });
    setValorEditando("");
  };

  const guardarFicha = async () => {
    const fichaData = {
      nombreFicha: "Ficha de Registro",
      secciones,
    };
    console.log("Guardando ficha:", fichaData);
    alert("Ficha guardada con éxito!");
  };

  return (
    <div className="contenedor-fichas">
      <div className="ficha-izquierda">
        <h2>Características de las Fichas de Registro</h2>
        {secciones.map((seccion) => (
          <div key={seccion.id} className="seccion">
            <div className="seccion-header">
              <span>{seccion.nombre}</span>
              <div className="botones-editar-eliminar">
                <button
                  className="editar-btn"
                  onClick={() => abrirEdicion(seccion.id, null, seccion.nombre)}
                >
                  <FaEdit />
                </button>
                <button
                  className="eliminar-btn"
                  onClick={() => eliminarSeccion(seccion.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            {seccion.campos.map((campo) => (
              <div key={campo.id} className="campo">
                <label>
                  <span>{campo.nombre}</span>
                  <div className="botones-editar-eliminar">
                    <button
                      className="editar-btn"
                      onClick={() =>
                        abrirEdicion(seccion.id, campo.id, campo.nombre)
                      }
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="eliminar-btn"
                      onClick={() => eliminarCampo(seccion.id, campo.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </label>
                {campo.tipo === "text" && <input type="text" disabled />}
                {campo.tipo === "number" && <input type="number" disabled />}
                {campo.tipo === "select" && (
                  <select disabled>
                    <option>Opción 1</option>
                    <option>Opción 2</option>
                  </select>
                )}
              </div>
            ))}
          </div>
        ))}

        <div className="nueva-seccion">
          <input
            type="text"
            placeholder="Nombre de la Sección"
            value={nuevaSeccion}
            onChange={(e) => setNuevaSeccion(e.target.value)}
          />
          <button onClick={agregarSeccion}>Agregar Sección</button>
        </div>

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
              setNuevoCampo({
                ...nuevoCampo,
                seccionId: Number(e.target.value),
              })
            }
          >
            <option value="">Seleccionar Sección</option>
            {secciones.map((sec) => (
              <option key={sec.id} value={sec.id}>
                {sec.nombre}
              </option>
            ))}
          </select>
          <button onClick={agregarCampo}>Agregar Campo</button>
        </div>

        <button className="guardar-btn" onClick={guardarFicha}>
          Guardar Ficha
        </button>
      </div>

      <div className="ficha-derecha">
        <h2>Vista Previa de la Ficha de Registro</h2>
        {secciones.map((seccion) => (
          <div key={seccion.id} className="seccion">
            <h3>{seccion.nombre}</h3>
            {seccion.campos.map((campo) => (
              <div key={campo.id} className="campo">
                <label>{campo.nombre}</label>
                {campo.tipo === "text" && <input type="text" disabled />}
                {campo.tipo === "number" && <input type="number" disabled />}
                {campo.tipo === "select" && (
                  <select disabled>
                    <option>Seleccionar</option>
                  </select>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {editando.seccionId !== null && (
        <div className="edit-dialog">
          <input
            type="text"
            value={valorEditando}
            onChange={(e) => setValorEditando(e.target.value)}
          />
          <button onClick={guardarEdicion}>Guardar</button>
        </div>
      )}
    </div>
  );
};

export default FormularioFichas;

*/
