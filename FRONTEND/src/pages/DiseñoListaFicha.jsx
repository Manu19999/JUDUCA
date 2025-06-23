import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import TargetaEstado from "../components/Credencial/targetasEstadoCredencial";
import agregarCredencial from "../assets/FondosCredencial/ListaFichas.jpg";
import configCredencial from "../assets/FondosCredencial/DiseñoFicha.jpg";
import { ToastContainer, toast } from "react-toastify";  // Importar toastify
import "../styles/Inicio/Caja-seguridad.css";
import BotonRegresar from "../components/Dashboard/BotonRegresar";
import Nav from "../components/Dashboard/navDashboard";


const Seleccion = () => {
    const navigate = useNavigate();
    const location = useLocation();

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

    const mantenimientosOptions = [
        {
          id: 1,
          title: "Listado de participantes",
          image: agregarCredencial,
          route: "/ListaPartticipantes",
          description: "Administra los participantes registrados"
        },
        {
          id: 2,
          title: "Diseñador de ficha",
          image: configCredencial,
          route: "/Formulario-fichas",
          description: "Personaliza las fichas"
        },
      ];
      

    const handleImageClick = (route) => {
        navigate(route);
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
                    </>
                ) : (
                    <p className="text-center text-danger mt-3">
                        No se ha seleccionado ninguna ficha. Redirigiendo...
                    </p>
                )}
                <div className="caja-seguridad-grid"></div>

                <div className="caja-seguridad-grid">
                    {mantenimientosOptions.map((Estado) => (
                        <div 
                        key={Estado.id} 
                        className="caja-seguridad-card"
                        onClick={() => handleImageClick(Estado.route)}
                        >
                        <div className="caja-seguridad-image-container">
                            <img 
                            src={Estado.image} 
                            alt={Estado.title} 
                            className="caja-seguridad-image" 
                            />
                        </div>
                        <h3>{Estado.title}</h3>
                        <p className="card-seguridad-description">{Estado.description}</p>
                        </div>
                    ))}
                    </div>
            </div>
               
        </Container>
        

    );
};

export default Seleccion;
