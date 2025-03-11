import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import TargetaEstado from "../Credencial/targetasEstadoCredencial";
import agregarCredencial from "../../assets/FondosCredencial/agregarCredencial.jpg";
import configCredencial from "../../assets/FondosCredencial/configCredencial.jpg";
import "../../styles/Credencial/credencial.css";
import { FaArrowLeft } from "react-icons/fa";

const Seleccion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedFicha, setSelectedFicha] = useState(location.state?.selectedFicha || null);

  useEffect(() => {
    if (!selectedFicha) {
      console.warn("No se ha recibido ninguna ficha seleccionada, redirigiendo...");
      navigate("/credencialView"); 
    }
  }, [selectedFicha, navigate]);

  const mantenimientosOptions = [
    {
      id: 1,
      title: "Listado de participantes",
      image: agregarCredencial,
      url: "/asignarcredencial",
      lazy: true
    },
    {
      id: 2,
      title: "Diseñador de credencial",
      image: configCredencial,
      url: "/AsignacionCampos",
      lazy: true

    },
  ];

  return (
    <section id="mantenimientos" className="mantenimiento-list">
      <Container>
        <Button
          variant="outline-warning"
          onClick={() => navigate("/credencialView")}
          className="d-flex align-items-center gap-2 mt-4"
        >
          <FaArrowLeft size={20} /> Regresar
        </Button>

        {selectedFicha ? (
          <div className="credenciallisttitle text-center mt-3">
            <h3>Ficha Seleccionada : {selectedFicha.title}</h3>
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
