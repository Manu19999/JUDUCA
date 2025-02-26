import React, { useState, useEffect } from "react";
import Tabla from "../../components/Crud/Tabla";
import Nav from '../../components/Dashboard/navDashboard';
import { FaUserShield } from 'react-icons/fa';
import ModalNuevo from "../../components/Crud/Modal/ModalNuevo";
import ModalEditar from "../../components/Crud/Modal/ModalEditar";
import ModalDetalles from "../../components/Crud/Modal/ModalDetalles";
import ModalConfirmacion from "../../components/Crud/Modal/ModalConfirmacion";
import { mostrarMensajeExito } from "../../components/Crud/MensajeExito";

import { Input, Select, Form} from 'antd';


// Datos de ejemplo
const datos = [
  {
    id: 1,
    nombre: 'Administrador',
    descripcion: 'Rol poseedor de todos los permisos',
  },
  {
    id: 2,
    nombre: 'Delegado',
    descripcion: 'Representante de cada universidad',
  },
];

// Columnas de la tabla
const columnas = [
  { nombre: '#', campo: 'id', ancho: '5%' },
  { nombre: 'Nombre', campo: 'nombre', ancho: '20%' },
  { nombre: 'Descripción', campo: 'descripcion', ancho: '40%' },
  { nombre: 'Acción', campo: 'accion', ancho: '20%' }
];

function Roles() {
  const [showNuevoModal, setShowNuevoModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [formNuevo] = Form.useForm(); // Formulario para el modal de nuevo registro
  const [formEditar] = Form.useForm(); // Formulario para el modal de edición

  // Abrir modal de nuevo registro
  const handleNuevoRegistro = () => {
    setShowNuevoModal(true);
  };

  // Abrir modal de edición
  const handleEdit = (id) => {
    const registro = datos.find((d) => d.id === id);
    setRegistroSeleccionado(registro); // Actualizar el registro seleccionado
    setShowEditModal(true); // Abrir el modal de edición
  };
  
  const handleCerrarEditModal = () => {
    setShowEditModal(false);
    setRegistroSeleccionado(null); // Limpiar el registro seleccionado
    formEditar.resetFields(); // Reiniciar el formulario
  };

  const handleDelete = (id) => {
    const registro = datos.find(d => d.id === id);
    setRegistroSeleccionado(registro);
    setShowDeleteModal(true); // Abrir el modal de eliminación
  };

  const handleDetails = (id) => {
    const registro = datos.find((d) => d.id === id);
    setRegistroSeleccionado(registro);
    setShowDetailsModal(true);
  };

  // Guardar nuevo registro
  const handleGuardarNuevo = () => {
    formNuevo
      .validateFields()
      .then((values) => {
        console.log("Nuevo registros:", values);
        setShowNuevoModal(false);
        formNuevo.resetFields(); // Limpiar el formulario de nuevo registro
        mostrarMensajeExito("El rol se ha registrado correctamente."); // Mensaje de éxito
      })
      .catch((error) => {
        console.error("Error al validar el formulario:", error);
      });
  };

  // Guardar cambios en el registro editado
  const handleGuardarEdit = () => {
    formEditar
      .validateFields()
      .then((values) => {
        console.log("Registro editado:", values);
        setShowEditModal(false);
        setRegistroSeleccionado(null);
        formEditar.resetFields(); // Limpiar el formulario de edición
        mostrarMensajeExito("El rol se ha actualizado correctamente."); // Mensaje de éxito
      })
      .catch((error) => {
        console.error("Error al validar el formulario:", error);
      });
  };

  const handleConfirmarDelete = () => {
    console.log("Simulación: Eliminar registro con ID:", registroSeleccionado?.id);
    setShowDeleteModal(false);
    mostrarMensajeExito("El rol se ha eliminado correctamente.");
  };

  return (
    <div className="crud">
      <Nav />
      <Tabla
        columnas={columnas}
        datos={datos}
        titulo="Gestión de roles"
        icono={<FaUserShield className="icono-titulo" />}
        onNuevoRegistro={handleNuevoRegistro}
        onGenerarReporte={() => console.log("Generar reporte en PDF")}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal para Nuevo Registro */}
      <ModalNuevo
        show={showNuevoModal}
        onHide={() => setShowNuevoModal(false)}
        titulo="Nuevo Rol"
        onGuardar={handleGuardarNuevo}
        form={formNuevo} // Pasar el formulario al modal
        width={800}
      >
        <Form layout="vertical" form={formNuevo}>
          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[{ required: true, message: "El nombre es obligatorio" }]}
          >
            <Input placeholder="Ingresa el nombre del rol" />
          </Form.Item>

          <Form.Item
            label="Descripción"
            name="descripcion"
            rules={[{ required: true, message: "La descripción es obligatoria" }]}
          >
            <Input.TextArea placeholder="Descripción del rol" />
          </Form.Item>
        </Form>
      </ModalNuevo>

      {/* Modal para Editar Registro */}
      <ModalEditar
        show={showEditModal}
        onHide={handleCerrarEditModal}
        titulo="Editar Rol"
        onGuardar={handleGuardarEdit}
        form={formEditar}
        registroSeleccionado={registroSeleccionado}
        width={800} // Ancho personalizado
      >
        <Form layout="vertical" form={formEditar} initialValues={registroSeleccionado || {}}>
          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[{ required: true, message: "El nombre es obligatorio" }]}
          >
            <Input placeholder="Ingresa el nombre del rol" />
          </Form.Item>

          <Form.Item
            label="Descripción"
            name="descripcion"
            rules={[{ required: true, message: "La descripción es obligatoria" }]}
          >
            <Input.TextArea placeholder="Descripción del rol" />
          </Form.Item>
        </Form>
      </ModalEditar>

      {/* Modal para Confirmar Eliminación */}
      <ModalConfirmacion
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirmar={handleConfirmarDelete}
        mensaje={`¿Estás seguro de que deseas eliminar el rol ${registroSeleccionado?.nombre}?`}
      />
    </div>
  );
}

export default Roles;
