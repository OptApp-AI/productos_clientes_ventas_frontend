import React, { useEffect, useState } from "react";
import { Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { obtenerProductoDetalles } from "../actions/productoActions";
import { RESET_PRODUCTO_DETALLES } from "../constantes/productoConstantes";
import Loader from "../componentes/general/Loader";
import Mensaje from "../componentes/general/Mensaje";
import {
  StyledBoton,
  StyledCol,
  StyledContainer,
  StyledFormGroup,
  StyledRow,
} from "./styles/ProductoDetalles.styles";
import { registrarAjustarInventario } from "../actions/ajusteInventario";
import { RESET_AJUSTE_INVENTARIO_REGISTRAR } from "../constantes/ajusteInventarioConstantes";

const AjusteInventario = () => {
  // Obtener el id del producto
  const params = useParams();
  const productoId = params.id;

  // Funcion para disparar las acciones
  const dispatch = useDispatch();

  // Funcion para navegar en la pagina
  const navigate = useNavigate();

  // Obtener el estado desde el Redux store
  const productoDetalles = useSelector((state) => state.productoDetalles);
  const { loading, producto, error } = productoDetalles;

  // Obtener el estado desde el Redux store
  const ajusteInventarioRegistrar = useSelector(
    (state) => state.ajusteInventarioRegistrar
  );
  const {
    loading: loadingAjusteInventario,
    success: successAjusteInventario,
    error: errorAjusteInventario,
  } = ajusteInventarioRegistrar;

  const [cantidadInicial, setCantidadInicial] = useState();
  const [cantidad, setCantidad] = useState(0);

  const [bodega, setBodega] = useState("");
  const [tipoAjuste, setTipoAjuste] = useState("FALTANTE");
  const [observaciones, setObservaciones] = useState("");

  // useEffect para mostrar las alertas
  useEffect(() => {
    if (loadingAjusteInventario) {
      toast.remove();
      toast.loading("Actualizando producto");
    }

    if (successAjusteInventario) {
      toast.remove();
      toast.success("Producto actualizado");
      // Reset producto actualizar para que no se ejecute este bloque de codigo cada vez que se entra a producto detalles
      dispatch({ type: RESET_AJUSTE_INVENTARIO_REGISTRAR });
      navigate("/productos");
    }

    if (errorAjusteInventario) {
      toast.dismiss();
      toast.error("Error al actualizar");
    }
  }, [
    successAjusteInventario,
    errorAjusteInventario,
    loadingAjusteInventario,
    dispatch,
    navigate,
  ]);

  useEffect(() => {
    // Si no hay producto o el producto no es el que seleccione, disparar la accion de
    // obtener producto
    if (!producto || producto.id !== Number(productoId)) {
      dispatch(obtenerProductoDetalles(productoId));
    } else {
      setCantidadInicial(producto.CANTIDAD);
    }
  }, [dispatch, producto, productoId, successAjusteInventario, navigate]);

  const manejarActualizarProducto = (e) => {
    e.preventDefault();
    // Disparar la accion de actualizar producto

    if (tipoAjuste === "FALTANTE" && cantidad > cantidadInicial) {
      toast.dismiss();
      toast.error(
        "No hay suficiente cantidad en el inventario para este ajuste."
      );
    } else if (cantidad <= 0) {
      toast.dismiss();
      toast.error("La cantidad seleccionada debe ser mayor a 0.");
    } else {
      const ajusteInventario = {
        CAJERO: CAJERO,
        BODEGA: bodega,
        PRODUCTO: Number(productoId),
        PRODUCTO_NOMBRE: producto.NOMBRE,
        CANTIDAD: Number(cantidad),
        TIPO_AJUSTE: tipoAjuste,
        STATUS: "REALIZADO",
        OBSERVACIONES: observaciones,
      };
      console.log(ajusteInventario);
      dispatch(registrarAjustarInventario(ajusteInventario));
    }
  };

  const manejarRegresar = () => {
    // Redireccionar a la pagina de productos
    dispatch({ type: RESET_PRODUCTO_DETALLES });
    navigate("/productos");
  };

  const CAJERO = JSON.parse(localStorage.getItem("name"));

  // Renderizar loading si se estan cargando la informacion del producto
  if (loading)
    return (
      <StyledContainer fluid>
        <StyledRow style={{ height: "80%" }}>
          <StyledCol>
            <Loader />
          </StyledCol>
        </StyledRow>
      </StyledContainer>
    );

  // Renderizar mensaje de errors si el servidor regresa un error al pedir la informacion del producto
  if (error)
    return (
      <StyledContainer fluid>
        <StyledRow style={{ height: "80%" }}>
          <StyledCol>
            <Mensaje variant="danger">
              Hubo un error al cargar la informacion del producto
            </Mensaje>
          </StyledCol>
        </StyledRow>
      </StyledContainer>
    );

  if (producto)
    return (
      <StyledContainer fluid>
        <h1>Producto #{producto.id}</h1>
        <Row>
          <StyledCol>
            <StyledBoton onClick={manejarRegresar}>Regresar</StyledBoton>
          </StyledCol>
        </Row>
        <Form onSubmit={manejarActualizarProducto}>
          <StyledRow>
            <StyledCol md={6}>
              <StyledFormGroup controlId="bodega">
                <Form.Label> Nombre del tanquero</Form.Label>
                <Form.Control
                  type="text"
                  value={bodega}
                  autoComplete="off"
                  onChange={(e) => setBodega(e.target.value)}
                  required
                ></Form.Control>
              </StyledFormGroup>

              <StyledFormGroup controlId="cantidad">
                <Form.Label style={{ color: "white", fontWeight: "bold" }}>
                  Top de Ajuste
                </Form.Label>
                <Form.Control
                  style={{ color: "black", fontWeight: "bold" }}
                  as="select"
                  value={tipoAjuste}
                  onChange={(e) => setTipoAjuste(e.target.value)}
                >
                  <option value="FALTANTE">Faltante</option>
                  <option value="SOBRANTE">Sobrante</option>
                </Form.Control>
              </StyledFormGroup>
            </StyledCol>
            <StyledCol md={6}>
              <StyledFormGroup controlId="cantidad">
                <Form.Label>Cantidad</Form.Label>
                <Form.Control
                  type="number"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  step="any"
                ></Form.Control>
                <p style={{ color: "white" }}>
                  Cantidad de producto en stock: {cantidadInicial}
                </p>
              </StyledFormGroup>

              <StyledFormGroup controlId="observaciones">
                <Form.Label> Observaciones</Form.Label>
                <Form.Control
                  type="text"
                  value={observaciones}
                  autoComplete="off"
                  onChange={(e) => setObservaciones(e.target.value)}
                ></Form.Control>
              </StyledFormGroup>
            </StyledCol>
          </StyledRow>
          <Row>
            <StyledCol>
              <StyledBoton type="submit">
                Realizar ajuste de inventario
              </StyledBoton>
            </StyledCol>
          </Row>
        </Form>
      </StyledContainer>
    );
};

export default AjusteInventario;
