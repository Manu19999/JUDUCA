import React from "react";
import Nav from '../../components/Dashboard/navDashboard';
import ConfiguracionCredencial from "../../components/Credencial/DiseñadorCredencial"; // 
import "../../styles/Credencial/credencial.css";

const DiseñadorCredencial = () => {
  return (
    <div  >
    <div className="no-print">
      <Nav />
    </div>

      <ConfiguracionCredencial />
    </div>
  );
};

export default DiseñadorCredencial;
