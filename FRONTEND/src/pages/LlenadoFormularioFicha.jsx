import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/Credencial/formularioDinamico.css";
import BotonRegresar from "../components/Dashboard/BotonRegresar";
import "../styles/Inicio/EventCard.css";
import Nav from "../components/Dashboard/navDashboard";

export default function LlenadoFicha() {
    const navigate = useNavigate();
    const location = useLocation();
    const [tiposCampo, setTiposCampo] = useState([]);
    const [catalogoCaracteristicas, setCatalogoCaracteristicas] = useState([]);
    const [seccionesCatalogo, setSeccionesCatalogo] = useState([]);
    const [opcionesPorCampo, setOpcionesPorCampo] = useState({});
    const [camposFicha, setCamposFicha] = useState([]);

    const [selectedFicha, setSelectedFicha] = useState(() => {
        return location.state?.selectedFicha || JSON.parse(localStorage.getItem("selectedFicha"));
    });
    const idFichaRegistro = selectedFicha.id;

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

    const renderVistaPreviaCampo = (campo) => {
    const tipoCampo = parseInt(campo.idTipoCampo);
    const opciones = opcionesPorCampo?.[campo.idCampo] || [];

    switch (tipoCampo) {
        case 6: // Texto
            return (
                <input
                    type="text"
                    defaultValue={campo.valorPorDefecto || ""}
                    placeholder="Texto..."
                    style={inputStyle}
                />
            );
        case 7: // Número
            return (
                <input
                    type="number"
                    defaultValue={campo.valorPorDefecto || ""}
                    placeholder="0"
                    style={inputStyle}
                />
            );
        case 8: // Fecha
            return (
                <input
                    type="date"
                    defaultValue={campo.valorPorDefecto || ""}
                    style={inputStyle}
                />
            );
        case 9: // Radio
            return (
                <div style={radioContainerStyle}>
                    {opciones.length > 0 ? (
                        opciones.map((op, idx) => (
                            <label key={idx}>
                                <input
                                    type="radio"
                                    name={`campo-${campo.idCampo}`}
                                    value={op.valor}
                                    defaultChecked={campo.valorPorDefecto === op.valor}
                                />{" "}
                                {op.valorOpcion}
                            </label>
                        ))
                    ) : (
                        <>
                            <label>
                                <input
                                    type="radio"
                                    name={`campo-${campo.idCampo}`}
                                /> Opción 1
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name={`campo-${campo.idCampo}`}
                                /> Opción 2
                            </label>
                        </>
                    )}
                </div>
            );
        case 10: // Checkbox (bool)
            return (
                <div style={checkboxContainerStyle}>
                    <label>
                        <input
                            type="checkbox"
                            defaultChecked={campo.valorPorDefecto === "true"}
                        />{" "}
                        Sí
                    </label>
                </div>
            );
        case 11: // Lista desplegable
            return opciones.length > 0 ? (
                <select defaultValue={campo.valorPorDefecto || ""} style={inputStyle}>
                    <option value="">SELECCIONE UNA OPCIÓN</option>
                    {opciones.map((opcion) => (
                        <option key={opcion.idOpcion} value={opcion.valor}>
                            {opcion.valorOpcion}
                        </option>
                    ))}
                </select>
            ) : (
                <span style={{ fontStyle: "italic", color: "#888" }}>
                    [Sin opciones disponibles]
                </span>
            );
        default:
            return (
                <span style={{ fontStyle: "italic", color: "#888" }}>
                    {campo.valorPorDefecto || "[valor vacío]"}
                </span>
            );
    }
};


    useEffect(() => {
        if (selectedFicha) {
            localStorage.setItem("selectedFicha", JSON.stringify(selectedFicha));
        }
    }, [selectedFicha]);

    useEffect(() => {
        const cargarCamposFicha = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/api/fichas/camposFicha/${idFichaRegistro}`);
                const campos = res.data.data;
                console.log(campos)
                setCamposFicha(campos);
                await obtenerOpcionesCampos(campos);
            } catch (err) {
                console.error('Error al cargar campos de la ficha:', err);
            }
        };

        if (idFichaRegistro) {
            cargarCamposFicha();
        }
    }, [idFichaRegistro]);

    const obtenerOpcionesCampos = async (campos) => {
        for (const campo of campos) {
            await fetchOpcionesParaCampo(campo.idCampo, campo.idCatalogoCaracteristica, campo.idTipoCampo);
        }
    };

    const fetchOpcionesParaCampo = async (idCampo, idCatalogoCaracteristica, idTipoCampo) => {
        const tipo = tiposCampo.find((t) => t.idTipoCampo === parseInt(idTipoCampo));
        if (!tipo) return;

        if (idCatalogoCaracteristica && tipo.nombre_tipo.toUpperCase().includes("LISTA")) {
            try {
                const res = await axios.get(
                    `http://localhost:4000/api/fichas/catalogo/OpcionesCaracteristicas/${idCatalogoCaracteristica}`
                );
                setOpcionesPorCampo((prev) => ({
                    ...prev,
                    [idCampo]: res.data.data || [],
                }));
            } catch (err) {
                console.error("Error al cargar opciones para campo", idCampo, err);
                setOpcionesPorCampo((prev) => ({
                    ...prev,
                    [idCampo]: [],
                }));
            }
        } else {
            setOpcionesPorCampo((prev) => ({
                ...prev,
                [idCampo]: [],
            }));
        }
    };

    const handleVolver = () => {
        navigate("/llenar-fichas", {
            state: {
                selectedFicha: selectedFicha
            },
        });
    };

    return (
        <div className="container mx-auto p-4">
            <div className="contenedor-principalDM">
                <Nav />
                <BotonRegresar
                    to="/llenar-fichas"
                    text="Regresar"
                    onClick={handleVolver}
                />
                <div className="credenciallisttitle text-center mt-3" style={{ width: '100%' }}>
                    <h2>FORMULARIO DE REGISTRO : {selectedFicha.title || "Ficha sin nombre"}</h2>
                </div>

                <div className="preview-containerDM">
                    <h2>VISTA PREVIA</h2>

                    {camposFicha.length > 0 ? (
                        camposFicha.map((campo) => (
                            <div key={campo.idCampo} className="mb-4">
                                <label style={{ fontWeight: "bold" }}>{campo.nombreDelCampo}</label>
                                {renderVistaPreviaCampo(campo)}
                            </div>
                        ))
                    ) : (
                        <p>No hay campos para mostrar.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
