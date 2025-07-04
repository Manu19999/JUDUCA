import React, { useState, useEffect } from "react";
import Tabla from "../../components/Crud/Tabla";
import Nav from "../../components/Dashboard/navDashboard";
import BotonRegresar from "../../components/Dashboard/BotonRegresar";
import { FaTicketAlt } from "react-icons/fa";
import { Form, Input, InputNumber, DatePicker } from "antd";
import ModalNuevo from "../../components/Crud/Modal/ModalNuevo";
import ModalEditar from "../../components/Crud/Modal/ModalEdit";
import { mostrarMensajeError } from "../../components/Crud/MensajeError";
import { mostrarMensajeExito } from "../../components/Crud/MensajeExito";
import { fetchWithAuth } from "../../utils/api";
import dayjs from "dayjs";

function AsignacionesVouchers() {
  const [asignaciones, setAsignaciones] = useState([]);
  const [formNuevo] = Form.useForm();
  const [formEditar] = Form.useForm();
  const [showNuevoModal, setShowNuevoModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);

  // 1) Traer datos
  const obtenerAsignaciones = async () => {
    try {
      const res = await fetchWithAuth(
        "http://localhost:4000/api/asignacionesVouchers",
        { credentials: "include" }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.mensaje || "Error al cargar");
      setAsignaciones(data.map((item, i) => ({ ...item, indice: i + 1 })));
    } catch (err) {
      console.error(err);
      mostrarMensajeError("No se pudieron cargar las asignaciones.");
    }
  };

  useEffect(() => {
    obtenerAsignaciones();
  }, []);

  // 2) Columnas
  const columnas = [
    { nombre: "#",           campo: "indice",           ancho: "5%"  },
    { nombre: "Voucher",     campo: "nombreVoucher",    ancho: "20%" },
    { nombre: "Credencial",  campo: "idCredencial",     ancho: "20%" },
    { nombre: "Cantidad",    campo: "cantidadVouchers", ancho: "10%" },
    { nombre: "Días",        campo: "diasVouchers",     ancho: "10%" },
    { nombre: "Fecha Inicio",campo: "fechaInicio",      ancho: "15%" },
    { nombre: "Fecha Final", campo: "fechaFinal",       ancho: "15%" },
    { nombre: "Acción",      campo: "accion",           ancho: "10%" },
  ];

  // 3) Nuevo
  const handleNuevoRegistro = () => {
    formNuevo.resetFields();
    setShowNuevoModal(true);
  };
  const handleGuardarNuevo = async () => {
    try {
      const vals = await formNuevo.validateFields();
      const payload = {
        idVoucherComida:  vals.idVoucherComida,
        idCredencial:     vals.idCredencial,
        cantidadVouchers: vals.cantidadVouchers,
        diasVouchers:     vals.diasVouchers,
        fechaInicio:      vals.fechaInicio.format("YYYY-MM-DD"),
        fechaFinal:       vals.fechaFinal.format("YYYY-MM-DD"),
        idObjeto:         27,
      };
      const res = await fetchWithAuth(
        "http://localhost:4000/api/asignacionesVouchers/insAsignacion",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.mensaje);
      mostrarMensajeExito(data.mensaje || "Asignación registrada");
      setShowNuevoModal(false);
      obtenerAsignaciones();
    } catch (err) {
      console.error(err);
      mostrarMensajeError(err.message);
    }
  };

  // 4) Editar
  const handleEdit = (id) => {
    const reg = asignaciones.find((a) => a.idAsignacionVoucher === id);
    if (!reg) return;
    setRegistroSeleccionado(reg);
    setShowEditModal(true);
  };
  const handleGuardarEdit = async () => {
    try {
      const vals = await formEditar.validateFields();
      const payload = {
        idAsignacionVoucher: registroSeleccionado.idAsignacionVoucher,
        cantidadVouchers:    vals.cantidadVouchers,
        diasVouchers:        vals.diasVouchers,
        fechaInicio:         vals.fechaInicio.format("YYYY-MM-DD"),
        fechaFinal:          vals.fechaFinal.format("YYYY-MM-DD"),
        idObjeto:            27,
      };
      const res = await fetchWithAuth(
        "http://localhost:4000/api/asignacionesVouchers/actuAsignacion",
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.mensaje);
      mostrarMensajeExito(data.mensaje || "Asignación actualizada");
      setShowEditModal(false);
      setRegistroSeleccionado(null);
      formEditar.resetFields();
      obtenerAsignaciones();
    } catch (err) {
      console.error(err);
      mostrarMensajeError(err.message);
    }
  };

  // 5) Eliminar (pendiente)
// Dentro de AsignacionesVouchers.jsx

const handleDelete = async (id) => {
  try {
    const res = await fetchWithAuth(
      "http://localhost:4000/api/asignacionesVouchers",
      {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idAsignacionVoucher: id }),
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data?.mensaje || "Error al eliminar");

    mostrarMensajeExito(data.mensaje);
    obtenerAsignaciones();
  } catch (err) {
    console.error("DELETE failed:", err);
    mostrarMensajeError(err.message);
  }
};



  return (
    <div className="crud">
      <Nav />
      <BotonRegresar to="/Mantenimientosvoucher" text="Regresar" />

      <Tabla
        columnas={columnas}
        datos={asignaciones.map((a) => ({ ...a, id: a.idAsignacionVoucher }))}
        titulo="Asignaciones de Vouchers"
        icono={<FaTicketAlt className="icono-titulo" />}
        onNuevoRegistro={handleNuevoRegistro}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onGenerarReporte={() => console.log("Generar PDF")}
      />

      {/* Modal Nuevo */}
      <ModalNuevo
        show={showNuevoModal}
        onHide={() => setShowNuevoModal(false)}
        titulo="Nueva Asignación"
        onGuardar={handleGuardarNuevo}
        form={formNuevo}
        width={600}
      >
        <Form layout="vertical" form={formNuevo}>
          <Form.Item label="ID Voucher"     name="idVoucherComida" rules={[{ required: true }]}>
            <Input placeholder="ID del voucher" />
          </Form.Item>
          <Form.Item label="ID Credencial"  name="idCredencial"    rules={[{ required: true }]}>
            <Input placeholder="ID de la credencial" />
          </Form.Item>
          <Form.Item label="Cantidad"       name="cantidadVouchers" rules={[{ required: true }]}>
            <InputNumber min={1} className="w-100" />
          </Form.Item>
          <Form.Item label="Días"           name="diasVouchers"     rules={[{ required: true }]}>
            <InputNumber min={1} className="w-100" />
          </Form.Item>
          <Form.Item label="Fecha Inicio"   name="fechaInicio"      rules={[{ required: true }]}>
            <DatePicker className="w-100" format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item label="Fecha Final"    name="fechaFinal"       rules={[{ required: true }]}>
            <DatePicker className="w-100" format="YYYY-MM-DD" />
          </Form.Item>
        </Form>
      </ModalNuevo>

      {/* Modal Editar */}
      <ModalEditar
        show={showEditModal}
        onHide={() => {
          setShowEditModal(false);
          setRegistroSeleccionado(null);
          formEditar.resetFields();
        }}
        titulo="Editar Asignación"
        onGuardar={handleGuardarEdit}
        form={formEditar}
        registroSeleccionado={registroSeleccionado}
        width={600}
      >
        <Form layout="vertical" form={formEditar}>
          <Form.Item label="Cantidad"     name="cantidadVouchers" rules={[{ required: true }]}>
            <InputNumber min={1} className="w-100" />
          </Form.Item>
          <Form.Item label="Días"         name="diasVouchers"     rules={[{ required: true }]}>
            <InputNumber min={1} className="w-100" />
          </Form.Item>
          <Form.Item label="Fecha Inicio" name="fechaInicio"      rules={[{ required: true }]}>
            <DatePicker className="w-100" format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item label="Fecha Final"  name="fechaFinal"       rules={[{ required: true }]}>
            <DatePicker className="w-100" format="YYYY-MM-DD" />
          </Form.Item>
        </Form>
      </ModalEditar>
    </div>
  );
}

export default AsignacionesVouchers;