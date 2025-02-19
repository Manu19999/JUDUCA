import React from "react";
import CredencialForm from "../components/Credencial/credencial"; 
import Tabla from "../components/Crud/Tabla";
import Nav from '../components/Dashboard/navDashboard';
import { FaIdBadge } from 'react-icons/fa';

const datos = [

];

const columnas = [
  { nombre: '#', campo: 'id', ancho: '5%' },
  { nombre: 'Evento', campo: 'nombre', ancho: '30%' },
  { nombre: 'Participante', campo: 'edad', ancho: '20%' },
  { nombre: 'Tipo de acceso', campo: 'ciudad', ancho: '40%' },
  { nombre: 'Fecha de emision', campo: 'ciudad', ancho: '40%' },
  { nombre: 'Fecha de vencimiento', campo: 'ciudad', ancho: '40%' },
  { nombre: 'Acción', campo: 'accion', ancho: '20%' }
];

const CrearCredenciales = () => {
  return (
    <div className="crud">
      <Nav />
      <h2><FaIdBadge className="icono-titulo" /> Gestión de Credenciales </h2>
      <Tabla columnas={columnas} datos={datos} />
    </div>
  );
};

export default CrearCredenciales;
