import React, { useState, useEffect } from "react";
import Tabla from "../../components/Crud/Tabla";
import Nav from '../../components/Dashboard/navDashboard';
import {FaHourglassHalf } from 'react-icons/fa';
import ModalNuevo from "../../components/Crud/Modal/ModalNuevo";
import ModalEditar from "../../components/Crud/Modal/ModalEditar";
import ModalConfirmacion from "../../components/Crud/Modal/ModalConfirmacion";
import { mostrarMensajeExito } from "../../components/Crud/MensajeExito";
import { mostrarMensajeError } from "../../components/Crud/MensajeError"; // Importar el componente de mensaje de error
import { Input, Form } from 'antd';
import ValidatedInput from "../../utils/ValidatedInput"; 
import BotonRegresar from "../../components/Dashboard/BotonRegresar";
import { fetchWithAuth } from '../../utils/api';
function EstadosUsuario() {
  const [showNuevoModal, setShowNuevoModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [formNuevo] = Form.useForm(); // Formulario para el modal de nuevo registro
  const [formEditar] = Form.useForm(); // Formulario para el modal de edición
  const [estadosusuario, setEstadosUsuario] = useState([]); // Estado para almacenar los estados-usuario

  //función reutilizable para obtener los estados-usuario
  const obtenerEstadosUsuarios = async () => {
    try {
      const response = await fetchWithAuth("http://localhost:4000/api/estados-usuario", {
        method: "GET",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (!response.ok) {
        throw new Error("Error al obtener los estados");
      }

      const data = await response.json();
      setEstadosUsuario(data.data); // Actualizar el estado con los estados obtenidos
    } catch (error) {
      console.error("Error:", error);
      mostrarMensajeError("Error al cargar los estados. Inténtalo de nuevo más tarde.");
    }
  };

  // Llamar a la API para obtener los estados
  useEffect(() => {
    obtenerEstadosUsuarios();
  }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente

  // Columnas de la tabla
  const columnas = [
    { nombre: '#', campo: 'indice', ancho: '5%' },
    { nombre: 'Nombre', campo: 'estado', ancho: '20%' },
    { nombre: 'Descripción', campo: 'descripcion', ancho: '40%' },
    { nombre: 'Acción', campo: 'accion', ancho: '15%' }
  ];

  // Abrir modal de nuevo registro
  const handleNuevoRegistro = () => {
    setShowNuevoModal(true);
  };

  // Abrir modal de edición
  const handleEdit = (id) => {
    const registro = estadosusuario.find((d) => d.idEstadoUsuario === id);
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
    const registro = estadosusuario.find(d => d.idEstadoUsuario === id);
    setRegistroSeleccionado(registro);
    setShowDeleteModal(true); // Abrir el modal de eliminación
  };


  // Guardar nuevo registro
  const handleGuardarNuevo = async () => {
    formNuevo.validateFields()
    .then(async (values) => {
      try {

        const response = await fetchWithAuth("http://localhost:4000/api/estados-usuario", {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            estado: values.estado,
            descripcion: values.descripcion,
            idObjeto: 9, // ID del objeto 
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.errors?.[0] || "Error al insertar el estado");
        }
        // **Actualizar la tabla después de agregar un nuevo estado**
        setEstadosUsuario(prevEstados => [...prevEstados, data.data]);

        setShowNuevoModal(false);
        formNuevo.resetFields(); // Limpiar el formulario de nuevo registro
        mostrarMensajeExito("El estado se ha registrado correctamente."); // Mensaje de éxito
      } catch (error) {
        console.error("Error:", error);
        mostrarMensajeError(error.message);
      }
    })
   .catch((error) => {
      console.error("Error al validar el formulario:", error);
    });
  };

  // Guardar cambios en el registro editado (para estados-usuario)
  const handleGuardarEdit = async () => {
    try {
      // Validar los campos del formulario
      const values = await formEditar.validateFields();

      // Llamar a la API para actualizar el estado-usuario
      const response = await fetchWithAuth(`http://localhost:4000/api/estados-usuario/${registroSeleccionado.idEstadoUsuario}`, {
        method: "PUT",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          estado: values.estado,
          descripcion: values.descripcion,
          idObjeto: 9, // ID del objeto 
        }),
      });

      // Manejar la respuesta de la API
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.errors?.[0] || "Error al actualizar el estado");
      }

      // Mostrar mensaje de éxito
      mostrarMensajeExito("El estado se ha actualizado correctamente.");

      // Cerrar el modal de edición
      setShowEditModal(false);
      setRegistroSeleccionado(null);
      formEditar.resetFields();

      // Recargar los estados desde la API
      await obtenerEstadosUsuarios();
    } catch (error) {
      // Mostrar mensaje de error
      mostrarMensajeError(error.message);
    }
  };

 // Función para eliminar un estado
  const handleConfirmarDelete = async () => {
    try {
      if (!registroSeleccionado) return;

      const response = await fetchWithAuth(`http://localhost:4000/api/estados-usuario/${registroSeleccionado.idEstadoUsuario}`, {
        method: "DELETE",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idObjeto: 9, // ID del objeto según el sistema de seguridad
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors?.[0] || "Error al eliminar el estado");
      }

      // Actualizar la lista de estados sin el estado eliminado
      setEstadosUsuario(prevEstados => prevEstados.filter(estado => estado.idEstadoUsuario !== registroSeleccionado.idEstadoUsuario));

      // Cerrar el modal de confirmación
      setShowDeleteModal(false);
      setRegistroSeleccionado(null);

      // Mostrar mensaje de éxito
      mostrarMensajeExito("El estado se ha eliminado correctamente.");
    } catch (error) {
      console.error("Error:", error);
      mostrarMensajeError(error.message);
    }
  };


  return (
    <div className="crud">
      <Nav />
      <BotonRegresar to="/usuarios" text="Regresar" />
      <Tabla
        columnas={columnas}
        datos={estadosusuario.map((estado) => ({ ...estado, id: estado.idEstadoUsuario }))}  // Usar los estados obtenidos de la API
        titulo="Gestión de Estados-Usuario"
        icono={<FaHourglassHalf className="icono-titulo" />}
        onNuevoRegistro={handleNuevoRegistro}
        onGenerarReporte={() => console.log("Generar reporte en PDF")}
        onEdit={handleEdit}
        onDelete={handleDelete}
        objetoNombre="EstadosUsuario"
      />

      {/* Modal para Nuevo Registro */}
      <ModalNuevo
        show={showNuevoModal}
        onHide={() => setShowNuevoModal(false)}
        titulo="Nuevo Estado"
        onGuardar={handleGuardarNuevo}
        form={formNuevo} // Pasar el formulario al modal
        width={500}
      >
        <Form layout="vertical" form={formNuevo}>
          <ValidatedInput name="estado" label="Nombre" placeholder="Ingresa el nombre del estado"
          rules={[{ required: true, message: "El nombre es obligatorio" }]}
          allowSpecialChars={false} />

          <ValidatedInput name="descripcion" label="Descripción" placeholder="Descripción del estado" 
          rules={[{ required: true, message: "La descripción es obligatoria" }]}
          allowSpecialChars={false} 
          isTextArea={true} />
        </Form>
      </ModalNuevo>

      {/* Modal para Editar Registro */}
      <ModalEditar
        show={showEditModal}
        onHide={handleCerrarEditModal}
        titulo="Editar Estado"
        onGuardar={handleGuardarEdit}
        form={formEditar}
        registroSeleccionado={registroSeleccionado}
        width={500} // Ancho personalizado
      >
        <Form layout="vertical" form={formEditar} initialValues={registroSeleccionado || {}}>
          <ValidatedInput name="estado" label="Nombre" placeholder="Ingresa el nombre del estado"
          rules={[{ required: true, message: "El nombre es obligatorio" }]}
          allowSpecialChars={false} />

          <ValidatedInput name="descripcion" label="Descripción" placeholder="Descripción del estado" 
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
        mensaje={`¿Estás seguro de que deseas eliminar el estado ${registroSeleccionado?.estado}?`}
      />
    </div>
  );
}

export default EstadosUsuario;