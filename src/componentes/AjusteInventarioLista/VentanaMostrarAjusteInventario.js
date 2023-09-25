import React from "react";
import { Modal } from "react-bootstrap";
import {
  StyledButton,
  StyledModalBody,
  StyledModalFooter,
  StyledModalHeader,
} from "../AjusteInventarioLista/styles/VentanaMostrarAjusteInventario.styles";

const VentanaMostrarAjusteInventario = ({
  ajusteInventario,
  mostrarAjusteInventario,
  manejarCerrarVentana,
}) => {
  return (
    ajusteInventario && (
      <Modal
        centered
        show={mostrarAjusteInventario}
        onHide={manejarCerrarVentana}
      >
        <StyledModalHeader>
          <h4>Detalles del ajuste inventario #{ajusteInventario.id}</h4>
        </StyledModalHeader>
        <StyledModalBody>
          <h5>Datos del ajuste inventario</h5>
          <p>
            <strong>CAJERO:</strong> {ajusteInventario.CAJERO}
          </p>
          <p>
            <strong>BODEGA:</strong> {ajusteInventario.BODEGA}
          </p>
          <p>
            <strong>PRODUCTO:</strong> {ajusteInventario.PRODUCTO_NOMBRE}
          </p>
          <p>
            <strong>CANTIDAD:</strong> {ajusteInventario.CANTIDAD}
          </p>
          <p>
            <strong>TIPO_AJUSTE:</strong> {ajusteInventario.TIPO_AJUSTE}
          </p>
        </StyledModalBody>
        <StyledModalFooter>
          <StyledButton
            onClick={() => {
              manejarCerrarVentana();
            }}
          >
            Cerrar
          </StyledButton>
        </StyledModalFooter>
      </Modal>
    )
  );
};

export default VentanaMostrarAjusteInventario;
