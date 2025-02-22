import React, { useState } from "react";
import Tabla from "../components/Crud/Tabla";
import Nav from '../components/Dashboard/navDashboard';
import { FaUser } from 'react-icons/fa';
import Modal from "../components/Crud/Modales";
import ModalConfirmacion from "../components/Crud/ModalConfirmacion";

// Datos de ejemplo
const datos = [
  { id: 1, usuario: 'juan_perez', correo: 'juan.perez@gmail.com', rol: 'Estudiante', estado: 'Activo' },
  { id: 2, usuario: 'ana_gomez', correo: 'ana.gomez@yahoo.com', rol: 'Profesor', estado: 'Inactivo' },
  { id: 3, usuario: 'luis_martinez', correo: 'luis.martinez@hotmail.com', rol: 'Administrador', estado: 'Activo' },
  { id: 4, usuario: 'maria_lopez', correo: 'maria.lopez@gmail.com', rol: 'Estudiante', estado: 'Activo' },
  { id: 5, usuario: 'carlos_garcia', correo: 'carlos.garcia@outlook.com', rol: 'Profesor', estado: 'Activo' },
  { id: 6, usuario: 'sofia_diaz', correo: 'sofia.diaz@yahoo.com', rol: 'Estudiante', estado: 'Inactivo' },
  { id: 7, usuario: 'pedro_fernandez', correo: 'pedro.fernandez@hotmail.com', rol: 'Estudiante', estado: 'Activo' },
  { id: 8, usuario: 'laura_martin', correo: 'laura.martin@gmail.com', rol: 'Profesor', estado: 'Activo' },
  { id: 9, usuario: 'diego_ramos', correo: 'diego.ramos@yahoo.com', rol: 'Estudiante', estado: 'Activo' },
  { id: 10, usuario: 'elena_hernandez', correo: 'elena.hernandez@outlook.com', rol: 'Administrador', estado: 'Inactivo' },
  { id: 11, usuario: 'juan_perez', correo: 'juan.perez@gmail.com', rol: 'Estudiante', estado: 'Activo' },
  { id: 12, usuario: 'ana_gomez', correo: 'ana.gomez@yahoo.com', rol: 'Profesor', estado: 'Inactivo' },
  { id: 13, usuario: 'luis_martinez', correo: 'luis.martinez@hotmail.com', rol: 'Administrador', estado: 'Activo' },
  { id: 14, usuario: 'maria_lopez', correo: 'maria.lopez@gmail.com', rol: 'Estudiante', estado: 'Activo' },
  { id: 15, usuario: 'carlos_garcia', correo: 'carlos.garcia@outlook.com', rol: 'Profesor', estado: 'Activo' },
  { id: 16, usuario: 'sofia_diaz', correo: 'sofia.diaz@yahoo.com', rol: 'Estudiante', estado: 'Inactivo' },
  { id: 17, usuario: 'pedro_fernandez', correo: 'pedro.fernandez@hotmail.com', rol: 'Estudiante', estado: 'Activo' },
  { id: 18, usuario: 'laura_martin', correo: 'laura.martin@gmail.com', rol: 'Profesor', estado: 'Activo' },
  { id: 19, usuario: 'diego_ramos', correo: 'diego.ramos@yahoo.com', rol: 'Estudiante', estado: 'Activo' },
  { id: 20, usuario: 'elena_hernandez', correo: 'elena.hernandez@outlook.com', rol: 'Administrador', estado: 'Inactivo' },
];

// Columnas de la tabla
const columnas = [
  { nombre: '#', campo: 'id', ancho: '5%' },
  { nombre: 'Usuario', campo: 'usuario', ancho: '20%' },
  { nombre: 'Correo', campo: 'correo', ancho: '40%' },
  { nombre: 'Rol', campo: 'rol', ancho: '25%' },
  { nombre: 'Estado', campo: 'estado', ancho: '15%' },
  { nombre: 'Acción', campo: 'accion', ancho: '20%' }
];

function Usuarios() {
  const [showNuevoModal, setShowNuevoModal] = useState(false); // controla la visibilidad del modal para agregar un nuevo registro
  const [showEditModal, setShowEditModal] = useState(false); // controla la visibilidad del modal para editar un registro existente
  const [showDeleteModal, setShowDeleteModal] = useState(false); // controla la visibilidad del modal de confirmación para eliminar un registro
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null); // almacena el registro que se está editando o eliminando

  // Funciones para manejar la visibilidad de modales
  const handleNuevoRegistro = () => {
    setShowNuevoModal(true);
  };

  const handleEdit = (id) => {
    const registro = datos.find(d => d.id === id);
    setRegistroSeleccionado(registro);
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    const registro = datos.find(d => d.id === id);
    setRegistroSeleccionado(registro);
    setShowDeleteModal(true);
  };

  // Funciones para guardar, editar y eliminar registro
  const handleGuardarNuevo = () => {
    console.log("Simulación: Guardar nuevo registro");
    setShowNuevoModal(false);
  };

  const handleGuardarEdit = () => {
    console.log("Simulación: Guardar cambios en el registro:", registroSeleccionado);
    setShowEditModal(false);
  };

  const handleConfirmarDelete = () => {
    console.log("Simulación: Eliminar registro con ID:", registroSeleccionado?.id);
    setShowDeleteModal(false); // Cerrar el modal de confirmación
  };

  return (
    <div className="crud">
      <Nav /> {/* Muestra el componente Navbar */}
      {/* Muestra la tabla pasándole las columnas, los datos, el titulo, el ícono y las funciones para mostrar los modales */}
      <Tabla 
        columnas={columnas}
        datos={datos}
        titulo="Gestión de usuarios"
        icono={<FaUser className="icono-titulo" />}
        onNuevoRegistro={handleNuevoRegistro}
        onGenerarReporte={() => console.log("Generar reporte en PDF")}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal para Nuevo Registro */}
      <Modal
        show={showNuevoModal}
        onHide={() => setShowNuevoModal(false)}
        titulo="Nuevo Usuario"
        onGuardar={handleGuardarNuevo}
      >
        <form>
          <div className="form-group">
            <label>Usuario</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label>Correo</label>
            <input type="email" className="form-control" />
          </div>
          <div className="form-group">
            <label>Rol</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label>Estado</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label>Usuario</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label>Correo</label>
            <input type="email" className="form-control" />
          </div>
          <div className="form-group">
            <label>Rol</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label>Estado</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label>Usuario</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label>Correo</label>
            <input type="email" className="form-control" />
          </div>
          <div className="form-group">
            <label>Rol</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label>Estado</label>
            <input type="text" className="form-control" />
          </div>
        </form>
      </Modal>

      {/* Modal para Editar Registro */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        titulo="Editar Usuario"
        onGuardar={handleGuardarEdit}
      >
        <form>
          <div className="form-group">
            <label>Usuario</label>
            <input
              type="text"
              className="form-control"
              defaultValue={registroSeleccionado?.usuario}
            />
          </div>
          <div className="form-group">
            <label>Correo</label>
            <input
              type="email"
              className="form-control"
              defaultValue={registroSeleccionado?.correo}
            />
          </div>
          <div className="form-group">
            <label>Rol</label>
            <input
              type="text"
              className="form-control"
              defaultValue={registroSeleccionado?.rol}
            />
          </div>
          <div className="form-group">
            <label>Estado</label>
            <input
              type="text"
              className="form-control"
              defaultValue={registroSeleccionado?.estado}
            />
          </div>
        </form>
      </Modal>
      {/* Modal para Confirmar Eliminación */}
      <ModalConfirmacion
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirmar={handleConfirmarDelete}
        mensaje={`¿Estás seguro de que deseas eliminar a ${registroSeleccionado?.usuario}?`}
      />
    </div>
  );
}

export default Usuarios;
