import React, { useState, useEffect } from "react";
import Tabla from "../../components/Crud/Tabla";
import Nav from '../../components/Dashboard/navDashboard';
import { FaUserShield } from 'react-icons/fa';
import ModalNuevo from "../../components/Crud/Modal/ModalNuevo";
import ModalEditar from "../../components/Crud/Modal/ModalEditar";
import ModalConfirmacion from "../../components/Crud/Modal/ModalConfirmacion";
import { mostrarMensajeExito } from "../../components/Crud/MensajeExito";
import { mostrarMensajeError } from "../../components/Crud/MensajeError"; // Importar el componente de mensaje de error
import { Input, Form } from 'antd';
import ValidatedInput from "../../utils/ValidatedInput"; 

function Roles() {
  const [showNuevoModal, setShowNuevoModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [formNuevo] = Form.useForm(); // Formulario para el modal de nuevo registro
  const [formEditar] = Form.useForm(); // Formulario para el modal de edición
  const [roles, setRoles] = useState([]); // Estado para almacenar los roles

  // Llamar a la API para obtener los roles
  useEffect(() => {
    const obtenerRoles = async () => {
      try {
        const token = localStorage.getItem("token"); // Obtener el token del almacenamiento local
        if (!token) {
          throw new Error("No hay token disponible");
        }
        const response = await fetch("http://localhost:4000/api/roles", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Agregar el token en el encabezado
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
    obtenerRoles();
  }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente

  // Columnas de la tabla
  const columnas = [
    { nombre: '#', campo: 'indice', ancho: '5%' },
    { nombre: 'Nombre', campo: 'nombre', ancho: '20%' },
    { nombre: 'Descripción', campo: 'descripcion', ancho: '40%' },
    { nombre: 'Acción', campo: 'accion', ancho: '20%' }
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

  // Guardar nuevo registro
  const handleGuardarNuevo = async () => {
    formNuevo.validateFields()
        .then(async (values) => {
            try {
                const token = localStorage.getItem("token"); // Obtener el token almacenado correctamente

                const response = await fetch("http://localhost:4000/api/roles", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` // Asegurar que se envía el token correctamente
                    },
                    body: JSON.stringify({
                        nombre: values.nombre,
                        descripcion: values.descripcion,
                        idObjeto: 7, // ID del objeto (debe existir en Seguridad.tblObjetos)
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
    console.log("Simulación: Eliminar registro con ID:", registroSeleccionado?.idRol);
    setShowDeleteModal(false);
    mostrarMensajeExito("El rol se ha eliminado correctamente.");
  };

  return (
    <div className="crud">
      <Nav />
      <Tabla
        columnas={columnas}
        datos={roles.map((rol) => ({ ...rol, id: rol.idRol }))}  // Usar los roles obtenidos de la API
        titulo="Gestión de Roles"
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
        width={500}
      >
        <Form layout="vertical" form={formNuevo}>
          <ValidatedInput name="nombre" label="Nombre" placeholder="Ingresa el nombre del rol"
            rules={[{ required: true, message: "El nombre es obligatorio" }]}
            allowSpecialChars={false} />

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
        width={500} // Ancho personalizado
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