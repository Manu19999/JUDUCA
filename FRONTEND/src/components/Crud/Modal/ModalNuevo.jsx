import React from "react";
import ModalBase from "./ModalBase";

const ModalNuevo = ({ show, onHide, titulo, onGuardar, form, children, width }) => {
  return (
    <ModalBase
      show={show}
      onHide={onHide}
      titulo={titulo}
      onGuardar={onGuardar}
      form={form}
      width={width}
    >
      {children}
    </ModalBase>
  );
};

export default ModalNuevo;