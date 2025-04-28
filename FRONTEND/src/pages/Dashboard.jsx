import React from "react";
import Nav from '../components/Dashboard/navDashboard';
import GestionAreas from '../components/Dashboard/GestionAreas'; // Importa el nuevo componente

const Dashboard = () => {
  return (
    <div>
      <Nav /> {/* Navbar que ya tienes */}
      <GestionAreas /> {/* Nuevo componente de las 3 cajas */}
    </div>
  );
};

export default Dashboard;
