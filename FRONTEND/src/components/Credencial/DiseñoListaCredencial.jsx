import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import  useAuth  from "../../hooks/useAuth"; // Importa el hook de autenticación
import TargetaEstado from "../Credencial/targetasEstadoCredencial";
import agregarCredencial from "../../assets/FondosCredencial/ListaCredenciales.jpg";
import configCredencial from "../../assets/FondosCredencial/DiseñoCredencial.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/Inicio/EventCard.css";
import BotonRegresar from "../../components/Dashboard/BotonRegresar";
import { fetchWithAuth } from '../../utils/api';

// Definir los nombres de objetos para cada opción
const CREDENCIAL_VIEWS = {
  ASIGNAR_CREDENCIAL: 'AsignacionCredencial',
  DISENADOR_CREDENCIAL: 'AsignacionCampos'
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

  // Todas las opciones con sus permisos requeridos
  const allOptions = [
    {
      id: 1,
      title: "Listado de participantes",
      image: agregarCredencial,
      url: "/asignarcredencial",
      requiredPermission: CREDENCIAL_VIEWS.ASIGNAR_CREDENCIAL
    },
    {
      id: 2,
      title: "Diseñador de credencial",
      image: configCredencial,
      url: "/AsignacionCampos",
      requiredPermission: CREDENCIAL_VIEWS.DISENADOR_CREDENCIAL
    },
  ];

  // Filtrar opciones basadas en los permisos del usuario
  const visibleOptions = allOptions.filter(option => 
    hasPermission(option.requiredPermission, 'consultar')
  );

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
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "Error al insertar la credencial.");
    }
  };

  return (
    <Container>
      <BotonRegresar to="/credencialView" text="Regresar" />

      {selectedFicha ? (
        <div className="credenciallisttitle text-center mt-3">
          <h3><strong>CONFIGURACION DE CREDENCIAL</strong></h3>
          <h3>FICHA SELECCIONADA : {selectedFicha.title}</h3>
        </div>
      ) : (
        <p className="text-center text-danger mt-3">
          No se ha seleccionado ninguna ficha. Redirigiendo...
        </p>
      )}

      {visibleOptions.length > 0 ? (
        <Row className="justify-content-center">
          {visibleOptions.map((Estado) => (
            <Col key={Estado.id} xs={12} sm={6} md={4} lg={3} xl={2}>
              <TargetaEstado
                Estado={Estado}
                selectedFicha={selectedFicha}
                onClickEspecial={
                  Estado.id === 1
                    ? async () => {
                      await handleInsertarCredencial();
                    }
                    : null
                }
              />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center mt-5">
          <p className="no-access-message">
            No tienes permisos para acceder a ninguna opción de configuración de credencial
          </p>
        </div>
      )}

      <ToastContainer />
    </Container>
  );
};

export default Seleccion;