import React, { useEffect, useState } from "react";
import axios from "axios";
import Tabla from "../../components/Crud/Tabla";
import Nav from "../../components/Dashboard/navDashboard";
import { Button } from "react-bootstrap";
import BotonRegresar from "../../components/Dashboard/BotonRegresar";
import {
  Modal,
  Form,
  InputNumber,
  Select,
  Switch,
  message,
  Popconfirm
} from "antd";
import { FaEdit, FaTrashAlt,FaPlus  } from "react-icons/fa";

const Comedores = () => {
  const [comedores, setComedores] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [registroEditando, setRegistroEditando] = useState(null);

  const [form] = Form.useForm();
  const [formEditar] = Form.useForm();

  const fetchComedores = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/comedores", {
        withCredentials: true
      });

      const datosConIndex = data.map((item, idx) => ({
        ...item,
        index: idx + 1
      }));

      setComedores(datosConIndex);
    } catch (error) {
      console.error("Error al obtener comedores:", error);
      message.error("No se pudieron cargar los comedores");
    } finally {
      setLoading(false);
    }
  };

  const fetchUbicaciones = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/ubicacionComedores", {
        withCredentials: true
      });
      setUbicaciones(data);
    } catch (error) {
      console.error("Error al obtener ubicaciones:", error);
      message.error("No se pudieron cargar las ubicaciones");
    }
  };

  const eliminarComedor = async (id) => {
    try {
      await axios.delete("http://localhost:4000/api/comedores", {
        data: { id_comedor: id, idObjeto: 5 },
        withCredentials: true
      });

      message.success("Comedor eliminado correctamente");
      fetchComedores();
    } catch (error) {
      console.error("Error al eliminar comedor:", error);
      message.error("No se pudo eliminar el comedor");
    }
  };

  useEffect(() => {
    fetchComedores();
    fetchUbicaciones();
  }, []);

  const columnas = [
    { nombre: "No", campo: "index", ancho: "10%" },
    { nombre: "Número", campo: "numero", ancho: "20%" },
    { nombre: "Capacidad", campo: "capacidad", ancho: "20%" },
    { nombre: "Ubicación", campo: "nombreUbicacion", ancho: "30%" },
    {
      nombre: "Activo",
      campo: "activo",
      ancho: "10%",
      render: (text) => (text ? "Sí" : "No")
    },
    {
      nombre: "Acción",
      ancho: "10%",
      render: (_, record) => (
        <div className="d-flex justify-content-center gap-2">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => {
              setRegistroEditando(record);
              formEditar.setFieldsValue({
                idUbicacionComedor: record.idUbicacionComedor,
                numero: record.numero,
                capacidad: record.capacidad,
                activo: record.activo
              });
              setIsEditModalOpen(true);
            }}
          >
            <FaEdit />
          </Button>
          <Popconfirm
            title="¿Estás seguro de eliminar este comedor?"
            onConfirm={() => eliminarComedor(record.id_comedor)}
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
  <div style={{ width: "33%", textAlign: "center" }}>
    <h2 className="d-flex align-items-center">
                Comedores
            </h2>
  </div>
     <div style={{ width: "24%", textAlign: "left", paddingTop: "40px" }}>
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
    <FaPlus style={{ marginRight: "6px" }} /> Agregar Comedor
  </Button>

</div>

      </div>
      <Tabla columnas={columnas} datos={comedores} loading={loading} />







      {/* Modal de creación */}
      <Modal
        title="Nuevo Comedor"
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
                numero: values.numero,
                capacidad: values.capacidad,
                idUbicacionComedor: values.idUbicacionComedor,
                activo: values.activo,
                idObjeto: 5
              };

              await axios.post("http://localhost:4000/api/comedores", payload, {
                withCredentials: true
              });

              message.success("Comedor registrado correctamente");
              setIsModalOpen(false);
              form.resetFields();
              fetchComedores();
            } catch (error) {
              console.error("Error al insertar comedor:", error);
              message.error("No se pudo registrar el comedor");
            }
          }}
        >
          <Form.Item
            label="Ubicación del Comedor"
            name="idUbicacionComedor"
            rules={[{ required: true, message: "Selecciona una ubicación" }]}
          >
            <Select
              placeholder="Selecciona una ubicación"
              options={ubicaciones.map((u) => ({
                label: u.nombre,
                value: u.idUbicacionComedor
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Número"
            name="numero"
            rules={[{ required: true, message: "Campo obligatorio" }]}
          >
            <InputNumber min={1} className="w-100" />
          </Form.Item>

          <Form.Item
            label="Capacidad"
            name="capacidad"
            rules={[{ required: true, message: "Campo obligatorio" }]}
          >
            <InputNumber min={1} className="w-100" />
          </Form.Item>

          <Form.Item
            label="Activo"
            name="activo"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal de edición */}
      <Modal
        title="Editar Comedor"
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
                id_comedor: registroEditando.id_comedor,
                numero: values.numero,
                capacidad: values.capacidad,
                idUbicacionComedor: values.idUbicacionComedor,
                activo: values.activo,
                idObjeto: 5
              };

              await axios.put("http://localhost:4000/api/comedores/actualizar", payload, {
                withCredentials: true
              });

              message.success("Comedor actualizado correctamente");
              setIsEditModalOpen(false);
              fetchComedores();
            } catch (error) {
              console.error("Error al actualizar comedor:", error);
              message.error("No se pudo actualizar el comedor");
            }
          }}
        >
          <Form.Item
            label="Ubicación del Comedor"
            name="idUbicacionComedor"
            rules={[{ required: true, message: "Selecciona una ubicación" }]}
          >
            <Select
              placeholder="Selecciona una ubicación"
              options={ubicaciones.map((u) => ({
                label: u.nombre,
                value: u.idUbicacionComedor
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Número"
            name="numero"
            rules={[{ required: true, message: "Campo obligatorio" }]}
          >
            <InputNumber min={1} className="w-100" />
          </Form.Item>

          <Form.Item
            label="Capacidad"
            name="capacidad"
            rules={[{ required: true, message: "Campo obligatorio" }]}
          >
            <InputNumber min={1} className="w-100" />
          </Form.Item>

          <Form.Item
            label="Activo"
            name="activo"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Comedores;