import React, { useState, useEffect } from "react";
import {
  Form,
  Select,
  DatePicker,
  InputNumber,
  Switch,
  Button,
  Row,
  Col,
  Card,
} from "antd";
import { FaReceipt } from "react-icons/fa";
import Nav from "../../components/Dashboard/navDashboard";
import BotonRegresar from "../../components/Dashboard/BotonRegresar";
import { fetchWithAuth } from "../../utils/api";
import { mostrarMensajeError } from "../../components/Crud/MensajeError";
import { mostrarMensajeExito } from "../../components/Crud/MensajeExito";
import "../../styles/Vouchers/VoucherForm.css";

const { Option } = Select;

const VoucherForm = () => {
  const [form] = Form.useForm();
  const [eventos, setEventos] = useState([]);
  const [universidades, setUniversidades] = useState([]);
  const [disenios, setDisenios] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const [evR, uniR, disR] = await Promise.all([
          fetchWithAuth("http://localhost:4000/api/eventos", { credentials: "include" }),
          fetchWithAuth("http://localhost:4000/api/universidades", { credentials: "include" }),
          fetchWithAuth("http://localhost:4000/api/credencial/diseniosCredenciales", {
            credentials: "include",
          }),
        ]);
        const [ev, uni, disRaw] = await Promise.all([evR.json(), uniR.json(), disR.json()]);
        if (!evR.ok || !uniR.ok || !disR.ok) throw new Error("Error cargando datos");
        const disArr = (disRaw.data || disRaw).map((d) => ({
          id: d.idDiseñoCredencial,
          nombre: d.nombreDisenio,
        }));
        setEventos(ev.data || ev);
        setUniversidades(uni.data || uni);
        setDisenios(disArr);
      } catch (err) {
        console.error(err);
        mostrarMensajeError("No se pudieron cargar los selectores");
      }
    })();
  }, []);

  const onFinish = async (vals) => {
    try {
      const payload = {
        idEvento: parseInt(vals.idEvento, 10),
        idUniversidad: parseInt(vals.idUniversidad, 10),
        idDisenioCredencial: parseInt(vals.idDisenioCredencial, 10),
        fechaEmision: vals.fechaEmision.format("YYYY-MM-DD"),
        fechaExpiracion: vals.fechaExpiracion.format("YYYY-MM-DD"),
        cantidadDisponible: vals.cantidadDisponible,
        fechaInicio: vals.fechaInicio.format("YYYY-MM-DD"),
        fechaFinal: vals.fechaFinal.format("YYYY-MM-DD"),
        activo: vals.activo,
      };

      const res = await fetchWithAuth("http://localhost:4000/api/voucherComida/insVoucher", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.mensaje || "Error al guardar");
      mostrarMensajeExito("Voucher guardado correctamente");
      form.resetFields();
    } catch (err) {
      console.error(err);
      mostrarMensajeError(err.message);
    }
  };

  return (
    <div className="crud voucher-form-page">
      <Nav />
      <BotonRegresar to="/vouchers" text="Regresar" />

      <h2 className="page-title">
        <FaReceipt className="icono-titulo" /> Nuevo Voucher de Comidas
      </h2>

      <Card className="voucher-card">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ activo: false }}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="idEvento" label="Evento" rules={[{ required: true }]}>
                <Select placeholder="Seleccione evento">
                  {eventos.map((e) => (
                    <Option key={e.idEvento} value={e.idEvento}>
                      {e.nombreEvento}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="idUniversidad"
                label="Universidad"
                rules={[{ required: true }]}
              >
                <Select placeholder="Seleccione universidad">
                  {universidades.map((u) => (
                    <Option key={u.idUniversidad} value={u.idUniversidad}>
                      {u.nombreUniversidad}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="idDisenioCredencial"
                label="Diseño Credencial"
                rules={[{ required: true }]}
              >
                <Select placeholder="Seleccione diseño">
                  {disenios.map((d) => (
                    <Option key={d.id} value={d.id}>
                      {d.nombre}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="fechaEmision"
                label="Fecha Emisión"
                rules={[{ required: true }]}
              >
                <DatePicker className="w-100" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="fechaExpiracion"
                label="Fecha Expiración"
                rules={[{ required: true }]}
              >
                <DatePicker className="w-100" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="cantidadDisponible"
                label="Cantidad Disponible"
                rules={[{ required: true }]}
              >
                <InputNumber min={1} className="w-100" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="fechaInicio"
                label="Fecha Inicio"
                rules={[{ required: true }]}
              >
                <DatePicker className="w-100" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="fechaFinal"
                label="Fecha Final"
                rules={[{ required: true }]}
              >
                <DatePicker className="w-100" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="activo"
                label="Activo"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="form-buttons">
            <Button type="primary" htmlType="submit">
              Guardar
            </Button>{" "}
            <Button htmlType="button" onClick={() => form.resetFields()}>
              Cancelar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default VoucherForm;