import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/Credencial/LlenadoFicha.css";
import BotonRegresar from "../components/Dashboard/BotonRegresar";
import Nav from "../components/Dashboard/navDashboard";
import Swal from "sweetalert2";
import { fetchWithAuth } from '../utils/api';
import { ToastContainer, toast } from "react-toastify";  // Importar toastify

export default function LlenadoFicha() {
    const navigate = useNavigate();
    const location = useLocation();

    const [camposFicha, setCamposFicha] = useState([]);
    const [opcionesPorCampo, setOpcionesPorCampo] = useState({});
    const [loading, setLoading] = useState(true);
    const [secciones, setSecciones] = useState([]);
    const [formValues, setFormValues] = useState({});
    const [errors, setErrors] = useState({});
    const [radioValues, setRadioValues] = useState({});

    const [selectedFicha, setSelectedFicha] = useState(() => {
        return location.state?.selectedFicha || JSON.parse(localStorage.getItem("selectedFicha"));
    });
    const idFichaRegistro = selectedFicha.id;

    // Efecto para persistir la ficha seleccionada
    useEffect(() => {
        if (selectedFicha) {
            localStorage.setItem("selectedFicha", JSON.stringify(selectedFicha));
        }
    }, [selectedFicha]);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                setLoading(true);

                // 1. Obtener campos de la ficha
                const camposResponse = await fetchWithAuth(
                    `http://localhost:4000/api/fichas/camposFicha/${idFichaRegistro}`
                );

                if (!camposResponse.ok) {
                    throw new Error(`Error al cargar campos: ${camposResponse.status}`);
                }

                const camposData = await camposResponse.json();
                const campos = camposData.data || [];
                setCamposFicha(campos);

                // 2. Inicializar valores por defecto para campos tipo radio (idTipoCampo === 9)
                const valoresInicialesRadio = campos.reduce((acc, campo) => {
                    if (parseInt(campo.idTipoCampo) === 9) {
                        const fieldName = `campo_${campo.idFichaRegistroCaracteristica}`;
                        acc[fieldName] = campo.valorPorDefecto || '';
                    }
                    return acc;
                }, {});

                setRadioValues(valoresInicialesRadio);

                // 3. Agrupar campos por secciones (usa "General" como fallback)
                const secciones = [...new Set(campos.map(campo => campo.seccion || "General"))];
                setSecciones(secciones);

                // 4. Cargar opciones para campos tipo radio o lista
                const camposConOpciones = campos.filter(campo =>
                    [9, 11].includes(parseInt(campo.idTipoCampo))
                );

                const promesasOpciones = camposConOpciones.map(async campo => {
                    try {
                        const opcionesResponse = await fetchWithAuth(
                            `http://localhost:4000/api/fichas/catalogo/OpcionesCaracteristicas/${campo.idCatalogoCaracteristica}`
                        );

                        if (!opcionesResponse.ok) {
                            console.warn(`Error al cargar opciones para campo ${campo.idCatalogoCaracteristica}`);
                            return {
                                idCampo: campo.idCatalogoCaracteristica,
                                opciones: []
                            };
                        }

                        const opcionesData = await opcionesResponse.json();
                        return {
                            idCampo: campo.idCatalogoCaracteristica,
                            opciones: opcionesData.data || []
                        };
                    } catch (error) {
                        console.error(`Error al cargar opciones para campo ${campo.idCatalogoCaracteristica}:`, error);
                        return {
                            idCampo: campo.idCatalogoCaracteristica,
                            opciones: []
                        };
                    }
                });

                const resultados = await Promise.all(promesasOpciones);
                const opcionesAgrupadas = resultados.reduce((acc, { idCampo, opciones }) => {
                    acc[idCampo] = opciones;
                    return acc;
                }, {});

                setOpcionesPorCampo(opcionesAgrupadas);

            } catch (err) {
                console.error('Error al cargar datos:', err);
                setError('Error al cargar los datos iniciales');
            } finally {
                setLoading(false);
            }
        };

        if (idFichaRegistro) cargarDatos();
    }, [idFichaRegistro]);


    useEffect(() => {
        console.log("Estado actual:");
        console.log("camposFicha:", camposFicha);
        console.log("formValues:", formValues);
        console.log("radioValues:", radioValues);
        console.log("opcionesPorCampo:", opcionesPorCampo);
        console.log("secciones:", secciones);
    }, [camposFicha, formValues, radioValues, opcionesPorCampo, secciones]);
    // Manejar cambios en los inputs
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormValues(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (checked ? "true" : "false") : value
        }));

        // Limpiar error si existe
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };



    // Manejar cambios en los radios
    const handleRadioChange = (fieldName, value) => {
        console.log("Cambio en radio:", fieldName, "→", value);
        setRadioValues((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    };

    useEffect(() => {
        console.log("radioValues actualizado:", radioValues);
    }, [radioValues]);

    // Validar el formulario
    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        camposFicha.forEach(campo => {
            const fieldName = `campo_${campo.idFichaRegistroCaracteristica}`;
            const value = campo.idTipoCampo === 9
                ? radioValues[fieldName]
                : formValues[fieldName];

            if (campo.valorRequerido && !value) {
                newErrors[fieldName] = `El campo ${campo.nombreDelCampo} es obligatorio`;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };


    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            // Scroll al primer error
            const firstError = Object.keys(errors)[0];
            if (firstError) {
                document.getElementById(firstError)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
            return;
        }

        // Preparar datos para enviar
        const campos = camposFicha.map(campo => ({
            idFichaRegistroCaracteristica: campo.idFichaRegistroCaracteristica,
            valor: campo.idTipoCampo === 9
                ? radioValues[`campo_${campo.idFichaRegistroCaracteristica}`]
                : formValues[`campo_${campo.idFichaRegistroCaracteristica}`]
        }));

        const payload = {
            campos,
            idObjeto: 1,
            idEvento: selectedFicha.idEvento,
            idFichaRegistro: idFichaRegistro
        };

        try {
            // 1. Primero registrar al participante
            const res = await fetchWithAuth(
                "http://localhost:4000/api/fichas/insParticipanteEventos",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                }
            );

            const data = await res.json();

            if (data && !data.hasError) {
                // 2. Si el participante se registró correctamente, insertar la credencial
                try {
                    await handleInsertarCredencial();

                    // Mostrar éxito solo después de ambas operaciones
                    await Swal.fire({
                        icon: "success",
                        title: "¡Participante registrado!",
                        text: "Participante y credencial registrados correctamente.",
                        confirmButtonColor: "#253A69",
                    });
                    navigate("/llenar-fichas");
                } catch (credError) {
                    console.error('Error al insertar credencial:', credError);
                    await Swal.fire({
                        icon: "warning",
                        title: "Participante registrado, pero...",
                        text: "El participante se registró, pero hubo un problema al crear la credencial: " + (credError.message || "Error desconocido"),
                        confirmButtonColor: "#253A69",
                    });
                }
            } else {
                throw new Error(data?.errors?.join(', ') || 'Error desconocido al registrar participante');
            }
        } catch (error) {
            console.error('Error en el envío:', error);
            await Swal.fire({
                icon: "error",
                title: "Error al guardar",
                text: error.message || "Ocurrió un problema al registrar al participante.",
                confirmButtonColor: "#d33",
            });
        }
    };

    const handleInsertarCredencial = async () => {
        if (!selectedFicha) {
            toast.error("No se encontró la ficha seleccionada.");
            return;
        }

        const { idEvento, id } = selectedFicha;

        if (!idEvento || isNaN(idEvento) || !id || isNaN(id)) {
            toast.error("Los datos de la ficha seleccionada no son válidos.");
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Token no disponible.");
            return;
        }

        const credencial = {
            idEvento,
            activo: 1,
            idFicha: id,
            idObjeto: 1, // Este debe ser un número válido
        };

        console.log("Enviando credencial:", credencial);


        try {
            const response = await fetchWithAuth("http://localhost:4000/api/credencial/insCredencial", {
                method: "POST",
                credentials: 'include',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credencial),
            });

            const data = await response.json();

            if (!response.ok || data.hasError) {
                throw new Error(data.errors?.[0] || "Error al insertar la credencial");
            }

            toast.success("Credencial insertada correctamente.");
            // await obtenerCredenciales(); // si tienes esta función
        } catch (error) {
            console.error("Error:", error);
            toast.error(error.message || "Error al insertar la credencial.");
        }
    };

    const handleVolver = () => {
        navigate("/llenar-fichas", {
            state: { selectedFicha: selectedFicha },
        });
    };

    // Renderizado específico para radios
    const renderRadioField = (campo) => {
        const fieldName = `campo_${campo.idFichaRegistroCaracteristica}`;
        const opciones = opcionesPorCampo[campo.idCatalogoCaracteristica] || [];
        const error = errors[fieldName];
        const selectedValue = radioValues[fieldName];

        // Aquí transformamos el valor a valorOpcion para mostrarlo
        const selectedOpcion = opciones.find(o => String(o.valor) === String(selectedValue));
        console.log(`Renderizando ${fieldName}, seleccionado:`, selectedOpcion ? selectedOpcion.valorOpcion : 'Sin selección');

        return (
            <div id={fieldName} className={`radio-field-container ${error ? 'error-field' : ''}`}>
                <div className="radio-group-container">
                    {opciones.map((opcion) => (
                        <label key={opcion.valor} className="radio-option-label">
                            <input
                                type="radio"
                                name={fieldName}
                                value={opcion.valor}
                                checked={selectedValue === opcion.valorOpcion}
                                onChange={() => handleRadioChange(fieldName, opcion.valorOpcion)}
                                className="radio-input"
                            />
                            <span className="radio-custom"></span>
                            {opcion.valorOpcion}
                        </label>
                    ))}
                </div>
                {error && <p className="error-message">{error}</p>}
            </div>
        );
    };
    // Renderizar cada campo del formulario
    const renderCampo = (campo) => {
        const tipoCampo = parseInt(campo.idTipoCampo);
        const opciones = opcionesPorCampo[campo.idCatalogoCaracteristica] || [];
        const fieldName = `campo_${campo.idFichaRegistroCaracteristica}`;
        const value = formValues[fieldName];
        const error = errors[fieldName];

        const fieldStyles = {
            input: {
                padding: "0.8rem 1rem",
                borderRadius: "6px",
                border: error ? "1px solid #ff4444" : "1px solid #ddd",
                backgroundColor: "#f9f9f9",
                fontSize: "0.95rem",
                width: "100%",
                marginTop: "0.5rem",
                transition: "all 0.3s ease"
            },
            radioContainer: {
                display: "flex",
                gap: "1.0rem",
                marginTop: "0.5rem",
                flexWrap: "wrap"
            },
            checkboxContainer: {
                display: "flex",
                gap: "0.5rem",
                marginTop: "0.5rem",
                alignItems: "center"
            },
            select: {
                padding: "0.8rem 1rem",
                borderRadius: "6px",
                border: error ? "1px solid #ff4444" : "1px solid #ddd",
                backgroundColor: "#f9f9f9",
                fontSize: "0.95rem",
                width: "100%",
                marginTop: "0.5rem"
            },
            errorText: {
                color: "#ff4444",
                fontSize: "0.8rem",
                marginTop: "0.3rem"
            }
        };

        switch (tipoCampo) {
            case 6: // Texto
                return (
                    <div id={fieldName}>
                        <input
                            type="text"
                            name={fieldName}
                            value={value || ""}
                            onChange={handleInputChange}
                            placeholder={campo.valorPorDefecto || "TEXTO"}
                            style={fieldStyles.input}
                            className="form-input"
                        />
                        {error && <p style={fieldStyles.errorText}>{error}</p>}
                    </div>
                );
            case 7: // Número
                return (
                    <div id={fieldName}>
                        <input
                            type="number"
                            name={fieldName}
                            value={value || ""}
                            onChange={handleInputChange}
                            placeholder={campo.valorPorDefecto || "NUMERO"}
                            style={fieldStyles.input}
                            className="form-input"
                        />
                        {error && <p style={fieldStyles.errorText}>{error}</p>}
                    </div>
                );
            case 8: // Fecha
                return (
                    <div id={fieldName}>
                        <input
                            type="date"
                            name={fieldName}
                            value={value || ""}
                            onChange={handleInputChange}
                            style={fieldStyles.input}
                            className="form-input"
                        />
                        {error && <p style={fieldStyles.errorText}>{error}</p>}
                    </div>
                );
            case 9: // Radio buttons
                return renderRadioField(campo);
            case 10: // Checkbox (bool)
                return (
                    <div id={fieldName} style={fieldStyles.checkboxContainer}>
                        <input
                            type="checkbox"
                            name={fieldName}
                            checked={value === "true"}
                            onChange={handleInputChange}
                            className="checkbox-input"
                        />
                        <span>{value === "true" ? "Sí" : "No"}</span>
                        {error && <p style={fieldStyles.errorText}>{error}</p>}
                    </div>
                );
            case 11: // Lista desplegable
                return (
                    <div id={fieldName}>
                        <select
                            name={fieldName}
                            value={value || ""}
                            onChange={handleInputChange}
                            style={fieldStyles.select}
                            className="form-select"
                        >
                            <option value="">SELECCIONE UNA OPCIÓN</option>
                            {opciones.map((opcion) => (
                                <option key={opcion.idOpcion} value={opcion.valor}>
                                    {opcion.valorOpcion}
                                </option>
                            ))}
                        </select>
                        {error && <p style={fieldStyles.errorText}>{error}</p>}
                    </div>
                );
            default:
                return (
                    <div className="unknown-field">
                        <p>Tipo de campo no reconocido (ID: {tipoCampo})</p>
                        <p>Valor por defecto: {campo.valorPorDefecto || "No especificado"}</p>
                    </div>
                );
        }
    };

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

                            const camposOrdenados = [...camposSeccion].sort((a, b) =>
                                (b.valorPrincipal || false) - (a.valorPrincipal || false)
                            );

                            return (
                                <div key={index} className="form-section">
                                    <div className="section-header">
                                        <h3>{seccion}</h3>
                                        <div className="section-divider"></div>
                                    </div>

                                    <div className="section-fields">
                                        {camposOrdenados.map((campo) => (
                                            <div
                                                key={campo.idFichaRegistroCaracteristica}
                                                className={`form-field ${campo.valorPrincipal ? "principal-field" : ""}`}
                                            >
                                                <label className="field-label">
                                                    {campo.nombreDelCampo}
                                                    {campo.valorRequerido && <span className="required-asterisk"> *</span>}
                                                    {campo.valorPrincipal && <span className="principal-badge">Principal</span>}
                                                </label>
                                                {renderCampo(campo)}
                                                {campo.valorPorDefecto && !["", "false", "true"].includes(campo.valorPorDefecto) && (
                                                    <p className="field-hint">Valor por defecto: {campo.valorPorDefecto}</p>
                                                )}
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