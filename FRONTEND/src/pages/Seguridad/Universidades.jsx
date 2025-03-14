import React, { useState, useEffect } from "react";
import Tabla from "../../components/Crud/Tabla";
import Nav from '../../components/Dashboard/navDashboard';
import { FaUniversity } from 'react-icons/fa';
import ModalNuevo from "../../components/Crud/Modal/ModalNuevo";
import ModalEditar from "../../components/Crud/Modal/ModalEditar";
import { mostrarMensajeExito } from "../../components/Crud/MensajeExito";
import { mostrarMensajeError } from "../../components/Crud/MensajeError"; // Importar el componente de mensaje de error
import { Input, Form, Select, Switch, Upload  } from 'antd';
import { UploadOutlined } from "@ant-design/icons"; // Icono para el botón de carga


function Universidades() {
  const [showNuevoModal, setShowNuevoModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [formNuevo] = Form.useForm(); // Formulario para el modal de nuevo registro
  const [formEditar] = Form.useForm(); // Formulario para el modal de edición
  const [universidades, setUniversidades] = useState([]); // Estado para almacenar las universidades
  const [ciudades, setCiudades] = useState([]); // Estado para almacenar las ciudades
  const [fotoPreview, setFotoPreview] = useState(null);

  // Llamar a la API para obtener las universidades
  useEffect(() => {
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
    obtenerUniversidades();
  }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente

  // Obtener ciudades desde la API
  useEffect(() => {
    const obtenerCiudades = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/ciudades");
        if (!response.ok) throw new Error("Error al obtener las ciudades");

        const data = await response.json();
        setCiudades(data.data);
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
    { nombre: 'Ciudad', campo: 'nombreCiudad', ancho: '20%' },
    { nombre: 'Universidad', campo: 'nombreUniversidad', ancho: '20%' },
    { nombre: 'Logo', campo: 'fotoUrl', ancho: '40%' },
    { nombre: 'Siglas', campo: 'siglas', ancho: '10%' },
    { nombre: 'Estado', campo: 'activo', ancho: '20%',
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

   // Manejar la carga de la foto y generar la URL de vista previa
   const handleFotoChange = (info) => {
    if (info.file.status === "done" || info.file.status === "uploading") {
      const file = info.file.originFileObj;
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setFotoPreview(imageUrl);
      }
    }
  };
  // Guardar nuevo registro
  /*const handleGuardarNuevo = async () => {
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
                 setUniversidades(prevUniversidades => [...prevUniversidades, data.data]);
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
*/
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
        //onGuardar={handleGuardarNuevo}
        form={formNuevo} // Pasar el formulario al modal
        width={500}
      >
        <Form layout="vertical" form={formNuevo}>
         <Form.Item label="Nombre" name="nombreUniversidad" rules={[{ required: true, message: "El nombre es obligatorio" }]}>
            <Input placeholder="Ingresa el nombre de la universidad" />
          </Form.Item>

          {/* Lista desplegable de ciudades dinámicas */}
          <Form.Item label="Ciudad" name="idCiudad" rules={[{ required: true }]}>
            <Select placeholder="Selecciona una ciudad">
              {ciudades.map((ciudad) => (
                <Option key={ciudad.idCiudad} value={ciudad.idCiudad}>
                  {ciudad.nombre}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Logo" name="fotoUrl">
            <Upload beforeUpload={() => false} onChange={handleFotoChange} showUploadList={false}>
              <button className="upload-button">
                <UploadOutlined /> Subir Imagen
              </button>
            </Upload>
            {fotoPreview && <img src={fotoPreview} alt="Vista previa" className="preview-image" />}
          </Form.Item>

          <Form.Item label="Siglas" name="siglas">
            <Input placeholder="Ingresa las siglas de la universidad" />
          </Form.Item>

          <Form.Item label="Activo" name="activo" valuePropName="checked">
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
          <Form.Item label="Nombre" name="nombreUniversidad" rules={[{ required: true, message: "El nombre es obligatorio" }]}>
            <Input placeholder="Ingresa el nombre de la universidad" />
          </Form.Item>

          {/* Lista desplegable de ciudades dinámicas en edición */}
          <Form.Item label="Ciudad" name="idCiudad" rules={[{ required: true }]}>
            <Select placeholder="Selecciona una ciudad">
              {ciudades.map((ciudad) => (
                <Option key={ciudad.idCiudad} value={ciudad.idCiudad}>
                  {ciudad.nombre}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Logo" name="fotoUrl">
            <Upload beforeUpload={() => false} onChange={handleFotoChange} showUploadList={false}>
              <button className="upload-button">
                <UploadOutlined /> Subir Imagen
              </button>
            </Upload>
            {fotoPreview && <img src={fotoPreview} alt="Vista previa" className="preview-image" />}
          </Form.Item>

          <Form.Item label="Siglas" name="siglas">
            <Input placeholder="Ingresa las siglas de la universidad" />
          </Form.Item>

          <Form.Item label="Activo" name="activo" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </ModalEditar>
    </div>
  );
}

export default Universidades;