import React, { useState, useEffect } from "react";
import Tabla from "../../components/Crud/Tabla";
import Nav from '../../components/Dashboard/navDashboard';
import { FaUserShield } from 'react-icons/fa';
import ModalNuevo from "../../components/Crud/Modal/ModalNuevo";
import ModalEditar from "../../components/Crud/Modal/ModalEditar";
import ModalConfirmacion from "../../components/Crud/Modal/ModalConfirmacion";
import ModalDetalles from "../../components/Crud/Modal/ModalDetalles";
import { mostrarMensajeExito } from "../../components/Crud/MensajeExito";
import { mostrarMensajeError } from "../../components/Crud/MensajeError"; // Importar el componente de mensaje de error
import { Input, Form } from 'antd';
import ValidatedInput from "../../utils/ValidatedInput"; 
import BotonRegresar from "../../components/Dashboard/BotonRegresar";

function Roles() {
  const [showNuevoModal, setShowNuevoModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [formNuevo] = Form.useForm(); // Formulario para el modal de nuevo registro
  const [formEditar] = Form.useForm(); // Formulario para el modal de edición
  const [roles, setRoles] = useState([]); // Estado para almacenar los roles

  //función reutilizable para obtener los roles
  const obtenerRoles = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/roles", {
        method: "GET",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (!response.ok) {
        throw new Error("Error al obtener los roles");
      }

      const data = await response.json();
      setRoles(data.data); // Actualizar el estado con los roles obtenidos
    } catch (error) {
      console.error("Error:", error);
      mostrarMensajeError("Error al cargar los roles. Inténtalo de nuevo más tarde.");
    }
  };

  // Llamar a la API para obtener los roles
  useEffect(() => {
    obtenerRoles();
  }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente

  // Columnas de la tabla
  const columnas = [
    { nombre: '#', campo: 'indice', ancho: '5%' },
    { nombre: 'Nombre', campo: 'nombre', ancho: '20%' },
    { nombre: 'Descripción', campo: 'descripcion', ancho: '40%' },
    { nombre: 'Acción', campo: 'accion', ancho: '15%' }
  ];

  // Abrir modal de nuevo registro
  const handleNuevoRegistro = () => {
    setShowNuevoModal(true);
  };

  // Abrir modal de edición
  const handleEdit = (id) => {
    const registro = roles.find((d) => d.idRol === id);
    setRegistroSeleccionado(registro); // Actualizar el registro seleccionado
    setShowEditModal(true); // Abrir el modal de edición
  };
  // cerrar modal de edición
  const handleCerrarEditModal = () => {
    setShowEditModal(false);
    setRegistroSeleccionado(null); // Limpiar el registro seleccionado
    formEditar.resetFields(); // Reiniciar el formulario
  };

  const handleDelete = (id) => {
    const registro = roles.find(d => d.idRol === id);
    setRegistroSeleccionado(registro);
    setShowDeleteModal(true); // Abrir el modal de eliminación
  };

    // Abrir modal de detalles
    const handleDetails = (id) => {
      const registro = roles.find((d) => d.idRol === id);
      setRegistroSeleccionado(registro);
      setShowDetailsModal(true);
    };

  // Guardar nuevo registro
  const handleGuardarNuevo = async () => {
    formNuevo.validateFields()
    .then(async (values) => {
      try {

        const response = await fetch("http://localhost:4000/api/roles", {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: values.nombre,
            descripcion: values.descripcion,
            idObjeto: 3, // ID del objeto 
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.errors?.[0] || "Error al insertar el rol");
        }
        // **Actualizar la tabla después de agregar un nuevo rol**
        setRoles(prevRoles => [...prevRoles, data.data]);

        setShowNuevoModal(false);
        formNuevo.resetFields(); // Limpiar el formulario de nuevo registro
        mostrarMensajeExito("El rol se ha registrado correctamente."); // Mensaje de éxito
      } catch (error) {
        console.error("Error:", error);
        mostrarMensajeError(error.message);
      }
    })
   .catch((error) => {
      console.error("Error al validar el formulario:", error);
    });
  };

  // Guardar cambios en el registro editado (para roles)
  const handleGuardarEdit = async () => {
    try {
      // Validar los campos del formulario
      const values = await formEditar.validateFields();

      // Llamar a la API para actualizar el rol
      const response = await fetch(`http://localhost:4000/api/roles/${registroSeleccionado.idRol}`, {
        method: "PUT",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: values.nombre,
          descripcion: values.descripcion,
          idObjeto: 3, // ID del objeto 
        }),
      });

      // Manejar la respuesta de la API
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.errors?.[0] || "Error al actualizar el rol");
      }

      // Mostrar mensaje de éxito
      mostrarMensajeExito("El rol se ha actualizado correctamente.");

      // Cerrar el modal de edición
      setShowEditModal(false);
      setRegistroSeleccionado(null);
      formEditar.resetFields();

      // Recargar los roles desde la API
      await obtenerRoles();
    } catch (error) {
      // Mostrar mensaje de error
      mostrarMensajeError(error.message);
    }
  };

 // Función para eliminar un rol
  const handleConfirmarDelete = async () => {
    try {
      if (!registroSeleccionado) return;

      const response = await fetch(`http://localhost:4000/api/roles/${registroSeleccionado.idRol}`, {
        method: "DELETE",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idObjeto: 3, // ID del objeto según el sistema de seguridad
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors?.[0] || "Error al eliminar el rol");
      }

      // Actualizar la lista de roles sin el rol eliminado
      setRoles(prevRoles => prevRoles.filter(rol => rol.idRol !== registroSeleccionado.idRol));

      // Cerrar el modal de confirmación
      setShowDeleteModal(false);
      setRegistroSeleccionado(null);

      // Mostrar mensaje de éxito
      mostrarMensajeExito("El rol se ha eliminado correctamente.");
    } catch (error) {
      console.error("Error:", error);
      mostrarMensajeError(error.message);
    }
  };


  return (
    <div className="crud">
      <Nav />
      <BotonRegresar to="/seguridad" text="Regresar" />
      <Tabla
        columnas={columnas}
        datos={roles.map((rol) => ({ ...rol, id: rol.idRol }))}  // Usar los roles obtenidos de la API
        titulo="Gestión de Roles"
        icono={<FaUserShield className="icono-titulo" />}
        onNuevoRegistro={handleNuevoRegistro}
        onGenerarReporte={() => console.log("Generar reporte en PDF")}
        onPermisos={() => console.log("Generar reporte en PDF")}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDetails={handleDetails} // Función para abrir el modal de detalles
      />

      {/* Modal para Nuevo Registro */}
      <ModalNuevo
        show={showNuevoModal}
        onHide={() => setShowNuevoModal(false)}
        titulo="Nuevo Rol"
        onGuardar={handleGuardarNuevo}
        form={formNuevo} // Pasar el formulario al modal
        width={500}
      >
        <Form layout="vertical" form={formNuevo}>
          <ValidatedInput name="nombre" label="Nombre" placeholder="Ingresa el nombre del rol"
          rules={[{ required: true, message: "El nombre es obligatorio" }]}
          allowSpecialChars={false} />

          <ValidatedInput name="descripcion" label="Descripción" placeholder="Descripción del rol" 
          rules={[{ required: true, message: "La descripción es obligatoria" }]}
          allowSpecialChars={false} 
          isTextArea={true} />
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
        width={500} // Ancho personalizado
      >
        <Form layout="vertical" form={formEditar} initialValues={registroSeleccionado || {}}>
          <ValidatedInput name="nombre" label="Nombre" placeholder="Ingresa el nombre del rol"
          rules={[{ required: true, message: "El nombre es obligatorio" }]}
          allowSpecialChars={false} />

          <ValidatedInput name="descripcion" label="Descripción" placeholder="Descripción del rol" 
          rules={[{ required: true, message: "La descripción es obligatoria" }]}
          allowSpecialChars={false} 
          isTextArea={true} />
        </Form>
      </ModalEditar>

      {/* Modal para Confirmar Eliminación */}
      <ModalConfirmacion
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirmar={handleConfirmarDelete}
        mensaje={`¿Estás seguro de que deseas eliminar el rol ${registroSeleccionado?.nombre}?`}
      />

<ModalDetalles
        show={showDetailsModal} // Controla la visibilidad del modal
        onHide={() => setShowDetailsModal(false)} // Función para cerrar el modal
        titulo="Detalles del Usuario" // Título del modal
        tipo="roles"
        detalles={registroSeleccionado || {}} // Detalles del usuario seleccionado
        width={600} // Ancho personalizado
      />
    </div>
  );
}

export default Roles;