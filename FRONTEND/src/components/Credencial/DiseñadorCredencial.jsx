import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Table, Alert, Card, Container } from "react-bootstrap";
import { FaArrowLeft, FaClipboardList, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const VistaDiseñoCredencial = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Intentar obtener la ficha desde `location.state` o `localStorage`
  const [selectedFicha, setSelectedFicha] = useState(
    location.state?.selectedFicha || JSON.parse(localStorage.getItem("selectedFicha")) || null
  );

  const [diseños, setDiseños] = useState([]);
  const [campos, setCampos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedFicha) {
      setError("⚠ No se seleccionó ninguna ficha. Por favor, vuelve a la página anterior.");
      return;
    }

    // Guardar la ficha seleccionada en localStorage para persistencia
    localStorage.setItem("selectedFicha", JSON.stringify(selectedFicha));

    // Simulando datos de la base de datos desde localStorage
    const savedDiseños = localStorage.getItem("diseñosCredencial");
    const savedCampos = localStorage.getItem("camposCredencial");

    if (savedDiseños) {
      setDiseños(JSON.parse(savedDiseños));
    } else {
      setError("⚠ No hay diseños de credenciales disponibles.");
    }

    if (savedCampos) {
      setCampos(JSON.parse(savedCampos));
    }
  }, [selectedFicha]);

  return (
    <Container className="mt-4">
      <Button 
        variant="outline-warning" 
        onClick={() => navigate("/")}
        className="d-flex align-items-center gap-2 mb-3"
        style={{ fontSize: "18px" }}
      >
        <FaArrowLeft size={20} /> Regresar
      </Button>

      <h2 className="text-center my-4">🎨 Vista de Diseño de Credencial</h2>

      {error ? (
        <div className="text-center">
          <Alert variant="danger" className="py-3">
            <FaTimesCircle size={20} className="me-2" />
            {error}
          </Alert>
          <Button variant="primary" onClick={() => navigate("/SeleccionarFicha")}>
            Seleccionar Ficha
          </Button>
        </div>
      ) : (
        <>
          {/* 🔹 Información de la Ficha Seleccionada */}
          {selectedFicha && (
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <h4 className="text-center mb-2">📌 Ficha Seleccionada</h4>
                <hr />
                <h5 className="text-center">{selectedFicha.title}</h5>
                <p className="text-center">{selectedFicha.description}</p>
              </Card.Body>
            </Card>
          )}

          {/* 🔹 Tabla de Diseños de Credencial */}
          <h4 className="mb-3"><FaClipboardList className="me-2" /> Diseños de Credenciales</h4>
          <Table striped bordered hover responsive className="shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>ID Diseño</th>
                <th>ID Evento</th>
                <th>ID Campo Credencial</th>
                <th>ID Ficha Registro</th>
                <th>Fecha de Vigencia</th>
              </tr>
            </thead>
            <tbody>
              {diseños.length > 0 ? (
                diseños.map((diseño) => (
                  <tr key={diseño.idDiseñoCredencial}>
                    <td>{diseño.idDiseñoCredencial}</td>
                    <td>{diseño.idEvento}</td>
                    <td>{diseño.idCampoCredencial}</td>
                    <td>{diseño.idFichaRegistro}</td>
                    <td>{diseño.fechaVigencia}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">No hay diseños disponibles.</td>
                </tr>
              )}
            </tbody>
          </Table>

          {/* 🔹 Tabla de Campos de Credencial */}
          <h4 className="mt-4 mb-3"><FaCheckCircle className="me-2 text-success" /> Campos de Credencial</h4>
          <Table striped bordered hover responsive className="shadow-sm">
            <thead className="table-primary">
              <tr>
                <th>ID Campo Credencial</th>
                <th>ID Ubicación Campo</th>
                <th>Característica</th>
              </tr>
            </thead>
            <tbody>
              {campos.length > 0 ? (
                campos.map((campo) => (
                  <tr key={campo.idCampoCredencial}>
                    <td>{campo.idCampoCredencial}</td>
                    <td>{campo.idUbicacionCampo}</td>
                    <td>{campo.caracteristica}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-muted">No hay campos disponibles.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default VistaDiseñoCredencial;
