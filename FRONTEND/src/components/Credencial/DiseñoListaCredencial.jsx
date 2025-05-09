import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import TargetaEstado from "../Credencial/targetasEstadoCredencial";
import agregarCredencial from "../../assets/FondosCredencial/agregarCredencial.jpg";
import configCredencial from "../../assets/FondosCredencial/configCredencial.jpg";
import "../../styles/Credencial/credencial.css";
import BotonRegresar from "../../components/Dashboard/BotonRegresar";


const Seleccion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Estado inicial seguro para evitar problemas si `location.state` es null
  const [selectedFicha, setSelectedFicha] = useState(() => location.state?.selectedFicha || null);

  // Verificar si la ficha seleccionada se ha pasado correctamente
  useEffect(() => {
    if (!selectedFicha) {
      console.warn("No se ha recibido ninguna ficha seleccionada, redirigiendo...");
      navigate("/credencialView"); // Redirigir si no hay ficha seleccionada
    }
  }, [selectedFicha, navigate]);

  // Opciones disponibles
  const mantenimientosOptions = [
    {
      id: 1,
      title: "Listado de participantes",
      image: agregarCredencial,
      url: "/asignarcredencial"
    },
    {
      id: 2,
      title: "Diseñador de credencial",
      image: configCredencial,
      url: "/AsignacionCampos"
    },
  ];

  return (
    <section id="mantenimientos" className="mantenimiento-list">
      <Container>
        <BotonRegresar to="/credencialView" text="Regresar" />
        

        {selectedFicha ? (
          <div className="credenciallisttitle text-center mt-3">
            <h3>Ficha Seleccionada: {selectedFicha.title}</h3>
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
      </Container>
    </section>
  );
};

export default Seleccion;
