import React, { useEffect, useState } from "react";
import axios from "axios";
import Tabla from "../../components/Crud/Tabla";
import Nav from "../../components/Dashboard/navDashboard";
import BotonRegresar from "../../components/Dashboard/BotonRegresar";
import {
  Button,
  Modal,
  Form,
  Input,
  TimePicker,
  message,
  Popconfirm
} from "antd";
import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const TipoComida = () => {
  const [tipoComidas, setTipoComidas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [registroEditando, setRegistroEditando] = useState(null);

  const [form] = Form.useForm();
  const [formEditar] = Form.useForm();

  const fetchTipoComidas = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/tipoComida", {
        withCredentials: true
      });

     const datosConIndex = data.map((item, idx) => ({
  ...item,
  index: idx + 1,
  idTipoComida: item.idTipoComida, // 👈 importante para que Popconfirm funcione
  horaInicioFormateada: dayjs.utc(item.horaInicio).local().format("HH:mm"),
  horaFinalFormateada: dayjs.utc(item.horaFinal).local().format("HH:mm")
}));


      setTipoComidas(datosConIndex);
    } catch (error) {
      console.error("Error al obtener tipos de comida:", error);
      message.error("No se pudieron cargar los tipos de comida");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTipoComidas();
  }, []);

  const eliminarTipoComida = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/tipoComida/${id}?idObjeto=6`, {
  withCredentials: true
});

      message.success("Tipo de comida eliminado correctamente");
      fetchTipoComidas();
    } catch (error) {
      console.error("Error al eliminar tipo de comida:", error);
      message.error("No se pudo eliminar el tipo de comida");
    }
  };

  const columnas = [
    { nombre: "No", campo: "index", ancho: "10%" },
    { nombre: "Nombre", campo: "tiempoComida", ancho: "30%" },
    { nombre: "Hora Inicio", campo: "horaInicioFormateada", ancho: "20%" },
    { nombre: "Hora Final", campo: "horaFinalFormateada", ancho: "20%" },
    {
      nombre: "Acción",
      ancho: "20%",
      render: (_, record) => (
        <div className="d-flex gap-2 justify-content-center">
          <Button variant="outline-primary" size="sm"
            onClick={() => {setRegistroEditando(record); formEditar.setFieldsValue({
                tiempoComida: record.tiempoComida,
                horaInicio: dayjs.utc(record.horaInicio).local(),
                horaFinal: dayjs.utc(record.horaFinal).local()
              });
              setIsEditModalOpen(true);
            }}
          >
            <FaEdit />
          </Button>
          <Popconfirm
            title="¿Estás seguro de eliminar este tipo de comida?"
            onConfirm={() => eliminarTipoComida(record.idTipoComida)}
            okText="Sí"
            cancelText="No"
          >
            <Button variant="outline-danger" size="sm">
              <FaTrashAlt />
            </Button>
          </Popconfirm>
        </div>
      )
    }
  ];

  return (
    <div className="container mt-4">
      <Nav />
         <BotonRegresar to="/CajaComedor" text="Regresar" />
     <div className="d-flex justify-content-between align-items-center mb-3 px-1">
  <div style={{ width: "50%" }}></div>
  <div style={{ width: "44%", textAlign: "center" }}>
    <h2 className="d-flex align-items-center">
                Tipo Comida
            </h2>
  </div>
     <div style={{ width: "22%", textAlign: "left", paddingTop: "40px" }}>
  <Button
    onClick={() => setIsModalOpen(true)}
    style={{
      backgroundColor: "#1890ff",
      borderColor: "#1890ff",
      color: "white",
      display: "flex",
      alignItems: "center"
    }}
  >
    <FaPlus style={{ marginRight: "6px" }} /> Tipo Comida
  </Button>

</div>
      </div>

      <Tabla columnas={columnas} datos={tipoComidas} loading={loading} />

      {/* Modal de creación */}
      <Modal
        title="Nuevo Tipo de Comida"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        okText="Guardar"
        cancelText="Cancelar"
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={async (values) => {
            try {
              const payload = {
                tiempoComida: values.tiempoComida,
                horaInicio: values.horaInicio.format("HH:mm:ss"),
                horaFinal: values.horaFinal.format("HH:mm:ss"),
                idObjeto: 6
              };

              await axios.post("http://localhost:4000/api/tipoComida", payload, {
                withCredentials: true
              });

              message.success("Tipo de comida registrado correctamente");
              setIsModalOpen(false);
              form.resetFields();
              fetchTipoComidas();
            } catch (error) {
              console.error("Error al insertar tipo de comida:", error);
              message.error("No se pudo registrar el tipo de comida");
            }
          }}
        >
          <Form.Item
            label="Nombre del Tipo"
            name="tiempoComida"
            rules={[{ required: true, message: "Este campo es obligatorio" }]}
          >
            <Input placeholder="Ej: Desayuno, Almuerzo, Cena" />
          </Form.Item>

          <Form.Item
            label="Hora de Inicio"
            name="horaInicio"
            rules={[{ required: true, message: "Selecciona la hora de inicio" }]}
          >
            <TimePicker format="HH:mm" className="w-100" />
          </Form.Item>

          <Form.Item
            label="Hora Final"
            name="horaFinal"
            rules={[{ required: true, message: "Selecciona la hora final" }]}
          >
            <TimePicker format="HH:mm" className="w-100" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal de edición */}
      <Modal
        title="Editar Tipo de Comida"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        onOk={() => formEditar.submit()}
        okText="Actualizar"
        cancelText="Cancelar"
      >
        <Form
          layout="vertical"
          form={formEditar}
          onFinish={async (values) => {
            try {
              const payload = {
                idTipoComida: registroEditando.idTipoComida,
                tiempoComida: values.tiempoComida,
                horaInicio: values.horaInicio.format("HH:mm:ss"),
                horaFinal: values.horaFinal.format("HH:mm:ss"),
                idObjeto: 6
              };

              await axios.put("http://localhost:4000/api/tipoComida/actualizar", payload, {
                withCredentials: true
              });

              message.success("Tipo de comida actualizado correctamente");
              setIsEditModalOpen(false);
              fetchTipoComidas();
            } catch (error) {
              console.error("Error al actualizar tipo de comida:", error);
              message.error("No se pudo actualizar el tipo de comida");
            }
          }}
        >
          <Form.Item
            label="Nombre del Tipo"
            name="tiempoComida"
            rules={[{ required: true, message: "Este campo es obligatorio" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Hora de Inicio"
            name="horaInicio"
            rules={[{ required: true, message: "Selecciona la hora de inicio" }]}
          >
            <TimePicker format="HH:mm" className="w-100" />
          </Form.Item>

          <Form.Item
            label="Hora Final"
            name="horaFinal"
            rules={[{ required: true, message: "Selecciona la hora final" }]}
          >
            <TimePicker format="HH:mm" className="w-100" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TipoComida;
