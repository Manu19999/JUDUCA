import React, { useState, useEffect } from "react";
import Tabla from "../../components/Crud/Tabla";
import Nav from '../../components/Dashboard/navDashboard';
import { FaHistory } from 'react-icons/fa';
import { mostrarMensajeError } from "../../components/Crud/MensajeError"; // Importar el componente de mensaje de error
import BotonRegresar from "../../components/Dashboard/BotonRegresar";
import { fetchWithAuth } from '../../utils/api';

function Bitacora() {
  const [Bitacoras, setBitacora] = useState([]); // Estado para almacenar los bitacora

  //función reutilizable para obtener los bitacora
  const obtenerBitacoras = async () => {
    try {
      const response = await fetchWithAuth("http://localhost:4000/api/bitacoras", {
        method: "GET",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (!response.ok) {
        throw new Error("Error al obtener los bitacora");
      }

      const data = await response.json();
      setBitacora(data.data); // Actualizar el estado con los objetos obtenidos
    } catch (error) {
      console.error("Error:", error);
      mostrarMensajeError("Error al cargar la bitacora. Inténtalo de nuevo más tarde.");
    }
  };

  // Llamar a la API para obtener la bitacora
  useEffect(() => {
    obtenerBitacoras();
  }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente

  // Columnas de la tabla
  const columnas = [
    { nombre: '#', campo: 'indice', ancho: '5%' },
    { nombre: 'Nombre Usuario', campo: 'nombreUsuario', ancho: '30%' },
    { nombre: 'Nombre Objeto', campo: 'nombreObjeto', ancho: '30%' },
    { nombre: 'Fecha Registro', campo: 'fechaAccion', ancho: '30%' },
    { nombre: 'TIpo Acción', campo: 'acciones', ancho: '20%' },
    { nombre: 'Descripción', campo: 'descripcion', ancho: '45%' },
  
  ];


  return (
    <div className="crud">
      <Nav />
      <BotonRegresar to="/seguridad" text="Regresar" />
      <Tabla
        columnas={columnas}
        datos={Bitacoras.map((bitacora) => ({ ...bitacora, id: bitacora.idBitacora }))}  // Usar los objetos obtenidos de la API
        titulo="Bitacoras del Sistema"
        icono={<FaHistory className="icono-titulo" />}   
        onGenerarReporte={() => console.log("Generar reporte en PDF")}
        objetoNombre="Bitacoras"
      />
    </div>
  );
}

export default Bitacora;