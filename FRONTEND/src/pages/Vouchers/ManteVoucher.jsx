import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { FaArrowLeft, FaEdit, FaTrashAlt, FaReceipt } from "react-icons/fa";
import Nav from "../../components/Dashboard/navDashboard";

// Importa las imágenes que usarás para las cajas
import VoucherImage from "../../../src/assets/Voucher.jpg"; 
import NuevoVoucherImage from "../../../src/assets/Vouchernuevo.jpg"; 
import BotonRegresar from "../../components/Dashboard/BotonRegresar";
import "../../styles/Vouchers/CajaVoucher.css";

const Mantenimientosvoucher = () => {
  const navigate = useNavigate(); // Hook para la navegación

  // Define las cajas que se mostrarán
  const items = [
    {
      id: 1,
      title: "Asignación de Vouchers",
      image: VoucherImage,
      description: "Gestionar los comedores.",
      route: "/voucher", 
    },
    {
      id: 2,
      title: "Consumo de Vouchers",
      image: NuevoVoucherImage,
      description: "Crear un nuevo voucher.",
      route: "/nuevo-voucher", 
    },
        
{
      id: 5,
      title: "Comedores",
      image: NuevoVoucherImage,
      description: "tablas Mantenimiento de vouchers.",
      route: "/CajaComedor", 
    },

  ];

   // Función para manejar el clic en una imagen
  const handleImageClick = (route) => {
    navigate(route); // Navega a la ruta especificada
  };

  return (
    <section id="caja-voucher" className="caja-vouchers-container">
      <Container>
        <Nav />
        <BotonRegresar to="/Vouchers" text="Regresar"  />
        {/* Botón para regresar al dashboard */}
        <div className="crud">
        
           <h2><FaReceipt className="icono-titulo" /> Gestión de Vouchers</h2>
          <div className="caja-vouchers-grid">
            {/* Mapea las cajas */}
            {items.map((item) => (
              <div key={item.id} className="caja-vouchers-card">
                <img
                  src={item.image}
                  alt={item.title}
                  className="caja-vouchers-image"
                  onClick={() => handleImageClick(item.route)} // Navega al hacer clic
                />
                
                <h3>{item.title}</h3>
                <p className="eventdescription">{item.description}</p>
              </div>
              
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Mantenimientosvoucher;














 