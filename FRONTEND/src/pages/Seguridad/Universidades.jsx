import React, { useState, useEffect } from "react";
import Tabla from "../../components/Crud/Tabla";
import Nav from '../../components/Dashboard/navDashboard';
import { FaUniversity } from 'react-icons/fa';
import ModalNuevo from "../../components/Crud/Modal/ModalNuevo";
import ModalEditar from "../../components/Crud/Modal/ModalEditar";
import { mostrarMensajeExito } from "../../components/Crud/MensajeExito";
import { mostrarMensajeError } from "../../components/Crud/MensajeError"; // Importar el componente de mensaje de error
import { Input, Form, Select, Switch } from 'antd';
import SubirImagen from '../../components/SubirImagen'; // Ajusta la ruta según tu estructura de archivos
import ValidatedInput from "../../utils/ValidatedInput"; 

function Universidades() {
  const [showNuevoModal, setShowNuevoModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [formNuevo] = Form.useForm(); // Formulario para el modal de nuevo registro
  const [formEditar] = Form.useForm(); // Formulario para el modal de edición
  const [universidades, setUniversidades] = useState([]); // Estado para almacenar las universidades
  const [ciudades, setCiudades] = useState([]); // Estado para almacenar las ciudades
  const [fotoPreview, setFotoPreview] = useState(null);

  const obtenerUniversidades = async () => {
    try {
      const token = localStorage.getItem("token"); // Obtener el token del almacenamiento local
      if (!token) {
        throw new Error("No hay token disponible");
      }
      const response = await fetch("http://localhost:4000/api/universidades", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Agregar el token en el encabezado
        }
      });
      if (!response.ok) {
        throw new Error("Error al obtener las universidades");
      }
      const data = await response.json();
      console.log("Datos de universidades recibidos:", data.data); // Para depuración
      setUniversidades(data.data); // Actualizar el estado con las universidades obtenidas
    } catch (error) {
      console.error("Error:", error);
      mostrarMensajeError("Error al cargar las universidades. Inténtalo de nuevo más tarde.");
    }
  };
  
  // Llamar a la API para obtener las universidades
  useEffect(() => {
    obtenerUniversidades();
  }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente

  // Obtener ciudades desde la API
  useEffect(() => {
    const obtenerCiudades = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/ciudades");
        if (!response.ok) throw new Error("Error al obtener las ciudades");

        const data = await response.json();

        // Mapear las ciudades y concatenar nombre de ciudad y país
        const ciudadesFormateadas = data.data.map(ciudad => ({
          idCiudad: ciudad.idCiudad,
          nombre: `${ciudad.nombre} - ${ciudad.nombrePais}` // Concatenación Ciudad - País
        }));

        setCiudades(ciudadesFormateadas);
      } catch (error) {
        console.error("Error:", error);
        mostrarMensajeError("Error al cargar las ciudades.");
      }
    };

    obtenerCiudades();
  }, []);

  
  // Columnas de la tabla
  const columnas = [
    { nombre: '#', campo: 'indice', ancho: '5%' },
    { nombre: 'Ciudad', campo: 'ciudadPais', ancho: '27%' },
    { nombre: 'Universidad', campo: 'nombreUniversidad', ancho: '30%' },
    { nombre: 'Logo',campo: 'fotoUrl', ancho: '25%',
      render: (fotoUrl) => (
        <div style={{ textAlign: "center", verticalAlign: "middle" }}>
          <img 
            src={fotoUrl} 
            alt="Logo Universidad" 
            style={{ width: "70px", height: "70px", objectFit: "contain" }} 
          />
        </div>
      )
    },
    { nombre: 'Siglas', campo: 'siglas', ancho: '10%' },
    { nombre: 'Estado', campo: 'activo', ancho: '18%',
      render: (activo) => (
          <span className={`estado-activo ${activo ? 'activo' : 'inactivo'}`}>
            {activo ? 'Activo' : 'Inactivo'}
          </span>
      )
      },
    { nombre: 'Acción', campo: 'accion', ancho: '10%' }
  ];

  // Abrir modal de nuevo registro
  const handleNuevoRegistro = () => {
    setShowNuevoModal(true);
  };

  // Abrir modal de edición
  const handleEdit = (id) => {
    const registro = universidades.find((d) => d.idUniversidad === id);
    setRegistroSeleccionado(registro); // Actualizar el registro seleccionado
    setShowEditModal(true); // Abrir el modal de edición
  };

  const handleCerrarEditModal = () => {
    setShowEditModal(false);
    setRegistroSeleccionado(null); // Limpiar el registro seleccionado
    formEditar.resetFields(); // Reiniciar el formulario
  };
  
  // Guardar nuevo registro
  const handleGuardarNuevo = async () => {
    formNuevo.validateFields()
    .then(async (values) => {
      try {
        const token = localStorage.getItem("token"); // Obtener el token almacenado correctamente

        const response = await fetch("http://localhost:4000/api/universidades", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Asegurar que se envía el token correctamente
          },
          body: JSON.stringify({
            idCiudad: values.idCiudad, // ID de la ciudad
            nombre: values.nombreUniversidad, // Nombre de la universidad
            fotoUrl: values.fotoUrl, // URL de la foto
            siglas: values.siglas, // Siglas de la universidad
            activo: values.activo, // Estado activo/inactivo
            idObjeto: 4, // ID del objeto
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.errors?.[0] || "Error al insertar la universidad");
        }

        // Recargar los datos desde la API
        await obtenerUniversidades();

        setShowNuevoModal(false);
        formNuevo.resetFields(); // Limpiar el formulario de nuevo registro
        mostrarMensajeExito("La universidad se ha registrado correctamente."); // Mensaje de éxito
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
  const handleGuardarEdit = async () => {
    try {
      // Validar los campos del formulario
      const values = await formEditar.validateFields();

      // Obtener el token de autenticación
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No hay token disponible");
      }

      // Llamar a la API para actualizar la universidad
      const response = await fetch(`http://localhost:4000/api/universidades/${registroSeleccionado.idUniversidad}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          idCiudad: values.idCiudad,
          nombre: values.nombreUniversidad,
          fotoUrl: values.fotoUrl,
          siglas: values.siglas,
          activo: values.activo,
          idObjeto: 4, // ID del objeto (debe existir en Seguridad.tblObjetos)
        }),
      });

      // Manejar la respuesta de la API
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.errors?.[0] || "Error al actualizar la universidad");
      }

      // Mostrar mensaje de éxito
      mostrarMensajeExito("La universidad se ha actualizado correctamente.");

      // Cerrar el modal de edición
      setShowEditModal(false);
      setRegistroSeleccionado(null);
      formEditar.resetFields();

      // Recargar las universidades desde la API
      await obtenerUniversidades();
    } catch (error) {
      // Mostrar mensaje de error
      mostrarMensajeError(error.message);
    }
  };


  return (
    <div className="crud">
      <Nav />
      <Tabla
        columnas={columnas}
        datos={universidades.map((universidad) => ({ ...universidad, id: universidad.idUniversidad }))} 
        titulo="Gestión de Universidades"
        icono={<FaUniversity className="icono-titulo" />}
        onNuevoRegistro={handleNuevoRegistro}
        onGenerarReporte={() => console.log("Generar reporte en PDF")}
        onEdit={handleEdit}
      />

      {/* Modal para Nuevo Registro */}
      <ModalNuevo
        show={showNuevoModal}
        onHide={() => setShowNuevoModal(false)}
        titulo="Nueva Universidad"
        onGuardar={handleGuardarNuevo}
        form={formNuevo} // Pasar el formulario al modal
        width={500}
      >
        <Form layout="vertical" form={formNuevo}>
          <ValidatedInput name="nombreUniversidad" label="Nombre de la universidad" placeholder="Ingresa el nombre de la universidad"
          rules={[{ required: true, message: "El nombre de la universidad es obligatorio" /* Mensaje personalizado*/ }]}
          allowSpecialChars={false} /* No permite caracteres especiales ni números*/ />

          {/* Lista desplegable de ciudades dinámicas */}
          <Form.Item label="Ciudad" name="idCiudad" rules={[{ required: true ,  message: "Debe seleccionar una ciudad "}]}>
            <Select placeholder="Selecciona una ciudad">
              {ciudades.map((ciudad) => (
                <Option key={ciudad.idCiudad} value={ciudad.idCiudad}>
                  {ciudad.nombre}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Logo" name="fotoUrl">
            <SubirImagen
              onImagenSubida={(url) => formNuevo.setFieldsValue({ fotoUrl: url })}
              imagenActual={registroSeleccionado?.fotoUrl}
              form={formNuevo} // Pasar el formulario
            />
          </Form.Item>

          <ValidatedInput name="siglas" label="Siglas" placeholder="Ingresa las siglas de la universidad" 
          rules={[{ required: true, message: "La sigla es obligatorio" }]}
          allowSpecialChars={false}/>
           
          <Form.Item label="Activo" name="activo" valuePropName="checked"  initialValue={false} /* Valor predeterminado en false*/>
            <Switch />
          </Form.Item>
        </Form>
      </ModalNuevo>

      {/* Modal para Editar Registro */}
      <ModalEditar
        show={showEditModal}
        onHide={handleCerrarEditModal}
        titulo="Editar Universidad"
        onGuardar={handleGuardarEdit}
        form={formEditar}
        registroSeleccionado={registroSeleccionado}
        width={500} // Ancho personalizado
      >
        <Form layout="vertical" form={formEditar} initialValues={registroSeleccionado || {}}>
          <ValidatedInput name="nombreUniversidad" label="Nombre de la Universidad" placeholder="Ingresa el nombre de la universidad"
          rules={[{ required: true, message: "El nombre de la universidad es obligatorio" }]}
          allowSpecialChars={false}/>

          {/* Lista desplegable de ciudades dinámicas en edición */}
          <Form.Item label="Ciudad" name="idCiudad" rules={[{ required: true ,  message: "Debe seleccionar una ciudad "}]}>
            <Select placeholder="Selecciona una ciudad">
              {ciudades.map((ciudad) => (
                <Option key={ciudad.idCiudad} value={ciudad.idCiudad}>
                  {ciudad.nombre}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Logo" name="fotoUrl">
            <SubirImagen
              onImagenSubida={(url) => formEditar.setFieldsValue({ fotoUrl: url })}
              imagenActual={registroSeleccionado?.fotoUrl}
              form={formEditar} // Pasar el formulario de edición
            />
          </Form.Item>

          <ValidatedInput name="siglas" label="Siglas" placeholder="Ingresa las siglas de la universidad"
          rules={[{ required: true, message: "Las siglas son obligatorias" }]} 
          allowSpecialChars={false}/>

          <Form.Item label="Activo" name="activo" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </ModalEditar>
    </div>
  );
}

export default Universidades;