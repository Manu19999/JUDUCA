import React from "react";
import CredencialForm from "../../components/Credencial/credencial"; 
import Tabla from "../../components/Crud/Tabla";
import Nav from '../../components/Dashboard/navDashboard';
import { FaIdBadge } from 'react-icons/fa';

const datos = [
 
  { id: 1, valor: "00.00", fecha_emision: "2025-02-14", fecha_expiracion: "2025-02-14", fecha_inicio: "2025-02-14 08:00:00", fecha_fin: "2025-02-14 11:59:00", activo: "Expirado"  },
  { id: 2, valor: "00.00", fecha_emision: "2025-02-14", fecha_expiracion: "2025-02-14", fecha_inicio: "2025-02-14 08:00:00", fecha_fin: "2025-02-14 11:59:00", activo: "Expirado"  },
  { id: 3, valor: "00.00", fecha_emision: "2025-02-14", fecha_expiracion: "2025-02-14", fecha_inicio: "2025-02-14 08:00:00", fecha_fin: "2025-02-14 11:59:00", activo: "Expirado"  },


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
