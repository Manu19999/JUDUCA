import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";

const VistaDiseñoCredencial = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedFicha, idCampoCredencial } = location.state || {};

  const [diseñoCredencial, setDiseñoCredencial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedFicha || !idCampoCredencial) {
      alert("No se ha seleccionado una ficha o un campo de credencial.");
      navigate("/credencialView");
      return;
    }

    const fetchDiseñoCredencial = () => {
      try {
        // Obtener el diseño de credencial desde localStorage
        const storedDiseño = localStorage.getItem("diseñoCredencial");
        if (!storedDiseño) {
          throw new Error("No se encontró el diseño de credencial en localStorage.");
        }
        const diseño = JSON.parse(storedDiseño);

        // Aquí puedes filtrar o procesar los datos si es necesario
        const diseñoFiltrado = diseño.find(
          (item) => item.idFichaRegistro === selectedFicha.id && item.idCampoCredencial === idCampoCredencial
        );

        if (!diseñoFiltrado) {
          throw new Error("No se encontró el diseño de credencial para la ficha y campo seleccionados.");
        }

        setDiseñoCredencial(diseñoFiltrado);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDiseñoCredencial();
  }, [selectedFicha, idCampoCredencial, navigate]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container-fluid">
      <Button
        variant="outline-warning"
        onClick={() => navigate("/credencialView")}
        className="d-flex align-items-center gap-2"
        style={{ marginBottom: "20px", marginLeft: "20px" }}
      >
        <FaArrowLeft size={20} /> Regresar
      </Button>

      {diseñoCredencial && (
        <div className="text-center my-4">
          <h2>Diseño de Credencial para: {selectedFicha.title}</h2>
          <p>{selectedFicha.description}</p>
          <div>
            <h3>Detalles del Diseño</h3>
            <p>ID Diseño: {diseñoCredencial.idDiseñoCredencial}</p>
            <p>ID Evento: {diseñoCredencial.idEvento}</p>
            <p>ID Campo Credencial: {diseñoCredencial.idCampoCredencial}</p>
            <p>ID Ficha Registro: {diseñoCredencial.idFichaRegistro}</p>
            <p>Fecha de Vigencia: {new Date(diseñoCredencial.fechaVidencia).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VistaDiseñoCredencial;
