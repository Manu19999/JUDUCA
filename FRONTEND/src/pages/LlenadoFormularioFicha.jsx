import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/Credencial/LlenadoFicha.css";
import BotonRegresar from "../components/Dashboard/BotonRegresar";
import Nav from "../components/Dashboard/navDashboard";


export default function LlenadoFicha() {
    // ==================== HOOKS Y ESTADOS ====================
    const navigate = useNavigate();
    const location = useLocation();

    const [camposFicha, setCamposFicha] = useState([]);
    const [opcionesPorCampo, setOpcionesPorCampo] = useState({});
    const [loading, setLoading] = useState(true);
    const [secciones, setSecciones] = useState([]);

    const [selectedFicha, setSelectedFicha] = useState(() => {
        return location.state?.selectedFicha || JSON.parse(localStorage.getItem("selectedFicha"));
    });
    const idFichaRegistro = selectedFicha.id;



    // ==================== EFECTOS ====================
    useEffect(() => {
        if (selectedFicha) {
            localStorage.setItem("selectedFicha", JSON.stringify(selectedFicha));
        }
    }, [selectedFicha]);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                // 1. Cargar campos de la ficha
                const resCampos = await axios.get(
                    `http://localhost:4000/api/fichas/camposFicha/${idFichaRegistro}`
                );
                const campos = resCampos.data.data;
                setCamposFicha(campos);

                // Agrupar campos por secciones
                const seccionesUnicas = [...new Set(campos.map(campo => campo.seccion || "General"))];
                setSecciones(seccionesUnicas);

                // 2. Filtrar campos que son listas (idTipoCampo === 11)
                const camposLista = campos.filter(campo => parseInt(campo.idTipoCampo) === 11);

                // 3. Cargar opciones para cada campo de lista
                const promesasOpciones = camposLista.map(campo =>
                    axios.get(
                        `http://localhost:4000/api/fichas/catalogo/OpcionesCaracteristicas/${campo.idCatalogoCaracteristica}`
                    )
                        .then(res => ({
                            idCampo: campo.idCatalogoCaracteristica,
                            opciones: res.data.data || []
                        }))
                        .catch(err => {
                            console.error(`Error cargando opciones para campo ${campo.idCampo}:`, err);
                            return { idCampo: campo.idCampo, opciones: [] };
                        })
                );

                // 4. Procesar resultados
                const resultados = await Promise.all(promesasOpciones);
                const nuevasOpciones = {};

                resultados.forEach(resultado => {
                    nuevasOpciones[resultado.idCampo] = resultado.opciones;
                });

                setOpcionesPorCampo(nuevasOpciones);
                setLoading(false);
            } catch (err) {
                console.error('Error al cargar datos:', err);
                setLoading(false);
            }
        };

        if (idFichaRegistro) cargarDatos();
    }, [idFichaRegistro]);

    // ==================== MANEJADORES ====================
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        // Preparar datos de los campos
        const campos = camposFicha.map((campo) => {
            const tipoCampo = parseInt(campo.idTipoCampo);
            const nombreCampo = `campo_${campo.idFichaRegistroCaracteristica}`;

            const valor = tipoCampo === 10
                ? (formData.get(nombreCampo) ? "true" : "false")
                : formData.get(nombreCampo);

            return {
                idFichaRegistroCaracteristica: campo.idFichaRegistroCaracteristica,
                valor: valor
            };
        });

        const camposInvalidos = camposFicha.filter(campo =>
            campo.valorRequerido &&
            !formData.get(`campo_${campo.idFichaRegistroCaracteristica}`)
        );

        if (camposInvalidos.length > 0) {
            alert("Por favor complete todos los campos requeridos.");
            return;
        }

        // Construir payload
        const payload = {
            campos,
            idObjeto: 1,
            idEvento: selectedFicha.idEvento,
            idFichaRegistro: idFichaRegistro
        };

        try {
            const res = await axios.post(
                "http://localhost:4000/api/fichas/insParticipanteEventos",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                }
            );

            if (!res.data.hasError) {
                alert("Participante registrado con éxito.");
                navigate("/llenar-fichas");
            } else {
                alert("Error al registrar participante: " + res.data.errors?.[0]);
            }
        } catch (error) {
            console.error("Error en el registro:", error);
            alert("Ocurrió un error al enviar los datos.");
        }
    }

    const handleVolver = () => {
        navigate("/llenar-fichas", {
            state: { selectedFicha: selectedFicha },
        });
    };

    // ==================== RENDERIZADO DE CAMPOS ====================
    const renderCampo = (campo) => {
        const tipoCampo = parseInt(campo.idTipoCampo);
        const opciones = opcionesPorCampo[campo.idCatalogoCaracteristica] || [];
        const nameInput = `campo_${campo.idFichaRegistroCaracteristica}`;

        // Definimos los estilos aquí mismo
        const fieldStyles = {
            input: {
                padding: "0.8rem 1rem",
                borderRadius: "6px",
                border: "1px solid #ddd",
                backgroundColor: "#f9f9f9",
                fontSize: "0.95rem",
                width: "100%",
                marginTop: "0.5rem",
                transition: "all 0.3s ease"
            },
            radioContainer: {
                display: "flex",
                gap: "1.0rem",
            },
            checkboxContainer: {
                display: "flex",
                gap: "0.5rem",
                marginTop: "0.5rem",
                alignItems: "center"
            }
        };

        const CheckboxBool = ({ campo }) => {
    const nameInput = `campo_${campo.idFichaRegistroCaracteristica}`;
    const [checked, setChecked] = useState(campo.valorPorDefecto === true || campo.valorPorDefecto === "true");

    const handleChange = (e) => {
        setChecked(e.target.value === "true");
    };

    return (
        <div style={fieldStyles.radioContainer} className="radio-group">
            <label className="radio-option">
                <input
                    type="radio"
                    name={nameInput}
                    value="true"
                    checked={checked === true}
                    onChange={handleChange}
                    className="radio-input"
                />{" "}
                Si
            </label>
            <label className="radio-option">
                <input
                    type="radio"
                    name={nameInput}
                    value="false"
                    checked={checked === false}
                    onChange={handleChange}
                    className="radio-input"
                />{" "}
                No
            </label>
        </div>
    );
};


        switch (tipoCampo) {
            case 6: // Texto
                return (
                    <input
                        type="text"
                        defaultValue={campo.valorPorDefecto || ""}
                        placeholder="Texto..."
                        style={fieldStyles.input}
                        name={nameInput}
                        className="form-input"
                    />
                );
            case 7: // Número
                return (
                    <input
                        type="number"
                        defaultValue={campo.valorPorDefecto || ""}
                        placeholder="0"
                        style={fieldStyles.input}
                        name={nameInput}
                        className="form-input"
                    />
                );
            case 8: // Fecha
                return (
                    <input
                        type="date"
                        defaultValue={campo.valorPorDefecto || ""}
                        style={fieldStyles.input}
                        name={nameInput}
                        className="form-input"
                    />
                );
            case 9: // Radio
                return (
                    <div style={fieldStyles.radioContainer} className="radio-group">
                        {opciones.length > 0 ? (
                            opciones.map((op, idx) => (
                                <label key={idx} className="radio-option">
                                    <input
                                        type="radio"
                                        name={nameInput}
                                        value={op.valor}
                                        defaultChecked={campo.valorPorDefecto === op.valor}
                                        className="radio-input"
                                    />{" "}
                                    {op.valorOpcion}
                                </label>
                            ))
                        ) : (
                            <>
                                <label className="radio-option">
                                    <input type="radio" name={nameInput} className="radio-input" /> Opción 1
                                </label>
                                <label className="radio-option">
                                    <input type="radio" name={nameInput} className="radio-input" /> Opción 2
                                </label>
                            </>
                        )}
                    </div>
                );
            case 10: // Checkbox (bool)
                return (
                    <CheckboxBool campo={campo} />
                );
            case 11: // Lista desplegable
                return (
                    <select
                        defaultValue={campo.valor || ""}
                        style={fieldStyles.input}
                        name={nameInput}
                        className="form-select"
                    >
                        <option value="">SELECCIONE UNA OPCIÓN</option>
                        {opciones.map((opcion) => (
                            <option key={opcion.idOpcion} value={opcion.valor}>
                                {opcion.valorOpcion}
                            </option>
                        ))}
                    </select>
                );
            default:
                return (
                    <span className="unknown-field">
                        {campo.valorPorDefecto || "[Tipo de campo no reconocido]"}
                    </span>
                );
        }
    };

    // ==================== RENDER PRINCIPAL ====================
    if (loading) return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Cargando formulario...</p>
        </div>
    );

    return (
        <div className="formulario-container">
            <Nav />

            <div className="formulario-header">
                <BotonRegresar
                    to="/llenar-fichas"
                    text="Regresar"
                    onClick={handleVolver}
                    className="back-button"
                />

                <div className="formulario-title">
                    <h2>{selectedFicha.title || "Ficha sin nombre"}</h2>
                </div>
            </div>

            <div className="formulario-content">
                <form onSubmit={handleSubmit} className="dynamic-form">
                    {secciones.length > 0 ? (
                        secciones.map((seccion, index) => {
                            const camposSeccion = camposFicha.filter(campo =>
                                (campo.seccion || "General") === seccion
                            );

                            return (
                                <div key={index} className="form-section">
                                    <div className="section-header">
                                        <h3>{seccion}</h3>
                                        <div className="section-divider"></div>
                                    </div>

                                    <div className="section-fields">
                                        {camposSeccion.map((campo) => (
                                            <div key={campo.idCampo} className="form-field">
                                                <label className="field-label">
                                                    {campo.nombreDelCampo}
                                                    {campo.valorRequerido && <span className="required-asterisk"> *</span>}
                                                </label>
                                                {renderCampo(campo)}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="no-fields-message">
                            <p>No hay campos para mostrar en este formulario.</p>
                        </div>
                    )}

                    <div className="form-actions">
                        <button type="submit" className="submit-button">
                            <span className="button-text">Guardar Datos</span>
                            <span className="button-icon">✓</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}