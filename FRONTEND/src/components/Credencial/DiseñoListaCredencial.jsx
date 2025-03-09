import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import TargetaEstado from "../Credencial/targetasEstadoCredencial"; // Importar el componente correcto
import EventImage6 from "../../assets/Credencial.jpg"; // Imagen de la ficha
import "../../styles/Credencial/credencial.css";
import { FaArrowLeft } from "react-icons/fa";

const Seleccion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedFicha, setSelectedFicha] = useState(null);

  // Recibir la ficha seleccionada desde el estado de navegación
  useEffect(() => {
    if (location.state && location.state.selectedFicha) {
      setSelectedFicha(location.state.selectedFicha);
    }
  }, [location]);

  // Opciones disponibles
  const mantenimientosOptions = [
    {
      id: 1,
      title: "Listado de participantes",
      image: EventImage6,
      url: "/asignarcredencial"
    },
    {
      id: 2,
      title: "Diseñador de credencial",
      image: EventImage6,
      url: "/AsignacionCampos"
    },
  ];

  return (
    <section id="mantenimientos" className="mantenimiento-list">
      <Container>
        <Button
          variant="outline-warning"
          onClick={() => navigate("/credencialView")}
          className="d-flex align-items-center gap-2"
          style={{ marginTop: '55px' }}
        >
          <FaArrowLeft size={20} /> Regresar
        </Button>

        {selectedFicha && (
          <div className="credenciallisttitle" style={{ marginTop: '20px', alignContent: 'center', textAlign: 'center' }}>
            <h3>Ficha Seleccionada : {selectedFicha.title}</h3>
            <p>{selectedFicha.description}</p>
          </div>
        )}

        <Row>
          {mantenimientosOptions.map((Estado) => (
            <Col key={Estado.id} xs={12} sm={6} md={4} lg={3} xl={2}>
              <TargetaEstado
                Estado={Estado} // Pasar la opción como prop "Estado"
                selectedFicha={selectedFicha} // Pasar la ficha seleccionada
              />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Seleccion;