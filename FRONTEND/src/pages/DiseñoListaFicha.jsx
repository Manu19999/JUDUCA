import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth  from "../hooks/useAuth"; // Importa el hook de autenticación
import agregarCredencial from "../assets/FondosCredencial/ListaFichas.jpg";
import configCredencial from "../assets/FondosCredencial/DiseñoFicha.jpg";
import "../styles/Inicio/Caja-seguridad.css";
import BotonRegresar from "../components/Dashboard/BotonRegresar";
import Nav from "../components/Dashboard/navDashboard";

// Definir los nombres de objetos para cada opción
const OPCIONES_VIEWS = {
  LISTA_PARTICIPANTES: 'ListaParticipantes',
  DISENADOR_FICHA: 'FormularioFicha'
};

const Seleccion = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { hasPermission } = useAuth(); // Obtiene la función para verificar permisos
    const [selectedFicha, setSelectedFicha] = useState(() => {
        const fichaFromState = location.state?.selectedFicha;
        const fichaFromStorage = localStorage.getItem("selectedFicha");
        return fichaFromState || (fichaFromStorage ? JSON.parse(fichaFromStorage) : null);
    });

    useEffect(() => {
        if (location.state?.selectedFicha) {
            localStorage.setItem("selectedFicha", JSON.stringify(location.state.selectedFicha));
        }

        if (!selectedFicha) {
            console.warn("No se ha recibido ninguna ficha seleccionada, redirigiendo...");
            navigate("/credencialView");
        }
    }, [selectedFicha, location.state, navigate]);

    useEffect(() => {
        if (!selectedFicha) {
            console.warn("No se ha recibido ninguna ficha seleccionada, redirigiendo...");
            navigate("/lista-fichas");
            return;
        }
    }, [selectedFicha, navigate]);

    // Todas las opciones con sus permisos requeridos
    const allOptions = [
        {
            id: 1,
            title: "Listado de participantes",
            image: agregarCredencial,
            route: "/ListaParticipantes",
            description: "Administra los participantes registrados",
            requiredPermission: OPCIONES_VIEWS.LISTA_PARTICIPANTES
        },
        {
            id: 2,
            title: "Diseñador de ficha",
            image: configCredencial,
            route: "/Formulario-fichas",
            description: "Personaliza las fichas",
            requiredPermission: OPCIONES_VIEWS.DISENADOR_FICHA
        },
    ];

    // Filtrar opciones basadas en los permisos del usuario
    const visibleOptions = allOptions.filter(option => 
        hasPermission(option.requiredPermission, 'consultar')
    );

    const handleImageClick = (route) => {
        navigate(route, { state: { selectedFicha } });
    };

    return (
        <Container>
            <Nav />
            <div className="espaciotexto">
                <BotonRegresar to="/lista-fichas" text="Regresar" />
                {selectedFicha ? (
                    <>
                        <h2 className="caja-seguridad-title">
                            <strong>Configuración de Ficha</strong> <br />
                            Ficha Seleccionada: {selectedFicha.title}
                        </h2>
                        
                        {visibleOptions.length > 0 ? (
                            <div className="caja-seguridad-grid">
                                {visibleOptions.map((opcion) => (
                                    <div 
                                        key={opcion.id} 
                                        className="caja-seguridad-card"
                                        onClick={() => handleImageClick(opcion.route)}
                                    >
                                        <div className="caja-seguridad-image-container">
                                            <img 
                                                src={opcion.image} 
                                                alt={opcion.title} 
                                                className="caja-seguridad-image" 
                                            />
                                        </div>
                                        <h3>{opcion.title}</h3>
                                        <p className="card-seguridad-description">{opcion.description}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-access-message">
                                No tienes permisos para acceder a ninguna opción de configuración de ficha
                            </div>
                        )}
                    </>
                ) : (
                    <p className="text-center text-danger mt-3">
                        No se ha seleccionado ninguna ficha. Redirigiendo...
                    </p>
                )}
            </div>
        </Container>
    );
};

export default Seleccion;