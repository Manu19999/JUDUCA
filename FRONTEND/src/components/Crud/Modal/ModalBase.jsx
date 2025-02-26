import React, { useState } from "react";
import { Modal as AntModal, Button } from "antd";
import { FaSave, FaExclamationCircle } from "react-icons/fa";
import "./Modal.css";


const ModalBase = ({ show, onHide, titulo, onGuardar, form, children, width }) => {
  const [formChanged, setFormChanged] = useState(false);

  const handleCancel = () => {
    if (formChanged) {
      AntModal.confirm({
        title: "¿Estás seguro de salir?",
        content: "Tienes cambios sin guardar. ¿Deseas salir sin guardar?",
        okText: "Sí, salir",
        cancelText: "No, quedarme",
        centered: true,
        icon: <FaExclamationCircle style={{ color: "#426a99", fontSize: "24px" }} />,
        okButtonProps: {
          style: { backgroundColor: "#426a99", borderColor: "#426a99" },
        },
        cancelButtonProps: {
          style: { backgroundColor: "#e3e3e3", borderColor: "#b3b3b3", color: "#000" },
        },
        onOk: () => {
          form.resetFields();
          setFormChanged(false);
          onHide();
        },
        onCancel: () => {},
      });
    } else {
      form.resetFields();
      setFormChanged(false);
      onHide();
    }
  };

  const handleFormChange = () => {
    setFormChanged(true);
  };

  return (
    <AntModal
      title={titulo}
      open={show}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" onClick={onGuardar}>
          <FaSave /> Guardar
        </Button>,
      ]}
       className="custom-modal-card"
      width={width || 500}
    >
      {React.cloneElement(children, { onChange: handleFormChange })}
    </AntModal>
  );
};

export default ModalBase;