import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaTrashAlt, FaReceipt } from "react-icons/fa";
import Nav from "../../components/Dashboard/navDashboard";
import useAuth from "../../hooks/useAuth"; // Importa el hook de autenticación

// Importa las imágenes que usarás para las cajas
import VoucherImage from "../../../src/assets/Voucher.jpg"; 
import NuevoVoucherImage from "../../../src/assets/Vouchernuevo.jpg"; 
import BotonRegresar from "../../components/Dashboard/BotonRegresar";
import "../../styles/Vouchers/CajaVoucher.css";

// Definir los nombres de objetos para cada módulo de voucher
const VOUCHER_VIEWS = {
  VOUCHER: 'Voucher',
  NUEVO_VOUCHER: 'NuevoVoucher',
  MANTENIMIENTO: 'ManteVoucher'
};

const CajaVouchers = () => {
  const navigate = useNavigate();
  const { hasPermission } = useAuth(); // Obtiene la función para verificar permisos

  // Todos los ítems con sus permisos requeridos
  const allItems = [
    {
      id: 1,
      title: "Voucher",
      image: VoucherImage,
      description: "Gestión de vouchers existentes.",
      route: "/voucher",
      requiredPermission: VOUCHER_VIEWS.VOUCHER
    },
    {
      id: 2,
      title: "Nuevo Voucher",
      image: NuevoVoucherImage,
      description: "Crear un nuevo voucher.",
      route: "/nuevo-voucher",
      requiredPermission: VOUCHER_VIEWS.NUEVO_VOUCHER
    },
    {
      id: 3,
      title: "Mantenimiento",
      image: NuevoVoucherImage,
      description: "Comedores, comidas, ubicaciones, etc.",
      route: "/Mantenimientosvoucher",
      requiredPermission: VOUCHER_VIEWS.MANTENIMIENTO
    },
  ];

  // Filtrar ítems basados en los permisos del usuario
  const visibleItems = allItems.filter(item => 
    hasPermission(item.requiredPermission, 'consultar')
  );

  // Función para manejar el clic en una imagen
  const handleImageClick = (route) => {
    navigate(route);
  };

  return (
    <section id="caja-voucher" className="caja-vouchers-container">
      <Container>
        <Nav />
        <BotonRegresar to="/gestion-evento" text="Regresar" />
        
        <div className="crud">
          <h2><FaReceipt className="icono-titulo" /> Gestión de Vouchers</h2>
          
          {visibleItems.length > 0 ? (
            <div className="caja-vouchers-grid">
              {visibleItems.map((item) => (
                <div 
                  key={item.id} 
                  className="caja-vouchers-card"
                  onClick={() => handleImageClick(item.route)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="caja-vouchers-image"
                  />
                  <h3>{item.title}</h3>
                  <p className="eventdescription">{item.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-access-message">
              No tienes permisos para acceder a ningún módulo de vouchers
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default CajaVouchers;