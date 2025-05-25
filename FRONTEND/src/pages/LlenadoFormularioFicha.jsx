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
    const [camposFicha, setCamposFicha] = useState([]);
    const [opcionesPorCampo, setOpcionesPorCampo] = useState({});
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        if (selectedFicha) {
            localStorage.setItem("selectedFicha", JSON.stringify(selectedFicha));
        }
    }, [selectedFicha]);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                // Cargar campos de la ficha
                const resCampos = await axios.get(`http://localhost:4000/api/fichas/camposFicha/${idFichaRegistro}`);
                const campos = resCampos.data.data;
                console.log(campos)
                setCamposFicha(campos);


                // Filtrar solo campos que son listas (idTipoCampo === 11)
                const camposLista = campos.filter(campo => parseInt(campo.idTipoCampo) === 11);
                // Dentro de cargarDatos, después de obtener los campos:
                console.log("Todos los campos:", campos);
                console.log("Campos de tipo lista:", campos.filter(campo => parseInt(campo.idTipoCampo) === 11));
                // Crear un array de promesas para obtener las opciones de cada campo lista
                const promesasOpciones = camposLista.map(campo =>
                    axios.get(`http://localhost:4000/api/fichas/catalogo/OpcionesCaracteristicas/${campo.idCatalogoCaracteristica}`)
                        .then(res => ({
                            idCampo: campo.idCatalogoCaracteristica,
                            opciones: res.data.data || []
                        }))
                        .catch(err => {
                            console.error(`Error cargando opciones para campo ${campo.idCampo}:`, err);
                            return {
                                idCampo: campo.idCampo,
                                opciones: []
                            };
                        })
                );

                // Esperar a que todas las promesas se resuelvan
                const resultados = await Promise.all(promesasOpciones);

                // Crear el objeto de opciones por campo
                const nuevasOpciones = {};
                resultados.forEach(resultado => {
                    nuevasOpciones[resultado.idCampo] = resultado.opciones;
                });
                console.log("Resultados de opciones:", resultados);


                setOpcionesPorCampo(nuevasOpciones);
                setLoading(false);
            } catch (err) {
                console.error('Error al cargar datos:', err);
                setLoading(false);
            }
        };

        if (idFichaRegistro) {
            cargarDatos();
        }
    }, [idFichaRegistro]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        console.log("Entradas del formulario:");
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

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

        const payload = {
            campos, // ✅ Nombre correcto según backend
            idObjeto: 1,
            idEvento: Number(selectedFicha.idEvento),
            idFichaRegistro: Number(idFichaRegistro)
        };

        try {
            const res = await axios.post("http://localhost:4000/api/fichas/insParticipanteEventos", payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });

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



    const renderCampo = (campo) => {
        const tipoCampo = parseInt(campo.idTipoCampo);
        const opciones = opcionesPorCampo[campo.idCatalogoCaracteristica] || [];

        const nameInput = `campo_${campo.idFichaRegistroCaracteristica}`; // Usar id válido

        switch (tipoCampo) {
            case 6: // Texto
                return (
                    <input
                        type="text"
                        defaultValue={campo.valorPorDefecto || ""}
                        placeholder="Texto..."
                        style={inputStyle}
                        name={nameInput}
                    />
                );
            case 7: // Número
                return (
                    <input
                        type="number"
                        defaultValue={campo.valorPorDefecto || ""}
                        placeholder="0"
                        style={inputStyle}
                        name={nameInput}
                    />
                );
            case 8: // Fecha
                return (
                    <input
                        type="date"
                        defaultValue={campo.valorPorDefecto || ""}
                        style={inputStyle}
                        name={nameInput}
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
                                        name={nameInput}
                                        value={op.valor}
                                        defaultChecked={campo.valorPorDefecto === op.valor}
                                    />{" "}
                                    {op.valorOpcion}
                                </label>
                            ))
                        ) : (
                            <>
                                <label>
                                    <input type="radio" name={nameInput} /> Opción 1
                                </label>
                                <label>
                                    <input type="radio" name={nameInput} /> Opción 2
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
                                name={nameInput}
                                value="true"
                            />{" "}
                            Sí
                        </label>
                    </div>
                );
            case 11: // Lista desplegable
                return (
                    <select
                        defaultValue={campo.valor || ""}
                        style={inputStyle}
                        name={nameInput}
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
                    <span style={{ fontStyle: "italic", color: "#888" }}>
                        {campo.valorPorDefecto || "[Tipo de campo no reconocido]"}
                    </span>
                );
        }
    };



    const handleVolver = () => {
        navigate("/llenar-fichas", {
            state: {
                selectedFicha: selectedFicha
            },
        });
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

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
                    <h2>FORMULARIO DE REGISTRO: {selectedFicha.title || "Ficha sin nombre"}</h2>
                </div>

                <form onSubmit={handleSubmit} className="preview-containerDM">
                    <h2>FORMULARIO</h2>

                    {camposFicha.length > 0 ? (
                        camposFicha.map((campo) => (
                            <div key={campo.idCampo} className="mb-4">
                                <label style={{ fontWeight: "bold" }}>
                                    {campo.nombreDelCampo}
                                    {campo.valorRequerido && <span style={{ color: "red" }}> *</span>}
                                </label>
                                {renderCampo(campo)}
                            </div>
                        ))
                    ) : (
                        <p>No hay campos para mostrar.</p>
                    )}

                    <button type="submit" className="btnD guardarD">
                        Guardar Datos
                    </button>
                </form>
            </div>
        </div>
    );
}