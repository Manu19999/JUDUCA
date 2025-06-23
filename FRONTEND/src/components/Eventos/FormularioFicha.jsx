import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../../styles/Credencial/formularioDinamico.css";
import BotonRegresar from "../../components/Dashboard/BotonRegresar";
import "../../styles/Inicio/EventCard.css";
import Nav from "../../components/Dashboard/navDashboard";
import Swal from "sweetalert2";
import { fetchWithAuth } from '../../utils/api';

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
      fontSize: "15px",
    };

    switch (tipoCampo) {
      case 6: // TEXTO
        return <input type="text" placeholder={campo.valorPorDefecto || "TEXTO"} disabled style={inputStyle} />;

      case 7: // NÚMERO
        return <input type="number" placeholder={campo.valorPorDefecto || "NUMERO"} disabled style={inputStyle} />;

      case 8: // FECHA
        return <input type="date" value={campo.valorPorDefecto || ""} disabled style={inputStyle} />;

      case 9: // OPCIÓN MÚLTIPLE (radio buttons)
        return opciones.length > 0 ? (
          <div style={radioContainerStyle}>
            {opciones.map((opcion) => (
              <label key={opcion.idOpcion}>
                <input type="radio" name={`campo-${campo.id}`} disabled />
                {opcion.valorOpcion}
              </label>
            ))}
          </div>
        ) : (
          <span style={{ fontStyle: "italic", color: "#888" }}>{campo.valorPorDefecto || "[sin opciones]"}</span>
        );

      case 10: // BOOLEANO
        return (
          <div style={checkboxContainerStyle}>
            <label>
              <input type="checkbox" style={{ width: '20px', height: '11px' }} disabled checked={campo.valorPorDefecto === "true"} />
              {"Sí / No"}
            </label>
          </div>
        );

      case 11: // LISTA (select simple)
        return opciones.length > 0 ? (
          <select value={campo.valorPorDefecto} style={inputStyle}>
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

// Cargar campos ya configurados para la ficha seleccionada
useEffect(() => {
  const fetchCamposFicha = async () => {
    if (!idFichaRegistro) return;
    
    try {
      const response = await fetchWithAuth(`http://localhost:4000/api/fichas/formularioFicha/${idFichaRegistro}`);
      
      // Verifica primero si la respuesta es válida
      if (!response || !response.ok) {
        throw new Error('Respuesta inválida del servidor');
      }
      
      // Parsea la respuesta JSON (fetchWithAuth probablemente no lo hace automáticamente)
      const data = await response.json();
      
      // Accede a los datos según la estructura real de tu API
      const camposDesdeBD = data.data; // o simplemente data, dependiendo de tu API
      
      if (!camposDesdeBD || !Array.isArray(camposDesdeBD) || camposDesdeBD.length === 0) {
        setSecciones([]); // Limpiar el estado si no hay datos
        return;
      }

      // Agrupar los campos por sección
      const seccionesAgrupadas = {};

      camposDesdeBD.forEach((campo) => {
        const seccionId = campo.idSeccion || 0;
        if (!seccionesAgrupadas[seccionId]) {
          seccionesAgrupadas[seccionId] = {
            id: `seccion-${seccionId}-${Date.now()}`,
            idSeccionCatalogo: campo.idSeccion,
            campos: [],
          };
        }

        const campoNuevo = {
          id: `campo-${campo.idCatalogoCaracteristicas}-${Date.now()}`,
          idCatalogoCaracteristica: campo.idCatalogoCaracteristicas,
          idTipoCampo: campo.idTipoCampo,
          nombreDelCampo: campo.nombreDelCampo,
          valorPorDefecto: campo.valorPorDefecto || '',
          valorRequerido: Boolean(campo.valorRequerido),
          valorPrincipal: Boolean(campo.valorPrincipal),
          idFichaRegistroCaracteristica: campo.idFichaRegistroCaracteristica || null
        };

        seccionesAgrupadas[seccionId].campos.push(campoNuevo);
      });

      // Convertir el objeto a array y actualizar el estado
      const seccionesFinal = Object.values(seccionesAgrupadas);
      setSecciones(seccionesFinal);
    } catch (err) {
      console.error("Error al cargar campos de ficha:", err);
      // Mostrar error al usuario
      setError('No se pudieron cargar los campos de la ficha');
    }
  };

  fetchCamposFicha();
}, [idFichaRegistro]);



  useEffect(() => {
    if (selectedFicha) {
      localStorage.setItem("selectedFicha", JSON.stringify(selectedFicha));
    }
  }, [selectedFicha]);



 useEffect(() => {
  const fetchCatalogos = async () => {
    try {
      // 1. Realizar la petición con fetchWithAuth
      const response = await fetchWithAuth("http://localhost:4000/api/fichas/catalogo/CaracteristicasFicha");
      
      // 2. Verificar si la respuesta es exitosa
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      // 3. Parsear la respuesta JSON
      const result = await response.json();
      
      // 4. Validar estructura de la respuesta
      if (!result?.data) {
        throw new Error('La respuesta no contiene la propiedad "data"');
      }
      
      const { secciones, tiposCampo, catalogoCaracteristicas } = result.data;

      // 5. Validar tipos de datos recibidos
      if (!Array.isArray(secciones) || !Array.isArray(tiposCampo) || !Array.isArray(catalogoCaracteristicas)) {
        throw new Error('Los datos recibidos no son arrays válidos');
      }

      // 6. Actualizar los estados
      setTiposCampo(tiposCampo);
      setSeccionesCatalogo(secciones);
      setCatalogoCaracteristicas(catalogoCaracteristicas);

    } catch (error) {
      console.error("Error al obtener catálogos:", error);
      
      // Mostrar error al usuario
      setError('No se pudieron cargar los catálogos. Por favor, intente nuevamente.');
      
      // Reiniciar estados
      setTiposCampo([]);
      setSeccionesCatalogo([]);
      setCatalogoCaracteristicas([]);
    }
  };

  fetchCatalogos();
}, []);


  const fetchOpcionesParaCampo = async (idCampo, idCatalogoCaracteristica, idTipoCampo) => {
  // Busca el tipoCampo por id para saber si es un tipo con opciones
  const tipo = tiposCampo.find((t) => t.idTipoCampo === parseInt(idTipoCampo));

  if (!tipo) return;

  // Verificar si es un tipo que requiere opciones (lista desplegable, opción múltiple)
  if (
    idCatalogoCaracteristica &&
    (tipo.nombre_tipo.toUpperCase().includes("LISTA") ||
     tipo.nombre_tipo.toUpperCase().includes("OPCION MULTIPLE"))
  ) {
    try {
      // Usar fetchWithAuth en lugar de axios
      const response = await fetchWithAuth(
        `http://localhost:4000/api/fichas/catalogo/OpcionesCaracteristicas/${idCatalogoCaracteristica}`
      );

      // Verificar si la respuesta es exitosa
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      // Parsear la respuesta JSON
      const result = await response.json();

      // Validar estructura de la respuesta
      const opciones = result?.data || [];

      // Guardar las opciones para este campo
      setOpcionesPorCampo((prev) => ({
        ...prev,
        [idCampo]: opciones,
      }));

    } catch (err) {
      console.error(`Error al cargar opciones para campo ${idCampo}:`, err);
      
      // Limpiar las opciones en caso de error
      setOpcionesPorCampo((prev) => ({
        ...prev,
        [idCampo]: [],
      }));
      
      // Opcional: Mostrar notificación de error al usuario
      showNotification({
        message: `No se pudieron cargar las opciones para este campo`,
        type: "error",
        duration: 3000
      });
    }
  } else {
    // Si no es tipo con opciones, limpiar las opciones para ese campo
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

  const insertarCamposFichas = async () => {
  // 1. Preparar el payload
  const payload = secciones.flatMap((sec) => 
    sec.campos.map((campo) => ({
      idFichaRegistro,
      idCatalogoCaracteristicas: parseInt(campo.idCatalogoCaracteristica),
      idSeccion: parseInt(sec.idSeccionCatalogo),
      idTipoCampo: parseInt(campo.idTipoCampo),
      nombreDelCampo: campo.nombreDelCampo,
      valorPorDefecto: campo.valorPorDefecto || null,
      valorRequerido: campo.valorRequerido,
      valorPrincipal: campo.valorPrincipal,
    }))
  );

  const body = {
    Caracteristicas: payload,
    idObjeto: 1
  };

  // 2. Log de depuración
  console.log("🔍 Datos enviados al backend:", {
    body: JSON.stringify(body, null, 2),
    token: localStorage.getItem("token")
  });

  try {
    // 3. Realizar la petición con fetchWithAuth
    const response = await fetchWithAuth(
      "http://localhost:4000/api/fichas/insFichaCaracteristicas",
      {
        method: "POST",
        credentials: 'include', // Equivalente a withCredentials: true
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      }
    );

    // 4. Manejar la respuesta
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData?.errors?.join(", ") || 
        `Error HTTP: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();
    console.log("📦 Respuesta del servidor:", result);

    // 5. Mostrar confirmación
    await Swal.fire({
      icon: "success",
      title: "¡Formulario registrado!",
      text: "Los campos del formulario fueron registrados correctamente.",
      confirmButtonColor: "#253A69",
    });

    return result;

  } catch (err) {
    console.error("❌ Error al guardar los campos:", err);
    
    // 6. Mostrar error
    await Swal.fire({
      icon: "error",
      title: "Error al guardar",
      html: `<p>${err.message}</p>`,
      confirmButtonColor: "#d33",
    });
    
    throw err; // Re-lanzar el error para manejo adicional si es necesario
  }
};

  const eliminarCampoFicha = async (idFichaRegistroCaracteristica) => {
  // 1. Preparar el cuerpo de la solicitud
  const body = {
    idFichaRegistroCaracteristica,
    idObjeto: 1 // Cambia si tienes otro idObjeto para bitácora
  };

  // 2. Log de depuración
  console.log("🔍 Datos enviados para eliminar campo:", {
    body: JSON.stringify(body, null, 2),
    token: localStorage.getItem("token")
  });

  try {
    // 3. Realizar la petición con fetchWithAuth
    const response = await fetchWithAuth(
      "http://localhost:4000/api/fichas/delFichasCaracteristicas",
      {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      }
    );

    // 4. Manejar la respuesta
    const result = await response.json();
    console.log("📦 Respuesta del servidor:", result);

    if (!response.ok) {
      throw new Error(
        result?.data?.descripcion || 
        result?.errors?.join(", ") || 
        `Error HTTP: ${response.status}`
      );
    }

    // 5. Verificar código de error del backend
    if (result?.data?.codigoError === 0) {
      await Swal.fire({
        icon: "success",
        title: "¡Campo eliminado!",
        text: "El campo fue eliminado correctamente.",
        confirmButtonColor: "#253A69",
      });
      return true;
    } else {
      throw new Error(result?.data?.descripcion || "Error al eliminar el campo");
    }

  } catch (err) {
    console.error("❌ Error al eliminar campo:", err);
    
    // 6. Mostrar error al usuario
    await Swal.fire({
      icon: "error",
      title: "Error al eliminar",
      html: `<p>${err.message}</p>`,
      confirmButtonColor: "#d33",
    });
    
    return false;
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
        <h3>Diseñador de : {selectedFicha.title || "Ficha sin nombre"}</h3>
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
                  onClick={async () => {
                    const eliminado = await eliminarCampoFicha(campo.idFichaRegistroCaracteristica);
                    if (eliminado) {
                      eliminarCampo(sec.id, campo.id); // Actualiza UI local eliminando el campo
                    }
                  }}
                  disabled={!campo.idFichaRegistroCaracteristica} // solo eliminar campos guardados
                >
                  ❌ELIMINAR CAMPO
                </button>
              </div>
            ))}
          </div>
        ))}



        <button className="btnD guardarD" onClick={insertarCamposFichas}>
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
                      <strong>{campo.nombreDelCampo || "Sin nombre"} :
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
