import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/Credencial/formularioDinamico.css";
import BotonRegresar from "../../components/Dashboard/BotonRegresar";
import "../../styles/Inicio/EventCard.css";

export default function DynamicFichaForm() {
  const [tiposCampo, setTiposCampo] = useState([]);
  const [catalogoCaracteristicas, setCatalogoCaracteristicas] = useState([]);
  const [seccionesCatalogo, setSeccionesCatalogo] = useState([]);
const fichaSeleccionada = JSON.parse(localStorage.getItem("fichaSeleccionada")) || {};
const nombreFicha = fichaSeleccionada.nombreFicha || "Ficha sin nombre";
  const [secciones, setSecciones] = useState([
    {
      id: Date.now(),
      idSeccionCatalogo: "", // ID de la sección seleccionada del catálogo
      campos: [
        {
          id: Date.now() + 1,
          idCatalogoCaracteristicas: "",
          idTipoCampo: "",
          nombreDelCampo: "",
          valorPorDefecto: "",
          valorRequerido: false,
          valorPrincipal: false,
        },
      ],
    },
  ]);

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
                idCatalogoCaracteristicas: "",
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
          idCatalogoCaracteristicas: parseInt(campo.idCatalogoCaracteristicas),
          idSeccion: parseInt(sec.idSeccionCatalogo), // ahora toma la sección desde el catálogo
          idTipoCampo: parseInt(campo.idTipoCampo),
          nombreDelCampo: campo.nombreDelCampo,
          valorPorDefecto: campo.valorPorDefecto || null,
          valorRequerido: campo.valorRequerido,
          valorPrincipal: campo.valorPrincipal,
        });
      });
    });

    try {
      const res = await axios.post(
        "http://localhost:4000/api/fichas/insFichaCaracteristicas",
        { Caracteristicas: payload, idObjeto: 1 }
      );
      alert("✅ Campos guardados correctamente");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("❌ Error al guardar los campos");
    }
  };

  return (
    <div className="contenedor-principalD">

      <BotonRegresar
        to="/lista-fichas"
        text="Regresar"
      />

      <div className="form-containerD">
        <h2>DISEÑADOR DE FICHA</h2>

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
                  value={campo.idCatalogoCaracteristicas}
                  className="select-campoD"
                  onChange={(e) =>
                    actualizarCampo(sec.id, campo.id, "idCatalogoCaracteristicas", e.target.value)
                  }
                >
                  <option value="">SELECCIONE CARACTERISTICA</option>
                  {catalogoCaracteristicas.map((tipo) => (
                    <option key={tipo.idCatalogoCaracteristicas} value={tipo.idCatalogoCaracteristicas}>
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
                  (c) => c.idCatalogoCaracteristicas === parseInt(campo.idCatalogoCaracteristicas)
                );
                return (
                  <div key={campo.id} className="preview-campoD">
                    <label>
                      <strong>{campo.nombreDelCampo || caracteristica?.caracteristica || "Sin nombre"}:</strong>
                    </label>
                    <span>{campo.valorPorDefecto || "[valor vacío]"}</span>

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
