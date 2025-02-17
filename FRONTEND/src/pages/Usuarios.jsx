import React from "react";
import Tabla from "../components/Crud/Tabla";
import Nav from '../components/Dashboard/navDashboard';
import { FaUser } from 'react-icons/fa';
const datos = [
  { id: 1, nombre: 'Juan', edad: 25, ciudad: 'Madrid' },
  { id: 2, nombre: 'Ana', edad: 30, ciudad: 'Barcelona' },
  { id: 3, nombre: 'Luis', edad: 28, ciudad: 'Valencia' },
  { id: 4, nombre: 'Maria', edad: 22, ciudad: 'Sevilla' },
  { id: 5, nombre: 'Carlos', edad: 35, ciudad: 'Bilbao' },
  { id: 6, nombre: 'Sofia', edad: 27, ciudad: 'Malaga' },
  { id: 7, nombre: 'Pedro', edad: 40, ciudad: 'Zaragoza' },
  { id: 8, nombre: 'Laura', edad: 29, ciudad: 'Murcia' },
  { id: 9, nombre: 'Diego', edad: 33, ciudad: 'Palma' },
  { id: 10, nombre: 'Elena', edad: 26, ciudad: 'Valladolid' },
  { id: 11, nombre: 'Juan', edad: 25, ciudad: 'Madrid' },
  { id: 12, nombre: 'Ana', edad: 30, ciudad: 'Barcelona' },
  { id: 13, nombre: 'Luis', edad: 28, ciudad: 'Valencia' },
  { id: 14, nombre: 'Maria', edad: 22, ciudad: 'Sevilla' },
  { id: 15, nombre: 'Carlos', edad: 35, ciudad: 'Bilbao' },
  { id: 16, nombre: 'Sofia', edad: 27, ciudad: 'Malaga' },
  { id: 17, nombre: 'Pedro', edad: 40, ciudad: 'Zaragoza' },
  { id: 18, nombre: 'Laura', edad: 29, ciudad: 'Murcia' },
  { id: 19, nombre: 'Diego', edad: 33, ciudad: 'Palma' },
  { id: 20, nombre: 'Elena', edad: 26, ciudad: 'Valladolid' },
];

const columnas = [
  { nombre: 'ID', campo: 'id', ancho: '5%' },
  { nombre: 'Nombre', campo: 'nombre', ancho: '30%' },
  { nombre: 'Edad', campo: 'edad', ancho: '20%' },
  { nombre: 'Ciudad', campo: 'ciudad', ancho: '40%' },
  { nombre: 'Acción', campo: 'accion', ancho: '20%' }
];

function App() {
  return (
    <div className="App">
      <Nav />
      <h2><FaUser className="icono-titulo" /> Gestión de usuarios </h2>
      <Tabla columnas={columnas} datos={datos} />
    </div>
  );
}

export default App;
