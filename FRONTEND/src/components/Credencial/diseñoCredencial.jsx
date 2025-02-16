import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import fondoCredencial from "../../assets/FondosCredencial/circulitos.png";
import { FaPlus, FaMinus } from "react-icons/fa";


const DiseñoCredencial = () => {
    const { idPlantilla } = useParams();
    const navigate = useNavigate();
    const [plantilla, setPlantilla] = useState(null);
    const [camposDisponibles, setCamposDisponibles] = useState([]);
    const [camposAsignados, setCamposAsignados] = useState([]);
  
    useEffect(() => {
      const obtenerPlantilla = async () => {
        const datosPlantilla = {
          id: idPlantilla,
          nombre: "Ejemplo Plantilla",
          tipoFuente: "Arial",
          tamañoFuente: "14px",
          colorTexto: "#ffffff",
          colorFondo: "#000000",
        };
        setPlantilla(datosPlantilla);
      };
  
      const obtenerCampos = async () => {
        setCamposDisponibles([
          { id: 1, nombre: "Nombre" },
          { id: 2, nombre: "Apellido" },
          { id: 3, nombre: "ID Participante" },
          { id: 4, nombre: "Categoría" },
          { id: 5, nombre: "Código QR" },
        ]);
      };
  
      obtenerPlantilla();
      obtenerCampos();
    }, [idPlantilla]);
  
    const asignarCampo = (campo) => {
      setCamposAsignados([...camposAsignados, campo]);
      setCamposDisponibles(camposDisponibles.filter((c) => c.id !== campo.id));
    };
  
    const eliminarCampo = (campo) => {
      setCamposDisponibles([...camposDisponibles, campo]);
      setCamposAsignados(camposAsignados.filter((c) => c.id !== campo.id));
    };

    const VolverPlantillas = () => {
        navigate("/confCredencial");
      };
  
    const guardarConfiguracion = () => {
      alert("Configuración guardada exitosamente");
      navigate("/");
    };
  
    const estiloCredencial = {
      width: "100%",
      height: "250px",
      backgroundColor: plantilla?.colorFondo || "#ddd",
      color: plantilla?.colorTexto || "#fff",
      fontFamily: plantilla?.tipoFuente || "Arial",
      fontSize: plantilla?.tamañoFuente || "16px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundImage: `url(${fondoCredencial})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      marginTop: "15px",
    };
  
    return (
      <div className="container-fluid">
                <div className="text-right mt-4">
          <button className="btnAgg" onClick={VolverPlantillas}>
          ←  Volver atras
          </button>
        </div>
        <h2 className="text-center">Asignar Campos a la Credencial</h2>
  
        <div className="row mt-4">
          <div className="col-md-5">
            <h5 className="text-center">Campos Disponibles</h5>
            <div className="card p-3">
              <ul className="list-group">
                {camposDisponibles.map((campo) => (
                  <li key={campo.id} className="list-group-item d-flex justify-content-between align-items-center">
                    {campo.nombre}
                    <button className="btn btn-success btn-sm" onClick={() => asignarCampo(campo)}>
                      <FaPlus />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
  
          <div className="col-md-2 d-flex align-items-center justify-content-center">
            <h4>→</h4>
          </div>
  
          <div className="col-md-5">
            <h5 className="text-center">Campos Asignados</h5>
            <div className="card p-3">
              <ul className="list-group">
                {camposAsignados.map((campo) => (
                  <li key={campo.id} className="list-group-item d-flex justify-content-between align-items-center">
                    {campo.nombre}
                    <button className="btn btn-danger btn-sm" onClick={() => eliminarCampo(campo)}>
                      <FaMinus />
                    </button>
                  </li>
                ))}
              </ul>
  
              {/* Vista previa de la credencial dentro de la tarjeta de Campos Asignados */}
              <div style={estiloCredencial}>
                <strong>EJEMPLO DE PLANTILLA</strong>
                <p>Vista previa con fondo</p>
              </div>
            </div>
          </div>
        </div>
  
        <div className="text-center mt-4">
          <button className="btnAgg" onClick={guardarConfiguracion}>
            Guardar Configuración
          </button>
        </div>
      </div>
    );
  };
export default DiseñoCredencial;
