import React from "react";
import CredencialForm from "../components/credencial"; // Asegúrate de que la ruta sea correcta
import Nav from '../components/Dashboard/nav';

const CrearCredenciales = () => {
  return (
    <div  >
      <Nav />
      <CredencialForm />
    </div>
  );
};

export default CrearCredenciales;
