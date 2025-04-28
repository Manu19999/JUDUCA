import React, { useState, useEffect } from "react";
import axios from "axios";
import Tabla from "../components/Crud/Tabla";
import Nav from '../components/Dashboard/navDashboard';
import NuevoVoucherModal from "../components/Vouchers/NuevoVoucherModal";
import BotonesAccion from '../components/Crud/BotonesAccion';
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { FaArrowLeft } from "react-icons/fa";
import { FaEdit, FaTrashAlt, FaReceipt, FaPlus } from "react-icons/fa";

const Voucher = () => {
  const navigate = useNavigate(); // Hook para la navegación
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onNuevoRegistro = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const fetchVouchers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/voucherComida");
      setVouchers(response.data);
    } catch (error) {
      console.error("Error al obtener los vouchers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString('es-ES');
  };

  const formatActiveStatus = (active) => {
    return active ? "Activo" : "Inactivo";
  };

  const columnas = [
    { nombre: "ID", campo: "autoIncrementId", ancho: "7%" },
    { nombre: "Evento", campo: "nombreEvento", ancho: "17%" }, 
    { nombre: "Universidad", campo: "nombreUniversidad", ancho: "25%" },
    { nombre: "Diseño Credencial", campo: "idDisenioCredencial", ancho: "15%" },
    { nombre: "Fecha Emisión", campo: "fechaEmision", ancho: "19%" },
    { nombre: "Fecha Expiración", campo: "fechaExpiracion", ancho: "19%" },
    { nombre: "Cantidad Disponible", campo: "cantidadDisponible", ancho: "19%" },
    { nombre: "Fecha Inicio", campo: "fechaInicio", ancho: "19%" },
    { nombre: "Fecha Fin", campo: "fechaFinal", ancho: "19%" },
    { nombre: "Activo", campo: "activo", ancho: "15%" },
    { nombre: "Acción", campo: "accion", ancho: "15%" },
  ];

  const customActions = (id) => (
    <div>
      <button 
        onClick={() => handleEdit(id)} 
        className="btn btn-outline-warning mx-1"
      >
        <FaEdit />
      </button>
      <button 
        onClick={() => handleDelete(id)} 
        className="btn btn-outline-danger mx-1"
      >
        <FaTrashAlt />
      </button>
    </div>
  );

  const voucherConAccion = vouchers.map((voucher, index) => ({
    ...voucher,
    autoIncrementId: index + 1,
    accion: customActions(voucher.idVoucherComida),
    fechaEmision: formatDate(voucher.fechaEmision),
    fechaExpiracion: formatDate(voucher.fechaExpiracion),
    fechaInicio: formatDate(voucher.fechaInicio),
    fechaFinal: formatDate(voucher.fechaFinal),
    activo: formatActiveStatus(voucher.activo),
  }));

  const refreshVouchers = () => {
    fetchVouchers();
  };

  const handleAddNewVoucher = () => {
    console.log("Añadir nuevo voucher");
  };

  return (
    <div className="crud">
      <Nav />
      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 15px', right: '0' }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: window.innerWidth < 768 ? 'column' : 'row', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          marginBottom: '1rem' 
        }}>
           <Button
                      variant="outline-warning"
                      onClick={() => navigate("/vouchers")} // Navega a la gestión de eventos
                      className="d-flex align-items-center gap-2"
                      style={{ marginTop: '55px' }}
                    >
                      <FaArrowLeft size={20} /> Regresar
                    </Button>
          <h2 style={{ marginRight: '25rem' }}>
            <FaReceipt className="icono-titulo" /> Gestión de voucher
          </h2>
          
        </div>

        {loading ? (
          <p>Cargando...</p>
        ) : (
          <Tabla 
            columnas={columnas} 
            datos={voucherConAccion} 
            onNuevoRegistro={onNuevoRegistro}
            mensajeNoDatos="No se encontraron vouchers."
          />
        )}
      </div>
      <NuevoVoucherModal isOpen={isModalOpen} onClose={handleCloseModal} refreshVouchers={refreshVouchers} />
    </div>
  );
};

export default Voucher;