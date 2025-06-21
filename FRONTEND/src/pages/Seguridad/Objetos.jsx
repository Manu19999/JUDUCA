import React, { useState, useEffect } from "react";
import Tabla from "../../components/Crud/Tabla";
import Nav from '../../components/Dashboard/navDashboard';
import { FaBoxOpen } from 'react-icons/fa';
import ModalNuevo from "../../components/Crud/Modal/ModalNuevo";
import ModalEditar from "../../components/Crud/Modal/ModalEditar";
import ModalConfirmacion from "../../components/Crud/Modal/ModalConfirmacion";
import { mostrarMensajeExito } from "../../components/Crud/MensajeExito";
import { mostrarMensajeError } from "../../components/Crud/MensajeError"; // Importar el componente de mensaje de error
import { Input, Form } from 'antd';
import ValidatedInput from "../../utils/ValidatedInput"; 
import BotonRegresar from "../../components/Dashboard/BotonRegresar";

function Objetos() {
  const [showNuevoModal, setShowNuevoModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [formNuevo] = Form.useForm(); // Formulario para el modal de nuevo registro
  const [formEditar] = Form.useForm(); // Formulario para el modal de edición
  const [objetos, setObjetos] = useState([]); // Estado para almacenar los objetos

  //función reutilizable para obtener los objetos
  const obtenerObjetos = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/objetos", {
        method: "GET",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (!response.ok) {
        throw new Error("Error al obtener los objetos");
      }

      const data = await response.json();
      setObjetos(data.data); // Actualizar el estado con los objetos obtenidos
    } catch (error) {
      console.error("Error:", error);
      mostrarMensajeError("Error al cargar los objetos. Inténtalo de nuevo más tarde.");
    }
  };

  // Llamar a la API para obtener los objetos
  useEffect(() => {
    obtenerObjetos();
  }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente

  // Columnas de la tabla
  const columnas = [
    { nombre: '#', campo: 'indice', ancho: '5%' },
    { nombre: 'Nombre', campo: 'nombre', ancho: '30%' },
    { nombre: 'Descripción', campo: 'descripcion', ancho: '40%' },
    { nombre: 'Tipo de Objeto', campo: 'tipoObjeto', ancho: '30%' },
    { nombre: 'Acción', campo: 'accion', ancho: '20%' }
  ];

  // Abrir modal de nuevo registro
  const handleNuevoRegistro = () => {
    setShowNuevoModal(true);
  };

  // Abrir modal de edición
  const handleEdit = (id) => {
    const registro = objetos.find((d) => d.idObjeto === id);
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
    const registro = objetos.find(d => d.idObjeto === id);
    setRegistroSeleccionado(registro);
    setShowDeleteModal(true); // Abrir el modal de eliminación
  };

  // Guardar nuevo registro
  const handleGuardarNuevo = async () => {
    formNuevo.validateFields()
    .then(async (values) => {
      try {

        const response = await fetch("http://localhost:4000/api/objetos", {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: values.nombre,
            descripcion: values.descripcion,
            tipoObjeto: values.tipoObjeto,
            idObjeto: 7,
          }),
          
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.errors?.[0] || "Error al insertar el rol");
        }
        // **Actualizar la tabla después de agregar un nuevo rol**
        setObjetos(prevObjetos => [...prevObjetos, data.data]);

        setShowNuevoModal(false);
        formNuevo.resetFields(); // Limpiar el formulario de nuevo registro
        mostrarMensajeExito("El objeto se ha registrado correctamente."); // Mensaje de éxito
      } catch (error) {
        console.error("Error:", error);
        mostrarMensajeError(error.message);
      }
    })
   .catch((error) => {
      console.error("Error al validar el formulario:", error);
    });
  };

  // Guardar cambios en el registro editado (para objetos)
  const handleGuardarEdit = async () => {
    try {
      // Validar los campos del formulario
      const values = await formEditar.validateFields();

      // Llamar a la API para actualizar el rol
      const response = await fetch(`http://localhost:4000/api/objetos/${registroSeleccionado.idObjeto}`, {
        method: "PUT",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: values.nombre,
          descripcion: values.descripcion,
          tipoObjeto: values.tipoObjeto,
          idObjetoBitacora: 7, // ID del objeto 
        }),
      });

      // Manejar la respuesta de la API
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.errors?.[0] || "Error al actualizar el rol");
      }

      // Mostrar mensaje de éxito
      mostrarMensajeExito("El objeto se ha actualizado correctamente.");

      // Cerrar el modal de edición
      setShowEditModal(false);
      setRegistroSeleccionado(null);
      formEditar.resetFields();

      // Recargar los objetos desde la API
      await obtenerObjetos();
    } catch (error) {
      // Mostrar mensaje de error
      mostrarMensajeError(error.message);
    }
  };

 // Función para eliminar un rol
  const handleConfirmarDelete = async () => {
    try {
      if (!registroSeleccionado) return;

      const response = await fetch(`http://localhost:4000/api/objetos/${registroSeleccionado.idObjeto}`, {
        method: "DELETE",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idObjetoBitacora: 7, // ID del objeto según el sistema de seguridad
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors?.[0] || "Error al eliminar el rol");
      }

      // Actualizar la lista de objetos sin el rol eliminado
      setObjetos(prevObjetos => prevObjetos.filter(objeto => objeto.idObjeto !== registroSeleccionado.idObjeto));

      // Cerrar el modal de confirmación
      setShowDeleteModal(false);
      setRegistroSeleccionado(null);

      // Mostrar mensaje de éxito
      mostrarMensajeExito("El objeto se ha eliminado correctamente.");
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
        datos={objetos.map((objeto) => ({ ...objeto, id: objeto.idObjeto }))}  // Usar los objetos obtenidos de la API
        titulo="Gestión de Objetos"
        icono={<FaBoxOpen className="icono-titulo" />}
        onNuevoRegistro={handleNuevoRegistro}
        onGenerarReporte={() => console.log("Generar reporte en PDF")}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal para Nuevo Registro */}
      <ModalNuevo
        show={showNuevoModal}
        onHide={() => setShowNuevoModal(false)}
        titulo="Nuevo Objeto"
        onGuardar={handleGuardarNuevo}
        form={formNuevo} // Pasar el formulario al modal
        width={500}
      >
        <Form layout="vertical" form={formNuevo}>
          <ValidatedInput name="nombre" label="Nombre" placeholder="Ingresa el nombre del objeto"
          rules={[{ required: true, message: "El nombre es obligatorio" }]}
          allowSpecialChars={false}  convertToUpper={false} />

          <ValidatedInput name="descripcion" label="Descripción" placeholder="Descripción del rol" 
          rules={[{ required: true, message: "La descripción es obligatoria" }]}
          allowSpecialChars={false} 
          isTextArea={true} />

          <ValidatedInput
          name="tipoObjeto"
          label="Tipo de Objeto"
          placeholder="Ingrese el tipo de objeto"
          rules={[{ required: true, message: "El tipo de objeto es obligatorio" }]}
          />

        </Form>
      </ModalNuevo>

      {/* Modal para Editar Registro */}
      <ModalEditar
        show={showEditModal}
        onHide={handleCerrarEditModal}
        titulo="Editar Objeto"
        onGuardar={handleGuardarEdit}
        form={formEditar}
        registroSeleccionado={registroSeleccionado}
        width={500} // Ancho personalizado
      >
        <Form layout="vertical" form={formEditar} initialValues={registroSeleccionado || {}}>
          <ValidatedInput name="nombre" label="Nombre" placeholder="Ingresa el nombre del rol"
          rules={[{ required: true, message: "El nombre es obligatorio" }]}
          allowSpecialChars={false} convertToUpper={false} />

          <ValidatedInput name="descripcion" label="Descripción" placeholder="Descripción del rol" 
          rules={[{ required: true, message: "La descripción es obligatoria" }]}
          allowSpecialChars={false} 
          isTextArea={true} />

          <ValidatedInput
          name="tipoObjeto"
          label="Tipo de Objeto"
          placeholder="Ingrese el tipo de objeto"
          rules={[{ required: true, message: "El tipo de objeto es obligatorio" }]}
          />
        </Form>
      </ModalEditar>

      {/* Modal para Confirmar Eliminación */}
      <ModalConfirmacion
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirmar={handleConfirmarDelete}
        mensaje={`¿Estás seguro de que deseas eliminar el objeto ${registroSeleccionado?.nombre}?`}
      />
    </div>
  );
}

export default Objetos;