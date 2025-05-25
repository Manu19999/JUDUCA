import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../../styles/Credencial/formularioDinamico.css";
import BotonRegresar from "../../components/Dashboard/BotonRegresar";
import "../../styles/Inicio/EventCard.css";
import Nav from "../../components/Dashboard/navDashboard";

export default function DynamicFichaForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [tiposCampo, setTiposCampo] = useState([]);
  const [catalogoCaracteristicas, setCatalogoCaracteristicas] = useState([]);
  const [seccionesCatalogo, setSeccionesCatalogo] = useState([]);
  const [opcionesPorCampo, setOpcionesPorCampo] = useState({});

  const [selectedFicha, setSelectedFicha] = useState(() => {
    return location.state?.selectedFicha || JSON.parse(localStorage.getItem("selectedFicha"));
  });
  const idFichaRegistro = selectedFicha.id;

  const [secciones, setSecciones] = useState([
    {
      id: Date.now(),
      idSeccionCatalogo: "", // ID de la sección seleccionada del catálogo
      campos: [
        {
          id: Date.now() + 1,
          idCatalogoCaracteristica: "",
          idTipoCampo: "",
          nombreDelCampo: "",
          valorPorDefecto: "",
          valorRequerido: false,
          valorPrincipal: false,
        },
      ],
    },
  ]);

const renderVistaPreviaCampo = (campo) => {
  const tipoCampo = parseInt(campo.idTipoCampo);
  const opciones = opcionesPorCampo?.[campo.id] || [];

  const inputStyle = {
    padding: "6px 10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "#f5f5f5",
    fontSize: "13px",
    width: "100%",
    marginTop: "5px",
    marginBottom: "5px",
  };

  const radioContainerStyle = {
    display: "flex",
    gap: "10px",
    marginTop: "5px",
    fontSize: "13px",
  };

  const checkboxContainerStyle = {
    display: "flex",
    gap: "10px",
    marginTop: "5px",
    fontSize: "13px",
  };

  switch (tipoCampo) {
    case 6: // TEXTO
      return <input type="text" placeholder={campo.valorPorDefecto || "TEXTO"} disabled style={inputStyle} />;

    case 7: // NÚMERO
      return <input type="number" placeholder={campo.valorPorDefecto || "NUMERO"} disabled style={inputStyle} />;

    case 8: // FECHA
      return <input type="date" value={campo.valorPorDefecto || ""} disabled style={inputStyle} />;

    case 9: // OPCIÓN MÚLTIPLE (radio buttons)
      return (
        <div style={radioContainerStyle}>
          <label>
            <input type="radio" disabled /> Opción 1
          </label>
          <label>
            <input type="radio" disabled /> Opción 2
          </label>
          <label>
            <input type="radio" disabled /> Opción 3
          </label>
        </div>
      );

    case 10: // BOOLEANO (checkbox)
      return (
        <div style={checkboxContainerStyle}>
          <label>
            <input type="checkbox" disabled checked={campo.valorPorDefecto === "true"} /> Sí
          </label>
          <label>
            <input type="checkbox" disabled checked={campo.valorPorDefecto === "false"} /> No
          </label>
        </div>
      );

    case 11: // LISTA (select simple)
      return opciones.length > 0 ? (
        <select value={campo.valorPorDefecto}  style={inputStyle}>
          <option value="">SELECCIONE UNA OPCIÓN</option>
          {opciones.map((opcion) => (
            <option key={opcion.idOpcion} value={opcion.valor}>
              {opcion.valorOpcion}
            </option>
          ))}
        </select>
      ) : (
        <span style={{ fontStyle: "italic", color: "#888" }}>{campo.valorPorDefecto || "[valor vacío]"}</span>
      );

    default:
      return <span style={{ fontStyle: "italic", color: "#888" }}>{campo.valorPorDefecto || "[valor vacío]"}</span>;
  }
};




  useEffect(() => {
    if (selectedFicha) {
      localStorage.setItem("selectedFicha", JSON.stringify(selectedFicha));
    }
  }, [selectedFicha]);



  useEffect(() => {
    const fetchCatalogos = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/fichas/catalogo/CaracteristicasFicha");
        const { secciones, tiposCampo, catalogoCaracteristicas } = res.data.data;

        setTiposCampo(tiposCampo);
        setSeccionesCatalogo(secciones);
        setCatalogoCaracteristicas(catalogoCaracteristicas);
      } catch (error) {
        console.error("Error al obtener catálogos:", error);
      }
    };

    fetchCatalogos();
  }, []);


  // Función para cargar opciones para un campo específico según su característica
  const fetchOpcionesParaCampo = async (idCampo, idCatalogoCaracteristica, idTipoCampo) => {
    // Busca el tipoCampo por id para saber si es un tipo con opciones (ejemplo: dropdown)
    const tipo = tiposCampo.find((t) => t.idTipoCampo === parseInt(idTipoCampo));

    if (!tipo) return;

    // Supongamos que el tipo que tiene opciones se llama "select" o "dropdown"
    if (
      idCatalogoCaracteristica &&
      tipo.nombre_tipo.toUpperCase().includes("LISTA") // o usa un idTipoCampo específico si sabes cuál es
    ) {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/fichas/catalogo/OpcionesCaracteristicas/${idCatalogoCaracteristica}`
        );
        // Guarda las opciones para este campo
        setOpcionesPorCampo((prev) => ({
          ...prev,
          [idCampo]: res.data.data || [],
        }));
      } catch (err) {
        console.error("Error al cargar opciones para campo", idCampo, err);
        // Limpia las opciones si falla
        setOpcionesPorCampo((prev) => ({
          ...prev,
          [idCampo]: [],
        }));
      }
    } else {
      // Si no es tipo con opciones, limpia las opciones para ese campo
      setOpcionesPorCampo((prev) => ({
        ...prev,
        [idCampo]: [],
      }));
    }
  };

  // Cuando cambie el campo idCatalogoCaracteristica o idTipoCampo, recarga las opciones
  useEffect(() => {
    secciones.forEach((sec) => {
      sec.campos.forEach((campo) => {
        fetchOpcionesParaCampo(campo.id, campo.idCatalogoCaracteristica, campo.idTipoCampo);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secciones, tiposCampo]);



  const agregarSeccion = () => {
    setSecciones([
      ...secciones,
      {
        id: Date.now(),
        idSeccionCatalogo: "",
        campos: [],
      },
    ]);
  };

  const eliminarSeccion = (id) =>
    setSecciones(secciones.filter((sec) => sec.id !== id));

  const agregarCampo = (idSeccion) => {
    setSecciones(
      secciones.map((sec) =>
        sec.id === idSeccion
          ? {
            ...sec,
            campos: [
              ...sec.campos,
              {
                id: Date.now(),
                idCatalogoCaracteristica: "",
                idTipoCampo: "",
                nombreDelCampo: "",
                valorPorDefecto: "",
                valorRequerido: false,
                valorPrincipal: false,
              },
            ],
          }
          : sec
      )
    );
  };

  const eliminarCampo = (idSeccion, idCampo) => {
    setSecciones(
      secciones.map((sec) =>
        sec.id === idSeccion
          ? {
            ...sec,
            campos: sec.campos.filter((campo) => campo.id !== idCampo),
          }
          : sec
      )
    );
  };

  const actualizarCampo = (idSeccion, idCampo, key, value) => {
    setSecciones(
      secciones.map((sec) =>
        sec.id === idSeccion
          ? {
            ...sec,
            campos: sec.campos.map((campo) =>
              campo.id === idCampo ? { ...campo, [key]: value } : campo
            ),
          }
          : sec
      )
    );
  };

  const actualizarSeccionCatalogo = (idSeccion, value) =>
    setSecciones(
      secciones.map((sec) =>
        sec.id === idSeccion ? { ...sec, idSeccionCatalogo: value } : sec
      )
    );

  const handleSubmit = async () => {
    const payload = [];

    secciones.forEach((sec) => {
      sec.campos.forEach((campo) => {
        payload.push({
          idFichaRegistro,
          idCatalogoCaracteristicas: parseInt(campo.idCatalogoCaracteristica),
          idSeccion: parseInt(sec.idSeccionCatalogo),
          idTipoCampo: parseInt(campo.idTipoCampo),
          nombreDelCampo: campo.nombreDelCampo,
          valorPorDefecto: campo.valorPorDefecto || null,
          valorRequerido: campo.valorRequerido,
          valorPrincipal: campo.valorPrincipal,
        });
      });
    });

    const token = localStorage.getItem("token");

    const body = {
      Caracteristicas: payload,
      idObjeto: 1
    };

      console.log("🔍 Datos enviados al backend:");
  console.log("Token:", token);
  console.log("Cuerpo de la solicitud:", JSON.stringify(body, null, 2));


    try {
      const res = await axios.post(
        "http://localhost:4000/api/fichas/insFichaCaracteristicas",
        body,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      alert("✅ Campos guardados correctamente");
      console.log("📦 Respuesta del servidor:", res.data);
    } catch (err) {
      console.error("❌ Error al guardar los campos:", err);
      alert("❌ Error al guardar los campos");
    }
  };






  const handleVolver = () => {
    navigate("/OpcionFicha", {
      state: {
        selectedFicha: selectedFicha
      },
    });
  };


  return (
    <div className="contenedor-principalD">
      <Nav />
      

      <BotonRegresar
        to="/OpcionFicha"
        text="Regresar"
        onClick={handleVolver}

      />
      <div className="credenciallisttitle text-center mt-3" style={{ width: '100%' }}>
        <h2>DISEÑADOR DE : {selectedFicha.title || "Ficha sin nombre"}</h2>
      </div>

      <div className="form-containerD">

        <button className="btnD agregar-seccionD" onClick={agregarSeccion}>
          ➕ AGREGAR SECCION
        </button>

        {secciones.map((sec) => (
          <div key={sec.id} className="seccion-cardD">
            <div className="seccion-headerD">
              <select
                className="select-campoD"
                value={sec.idSeccionCatalogo}
                onChange={(e) => actualizarSeccionCatalogo(sec.id, e.target.value)}
              >
                <option value="">SELECCIONE UNA SECCION</option>
                {seccionesCatalogo.map((secCat) => (
                  <option key={secCat.idSeccion} value={secCat.idSeccion}>
                    {secCat.descripcion}
                  </option>
                ))}
              </select>

              <button
                className="btn-eliminar-campoD"
                onClick={() => eliminarSeccion(sec.id)}
              >
                ❌ELIMINAR SECCION
              </button>
            </div>

            <button className="btnD agregar-campoD" onClick={() => agregarCampo(sec.id)}>
              ➕ AGREGAR CAMPO
            </button>

            {sec.campos.map((campo) => (
              <div key={campo.id} className="campo-rowD">

                <select
                  value={campo.idCatalogoCaracteristica}
                  className="select-campoD"
                  onChange={(e) =>
                    actualizarCampo(sec.id, campo.id, "idCatalogoCaracteristica", e.target.value)
                  }
                >
                  <option value="">SELECCIONE CARACTERISTICA</option>
                  {catalogoCaracteristicas.map((tipo) => (
                    <option key={tipo.idCatalogoCaracteristica} value={tipo.idCatalogoCaracteristica}>
                      {tipo.caracteristica}
                    </option>
                  ))}
                </select>

                <select
                  value={campo.idTipoCampo}
                  className="select-campoD"
                  onChange={(e) =>
                    actualizarCampo(sec.id, campo.id, "idTipoCampo", e.target.value)
                  }
                >
                  <option value="">SELECCIONE TIPO DE CAMPO</option>
                  {tiposCampo.map((tipo) => (
                    <option key={tipo.idTipoCampo} value={tipo.idTipoCampo}>
                      {tipo.nombre_tipo}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  className="input-campoD"
                  placeholder="NOMBRE DEL CAMPO"
                  value={campo.nombreDelCampo}
                  onChange={(e) =>
                    actualizarCampo(sec.id, campo.id, "nombreDelCampo", e.target.value)
                  }
                />

                <input
                  type="text"
                  className="input-campoD"
                  placeholder="VALOR POR DEFECTO"
                  value={campo.valorPorDefecto}
                  onChange={(e) =>
                    actualizarCampo(sec.id, campo.id, "valorPorDefecto", e.target.value)
                  }
                />

                <label className="checkbox-labelD">
                  <input
                    type="checkbox"
                    checked={campo.valorRequerido}
                    onChange={(e) =>
                      actualizarCampo(sec.id, campo.id, "valorRequerido", e.target.checked)
                    }
                  />
                  REQUERIDO
                </label>

                <label className="checkbox-labelD">
                  <input
                    type="checkbox"
                    checked={campo.valorPrincipal}
                    onChange={(e) =>
                      actualizarCampo(sec.id, campo.id, "valorPrincipal", e.target.checked)
                    }
                  />
                  PRINCIPAL
                </label>

                <button
                  className="btn-eliminar-campoD"
                  onClick={() => eliminarCampo(sec.id, campo.id)}
                >
                  ❌ELIMINAR CAMPO
                </button>
              </div>
            ))}
          </div>
        ))}



        <button className="btnD guardarD" onClick={handleSubmit}>
          Guardar
        </button>
      </div>

      {/* Vista previa */}
      <div className="preview-containerD">
        <h2>VISTA PREVIA</h2>

        {secciones.map((sec) => {
          const seccionInfo = seccionesCatalogo.find((s) => s.idSeccion === parseInt(sec.idSeccionCatalogo));
          return (
            <div key={sec.id} className="preview-seccionD">
              <h3>{seccionInfo?.descripcion || "Sin sección"}</h3>
              {sec.campos.map((campo) => {
                const caracteristica = catalogoCaracteristicas.find(
                  (c) => c.idCatalogoCaracteristica === parseInt(campo.idCatalogoCaracteristica)
                );
                return (
                  <div key={campo.id} className="preview-campoD">
                    <label>
                      <strong>{campo.nombreDelCampo || caracteristica?.caracteristica || "Sin nombre"} :
                      </strong>
                      {renderVistaPreviaCampo(campo)}
                    </label>

                    {/* Mostrar si es requerido */}
                    {campo.valorRequerido && (
                      <span className="required-badge">Requerido</span>
                    )}

                    {/* Mostrar si es principal */}
                    {campo.valorPrincipal && (
                      <span className="principal-badge">Principal</span>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );

}
