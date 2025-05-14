import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import TargetaEstado from "../components/Credencial/targetasEstadoCredencial";
import agregarCredencial from "../assets/FondosCredencial/agregarCredencial.jpg";
import configCredencial from "../assets/FondosCredencial/configCredencial.jpg";
import { ToastContainer, toast } from "react-toastify";  // Importar toastify
import "../styles/Inicio/EventCard.css";
import BotonRegresar from "../components/Dashboard/BotonRegresar";

const Seleccion = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [selectedFicha, setSelectedFicha] = useState(() => {
        const fichaFromState = location.state?.selectedFicha;
        const fichaFromStorage = localStorage.getItem("selectedFicha");
        return fichaFromState || (fichaFromStorage ? JSON.parse(fichaFromStorage) : null);
    });

    useEffect(() => {
        const fichaFromState = location.state?.selectedFicha;
        if (fichaFromState && fichaFromState !== selectedFicha) {
            setSelectedFicha(fichaFromState);
            localStorage.setItem("selectedFicha", JSON.stringify(fichaFromState));
        }
    }, [location.state]);

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
            url: "#"
        },
        {
            id: 2,
            title: "Diseñador de ficha",
            image: configCredencial,
            url: "/Formulario-fichas"
        },
    ];



    return (
        <div className="container mx-auto p-4">

            <Container>
                <BotonRegresar to="/lista-fichas" text="Regresar" />

                {selectedFicha ? (
                    <div className="credenciallisttitle text-center mt-3">
                        <h3>FICHA SELECCIONADA: {selectedFicha.title}</h3>
                        <p>{selectedFicha.description}</p>
                    </div>
                ) : (
                    <p className="text-center text-danger mt-3">
                        No se ha seleccionado ninguna ficha. Redirigiendo...
                    </p>
                )}

                <Row className="justify-content-center">
                    {mantenimientosOptions.map((Estado) => (
                        <Col key={Estado.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                            <TargetaEstado
                                Estado={Estado}
                                selectedFicha={selectedFicha}
                            />
                        </Col>
                    ))}
                </Row>

                {/* Aquí agregas el contenedor de Toast */}
                <ToastContainer />
            </Container>
        </div>

    );
};

export default Seleccion;
