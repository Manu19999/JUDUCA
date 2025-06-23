import React, { useState, useEffect } from "react";
import Tabla from "../../components/Crud/Tabla";
import Nav from '../../components/Dashboard/navDashboard';
import { FaCog } from 'react-icons/fa';
import ModalEditar from "../../components/Crud/Modal/ModalEditar";
import { mostrarMensajeExito } from "../../components/Crud/MensajeExito";
import { mostrarMensajeError } from "../../components/Crud/MensajeError"; // Importar el componente de mensaje de error
import { Input, Form } from 'antd';
import ValidatedInput from "../../utils/ValidatedInput"; 
import BotonRegresar from "../../components/Dashboard/BotonRegresar";

function Parametros() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [formEditar] = Form.useForm(); // Formulario para el modal de edición
  const [parametros, setParametros] = useState([]); // Estado para almacenar los parametros
  
  //función reutilizable para obtener los parametros
  const obtenerParametros = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/parametros", {
        method: "GET",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (!response.ok) {
        throw new Error("Error al obtener los parametros");
      }

      const data = await response.json();
      setParametros(data.data); // Actualizar el estado con los parametros obtenidos
    } catch (error) {
      console.error("Error:", error);
      mostrarMensajeError("Error al cargar los parámetros. Inténtalo de nuevo más tarde.");
    }
  };

  // Llamar a la API para obtener los parametros
  useEffect(() => {
    obtenerParametros();
  }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente

  // Columnas de la tabla
  const columnas = [
    { nombre: '#', campo: 'indice', ancho: '5%' },
    { nombre: 'Parámetro', campo: 'parametro', ancho: '35%' },
    { nombre: 'Valor', campo: 'valor', ancho: '30%' },
    { nombre: 'Actualizado', campo: 'fechaActualizacion', ancho: '40%' },
    { nombre: 'Usuario', campo: 'usuarioRegistro', ancho: '30%' },
    { nombre: 'Registrado', campo: 'fechaRegistro', ancho: '40%' },
    { nombre: 'Acción', campo: 'accion', ancho: '15%' }
  ];
  


  // Abrir modal de edición
  const handleEdit = (id) => {
    const registro = parametros.find((d) => d.idParametro === id);
    setRegistroSeleccionado(registro); // Actualizar el registro seleccionado
    setShowEditModal(true); // Abrir el modal de edición
  };
  // cerrar modal de edición
  const handleCerrarEditModal = () => {
    setShowEditModal(false);
    setRegistroSeleccionado(null); // Limpiar el registro seleccionado
    formEditar.resetFields(); // Reiniciar el formulario
  };

  // Guardar cambios en el registro editado (para parametros)
  const handleGuardarEdit = async () => {
    try {
      // Validar los campos del formulario
      const values = await formEditar.validateFields();

      // Llamar a la API para actualizar el parametro
      const response = await fetch(`http://localhost:4000/api/parametros/${registroSeleccionado.idParametro}`, {
        method: "PUT",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          valor: values.valor,
          idObjetoBitacora: 5, // ID del objeto 
        }),
      });

      // Manejar la respuesta de la API
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.errors?.[0] || "Error al actualizar el parametro");
      }

      // Mostrar mensaje de éxito
      mostrarMensajeExito("El parametro se ha actualizado correctamente.");

      // Cerrar el modal de edición
      setShowEditModal(false);
      setRegistroSeleccionado(null);
      formEditar.resetFields();

      // Recargar los parametros desde la API
      await obtenerParametros();
    } catch (error) {
      // Mostrar mensaje de error
      mostrarMensajeError(error.message);
    }
  };


  return (
    <div className="crud">
      <Nav />
      <BotonRegresar to="/seguridad" text="Regresar" />
      <Tabla
        columnas={columnas}
        datos={parametros.map((parametro) => ({ ...parametro, id: parametro.idParametro }))}  // Usar los parametros obtenidos de la API
        titulo="Gestión de Parámetros"
        icono={<FaCog className="icono-titulo" />}
        onGenerarReporte={() => console.log("Generar reporte en PDF")}
        onEdit={handleEdit}
      />

      {/* Modal para Editar Registro */}
      <ModalEditar
        show={showEditModal}
        onHide={handleCerrarEditModal}
        titulo="Editar Rol"
        onGuardar={handleGuardarEdit}
        form={formEditar}
        registroSeleccionado={registroSeleccionado}
        width={400} // Ancho personalizado
      >
        <Form layout="vertical" form={formEditar} initialValues={registroSeleccionado || {}}>
            <Form.Item
            name="parametro"
            label="Nombre del Parámetro"
            >
            <Input disabled />
            </Form.Item>

            <ValidatedInput
            name="valor"
            label="Valor"
            placeholder="Ingresa el nuevo valor"
            rules={[
                { required: true, message: "El valor es obligatorio" },
                { max: 100, message: "Máximo 100 caracteres" },
            ]}
            allowSpecialChars={true}
            />

            <Form.Item
            name="fechaActualizacion"
            label="Fecha de Actualización"
            >
            <Input disabled />
            </Form.Item>

            <Form.Item
            name="usuarioRegistro"
            label="Usuario Registro"
            >
            <Input disabled />
            </Form.Item>

            <Form.Item
            name="fechaRegistro"
            label="Fecha de Registro"
            >
            <Input disabled />
            </Form.Item>
        </Form>
      </ModalEditar>
    </div>
  );
}

export default Parametros;