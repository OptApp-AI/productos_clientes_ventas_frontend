import React, { useState } from "react";
import { Form } from "react-bootstrap";
import {
  calcularMonto,
  crearProductosVenta,
} from "../../paginas/utilis/RealizarVenta.utilis";
import {
  StyledBoton,
  StyledForm,
  StyledFormGroup,
} from "./styles/FormularioVenta.styles";

const FormularioVenta = ({
  cliente,
  manejarCambiarCliente,
  clientes,
  setProductosVenta,
  productosVenta,
  manejarSeleccionarProducto,
  productosCliente,
  setVenta,
  setMostrarVenta,
  deshabilitarVenta,
}) => {
  // Hooks para el formulario de venta
  const [tipoVenta, setTipoVenta] = useState("MOSTRADOR");
  const [tipoPago, setTipoPago] = useState("CONTADO");
  const [status, setStatus] = useState("PENDIENTE");
  const [observaciones, setObservaciones] = useState(null);
  const [descuento, setDescuento] = useState(0);

  //   Funcion para crear venta
  const manejarCrearVenta = (e) => {
    e.preventDefault();

    const nuevosProductosVenta = crearProductosVenta(productosVenta, descuento);

    const monto = calcularMonto(tipoPago, nuevosProductosVenta);
    const montoDescuento = monto * (1 - descuento / 100);

    const ventaSubmit = {
      productosVenta: nuevosProductosVenta,
      VENDEDOR: VENDEDOR,
      MONTO: montoDescuento,
      TIPO_VENTA: tipoVenta,
      TIPO_PAGO: tipoPago,
      STATUS: status,
      OBSERVACIONES: observaciones,
      CLIENTE: cliente.id,
      DESCUENTO: descuento,
      /*      LOCAL: {
            CALLE: 'Culiver City',
            NUMERO: '3',
            COLONIA: 'Barrio de Santo Santiago',
            MUNICIPIO: 'Uruapan',
            ESTADO: 'Mich',
            CP: '60030',
            RFC: 'OIGA7111294F1'
          }*/
    };
    setVenta(ventaSubmit);
    setMostrarVenta(true);
    // dispatch(registrarVenta(navigate, venta));
  };

  const VENDEDOR = JSON.parse(localStorage.getItem("name"));

  return (
    <StyledForm onSubmit={manejarCrearVenta}>
      <StyledFormGroup>
        <Form.Label>VENDEDOR</Form.Label>
        <Form.Control readOnly type="text" value={VENDEDOR}></Form.Control>
      </StyledFormGroup>

      <StyledFormGroup controlId="cliente">
        <Form.Label>CLIENTE</Form.Label>
        <Form.Control
          as="select"
          value={cliente.id}
          onChange={(e) => {
            manejarCambiarCliente(Number(e.target.value));
            setProductosVenta([]);
          }}
        >
          {clientes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.NOMBRE}
            </option>
          ))}
        </Form.Control>
      </StyledFormGroup>

      <StyledFormGroup controlId="productosCliente">
        <Form.Label>PRODUCTOS DEL CLIENTE</Form.Label>
        <Form.Control
          as="select"
          value={0}
          onChange={(e) => manejarSeleccionarProducto(Number(e.target.value))}
        >
          <option value={0}>Selecciona un producto</option>
          {productosCliente.map((pc) => (
            <option key={pc.id} value={pc.id}>
              {pc.producto_nombre}
            </option>
          ))}
        </Form.Control>
      </StyledFormGroup>

      <StyledFormGroup controlId="tipoVenta">
        <Form.Label>TIPO DE VENTA</Form.Label>
        <Form.Control
          as="select"
          value={tipoVenta}
          onChange={(e) => setTipoVenta(e.target.value)}
        >
          <option value="MOSTRADOR">Mostrador</option>
          <option value="RUTA">Ruta</option>
        </Form.Control>
      </StyledFormGroup>

      <StyledFormGroup controlId="tipoPago">
        <Form.Label>TIPO DE PAGO</Form.Label>
        <Form.Control
          as="select"
          value={tipoPago}
          onChange={(e) => setTipoPago(e.target.value)}
        >
          <option value="CONTADO">Efectivo</option>
          <option value="CREDITO">Credito</option>
          <option value="CORTESIA">Cortesia</option>
        </Form.Control>
      </StyledFormGroup>

      <StyledFormGroup controlId="status">
        <Form.Label>STATUS</Form.Label>
        <Form.Control
          as="select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {tipoPago === "CORTESIA" || descuento !== 0 ? (
            <option value="PENDIENTE">Pendiente</option>
          ) : (
            <>
              <option value="REALIZADO">Realizado</option>
              <option value="PENDIENTE">Pendiente</option>
            </>
          )}
        </Form.Control>
      </StyledFormGroup>

      <StyledFormGroup controlId="observaciones">
        <Form.Label>OBSERVACIONES</Form.Label>
        <Form.Control
          required={status === "PENDIENTE"}
          type="text"
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
          autoComplete="off"
        ></Form.Control>
      </StyledFormGroup>

      <StyledFormGroup controlId="descuento">
        <Form.Label>DESCUENTO</Form.Label>
        <Form.Control
          required
          type="number"
          value={descuento}
          min={0}
          max={100}
          autoComplete="off"
          onChange={(e) => setDescuento(parseInt(e.target.value))}
        />
      </StyledFormGroup>
      <StyledBoton disabled={deshabilitarVenta} type="submit">
        Realizar venta
      </StyledBoton>
    </StyledForm>
  );
};

export default FormularioVenta;