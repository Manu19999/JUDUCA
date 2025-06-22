import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Tabla from "../../components/Crud/Tabla.jsx";
import Nav from "../../components/Dashboard/navDashboard.jsx";
import { Spin, Alert } from "antd";
import { Modal, Form } from "react-bootstrap";
import BotonRegresar from "../../components/Dashboard/BotonRegresar";
import "../../styles/Credencial/credencial.css";
import fondoCredencial from "../../assets/FondosCredencial/circulitos.png";
import { FaCreditCard } from "react-icons/fa";


function CrearCredenciales() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedFicha } = location.state || {};

  const [credenciales, setCredenciales] = useState([]);
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [asignaciones, setAsignaciones] = useState({});
  const [ubicaciones, setUbicaciones] = useState([]);
  const [showDesigner, setShowDesigner] = useState(false);
  const [previewSide, setPreviewSide] = useState("frente"); // Añade este estado si no lo tienes

  const printRef = useRef();

  useEffect(() => {
    const fichaGuardada = localStorage.getItem("selectedFicha");

    if (selectedFicha) {
      localStorage.setItem("selectedFicha", JSON.stringify(selectedFicha));
      cargarCredenciales(selectedFicha.idEvento, selectedFicha.id);
    } else if (fichaGuardada) {
      const fichaParseada = JSON.parse(fichaGuardada);
      cargarCredenciales(fichaParseada.idEvento, fichaParseada.id);
    } else {
      alert("No se ha seleccionado una ficha.");
      navigate("/credencialView");
    }
  }, [selectedFicha, navigate]);

  const cargarCredenciales = async (idEvento, idFichaRegistro) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/api/credencial/credenciales/${idEvento}/${idFichaRegistro}`);
      const data = await response.json();
      if (data.hasError) {
        throw new Error(data.errors.join(", "));
      }
      setCredenciales(data.data);
    } catch (err) {
      console.error("Error al obtener credenciales:", err.message);
      setError("No se pudieron cargar las credenciales.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAsignaciones = async () => {
      try {
        if (!selectedFicha?.id) return;

        const response = await fetch(
          `http://localhost:4000/api/credencial/diseCredencial/${selectedFicha.id}`
        );

        if (!response.ok) throw new Error("Error al obtener diseño de credencial");

        const result = await response.json();

        const asignacionesMap = {};
        if (Array.isArray(result.data)) {
          result.data.forEach((item) => {
            const lado = parseInt(item.lado, 10) === 1 ? "frente" : "trasero";
            const clave = `${item.lado ? "frente" : "trasero"}-${item.idUbicacionCampo}`;
            asignacionesMap[clave] = {
              idCampoCredencial: item.idCampoCredencial,
              descripcion: item.caracteristica,
            };
          });
        }

        setAsignaciones(asignacionesMap);
      } catch (error) {
        console.error("Error cargando diseño:", error);
      }
    };

    fetchAsignaciones();
  }, [selectedFicha]);

  useEffect(() => {
    const fetchUbicaciones = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/credencial/ubicacionCampos");
        if (!response.ok) throw new Error("Error al obtener ubicaciones");
        const data = await response.json();
        if (Array.isArray(data.data)) {
          setUbicaciones(data.data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchUbicaciones();
  }, []);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');

    printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Diseño de Credencial</title>
        <style>
          @page {
            size: auto;
            margin: 0mm;
          }
          body {
            margin: 0;
            padding: 15px;
            background-color: white;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .credencial-container {
            width: 750px;
            height: 400px;
            background-image: url(${fondoCredencial});
            background-size: cover;
            background-repeat: no-repeat;
            border: 3px solid #000;
            border-radius: 8px;
            position: relative;
            margin: 0 auto 20mm;
            overflow: hidden;
          }
          .credencial-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(3, 1fr);
            gap: 5px;
            padding: 10px;
            height: 100%;
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
          }
          .campo-credencial {
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px;
            min-height: 80px;
            font-size: 0.9rem;
            text-align: center;
          }
          .titulo-cara {
            text-align: center;
            font-weight: bold;
            margin: 10px 0;
            font-size: 1.2rem;
          }
        </style>
      </head>
      <body>
        ${["frente", "trasero"].map((lado) => `
          <div class="pagina-credencial">
            <div class="titulo-cara">${lado === "frente" ? "FRENTE DE CREDENCIAL" : "REVERSO DE CREDENCIAL"}</div>
            <div class="credencial-container">
              <div class="credencial-grid">
                ${ubicaciones.map(ubicacion => {
      const clave = `${lado}-${ubicacion.idUbicacionCampo}`;
      const campo = asignaciones[clave];
      return `
                    <div class="campo-credencial" style="
                      background-color: ${campo ? '#cfe2ff' : 'rgba(255,255,255,0.6)'};
                      color: ${campo ? '#084298' : '#6c757d'};
                      border: ${campo ? '2px solid #084298' : '1px dashed #ced4da'};
                      font-weight: ${campo ? 'bold' : 'normal'};
                    ">
                      ${campo ? campo.descripcion : ubicacion.descripcion}
                    </div>
                  `;
    }).join('')}
              </div>
            </div>
          </div>
        `).join('')}
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
              window.close();
            }, 300);
          }
        </script>
      </body>
    </html>
  `);
    printWindow.document.close();
  };


  const handleShowDesign = () => {
    setShowDesigner(true);
  };

  const handleHideDesign = () => {
    setShowDesigner(false);
  };


  const handleDetails = (id) => {
    const registro = credenciales.find((d) => d.id === id);
    const datosCompletos = typeof registro?.DatosCompletos === "string"
      ? JSON.parse(registro.DatosCompletos)
      : registro?.DatosCompletos || {};

    setRegistroSeleccionado({
      participante: registro.Participante,
      detalles: datosCompletos
    });

    setShowDetailsModal(true);
  };



  // 🔹 Modal de detalles embebido
  const ModalDetalles = ({ show, onHide, datos }) => (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          DETALLES : {datos?.participante || "Sin nombre"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {datos?.detalles ? (
          Object.entries(datos.detalles)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {value}
              </p>
            ))
        ) : (
          <p>No hay datos para mostrar.</p>
        )}
      </Modal.Body>
    </Modal>
  );

  return (
    <div>
      <Nav />
      <BotonRegresar to="/credencialView" text="Regresar" onClick={() => navigate("/OpcionCredencial")} />
      <div className="credenciallisttitle text-center mt-3" style={{ marginBottom: "30px" }}>
        <h2>{selectedFicha?.title}</h2>
      </div>
      {/* Modal para mostrar el diseñador */}
      <Modal
        show={showDesigner}
        onHide={handleHideDesign}
        size="xl"
        centered
        dialogClassName="modal-credencial"
      >
        <Modal.Header style={{ background: 'linear-gradient(to bottom, #006688, #005577)' }} closeButton className="text-white">
          <Modal.Title className="w-100 text-center">
            <div className="d-flex justify-content-between align-items-center">
              <span style={{ flex: 1 }}></span>
              <h4 className="mb-0">Diseño de Credencial: {selectedFicha?.title}</h4>
              <span style={{ flex: 1 }}></span>
            </div>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-4">
          <div className="container-fluid">
            {/* Controles superiores */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="d-flex align-items-center">
                <Form.Check
                  type="switch"
                  id="switch-preview-side"
                  label={`Vista ${previewSide === "frente" ? "Frontal" : "Trasera"}`}
                  checked={previewSide === "trasero"}
                  onChange={(e) => setPreviewSide(e.target.checked ? "trasero" : "frente")}
                  className="me-3"
                />
              </div>

              <button
                className="btn-nuevo-registro d-flex align-items-center"
                onClick={handlePrint}
              >
                <FaCreditCard className="me-2" />
                <span>Imprimir Diseño</span>
              </button>
            </div>

            {/* Vista previa del diseño */}
            <div className="card shadow-lg border-0">
              <div className="card-body p-0">
                <div
                  className="mx-auto position-relative"
                  style={{
                    width: "100%",
                    height: "500px",
                    maxWidth: "800px",
                    backgroundImage: `url(${fondoCredencial})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    border: "3px solid #2c3e50",
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
                  }}
                >
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100 d-grid"
                    style={{
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gridTemplateRows: "repeat(3, 1fr)",
                      gap: "8px",
                      padding: "15px",
                    }}
                  >
                    {ubicaciones.map((ubicacion) => {
                      const clave = `${previewSide}-${ubicacion.idUbicacionCampo}`;
                      const campo = asignaciones[clave];

                      return (
                        <div
                          key={clave}
                          className="d-flex align-items-center justify-content-center p-2 shadow-sm"
                          style={{
                            backgroundColor: campo ? "rgba(207, 226, 255, 0.9)" : "rgba(255,255,255,0.7)",
                            color: campo ? "#084298" : "#495057",
                            border: campo ? "2px solid #084298" : "1px dashed #adb5bd",
                            borderRadius: "6px",
                            minHeight: "90px",
                            fontWeight: campo ? "600" : "normal",
                            fontSize: "0.95rem",
                            transition: "all 0.2s ease",
                            cursor: "pointer",
                            ':hover': {
                              transform: "scale(1.02)",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                            }
                          }}
                        >
                          {campo ? (
                            <span>{campo.descripcion}</span>
                          ) : (
                            <small className="text-muted">{ubicacion.descripcion}</small>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Indicador de vista actual */}
            <div className="text-center mt-3">
              <span style={{ background: 'linear-gradient(to bottom, #006688, #005577)' }} className="badge text-white fs-6 p-2">
                Vista actual: {previewSide === "frente" ? "Frontal" : "Trasera"}
              </span>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="bg-light">
          <div className="w-100 d-flex justify-content-between align-items-center">
            <div>
              <span className="text-muted me-2">Diseño de credencial</span>
              <span style={{ background: 'linear-gradient(to bottom, #006688, #005577)' }} className="badge">
                {selectedFicha?.title}
              </span>
            </div>
            <button
              className="btn btn-outline-secondary"
              onClick={handleHideDesign}
            >
              <i className="fas fa-times me-2"></i> Cerrar
            </button>
          </div>
        </Modal.Footer>
      </Modal>

      {loading ? (
        <div className="text-center">
          <Spin size="large" />
          <p>Cargando credenciales...</p>
        </div>
      ) : error ? (
        <Alert message={error} type="error" className="text-center" />
      ) : (
        <Tabla
          columnas={[
            { nombre: "#", campo: "id", ancho: "5%" },
            { nombre: "Nombre del participante", campo: "Participante", ancho: "70%" },
            { nombre: "Acción", campo: "accion", ancho: "25%" },
          ]}
          datos={credenciales}
          titulo="Gestión de credenciales" // Título de la tabla
          icono={<FaCreditCard className="icono-titulo" />} // Ícono del título
          onGenerarReporte={() => console.log("Generar reporte en PDF")}
          onDiseñoCredencial={handleShowDesign} // Corregido: pasa la función directamente
          onDetails={(id) => handleDetails(id)}
        />
      )}

      <ModalDetalles
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
        datos={registroSeleccionado}
      />
    </div>
  );
}

export default CrearCredenciales;