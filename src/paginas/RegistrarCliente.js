import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loader from "../componentes/general/Loader";
import { registrarCliente } from "../actions/clienteActions";
import { RESET_CLIENTE_REGISTRAR } from "../constantes/clienteConstantes";
import { useForm } from "react-hook-form";
import Mensaje from "../componentes/general/Mensaje";
import VentanaFormularioPrecios from "../componentes/RegistrarCliente/VentanaFormularioPrecios";
import {
  StyledBoton,
  StyledCol,
  StyledContainer,
  StyledFormGroup,
  StyledRow,
} from "./styles/RegistrarCliente.styles";
import {
  crearPreciosCliente,
  useProductos,
} from "./utilis/RegistrarCliente.utilis";

const RegistrarCliente = () => {
  // Funcion para disparar las acciones
  const dispatch = useDispatch();

  // Funcion para navegar en la pagina
  const navigate = useNavigate();

  // Obtener lista de productos del Redux
  const productoLista = useSelector((state) => state.productoLista);
  const { loading, productos, error } = productoLista;

  // Obtener el estado registrar cliente del Redux
  const clienteRegistrar = useSelector((state) => state.clienteRegistrar);
  const {
    loading: loadingRegistrar,
    success: successRegistrar,
    error: errorRegistrar,
  } = clienteRegistrar;

  // Custom Hook para precios de productos del cliente
  const { productosCliente, manejarCambioPrecio } = useProductos(
    productos,
    dispatch
  );
  // Hook para mostrar precios del cliente
  const [mostrarPrecios, setMostrarPrecios] = useState(false);

  // useForm para validar formulario
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // useEffect para mostrar las alertas de validacion del formulario
  useEffect(() => {
    if (errors.ciudad) {
      toast.dismiss();
      toast.error(errors.ciudad.message);
    }

    if (errors.numero) {
      toast.dismiss();
      toast.error(errors.numero.message);
    }

    if (errors.calle) {
      toast.dismiss();
      toast.error(errors.calle.message);
    }

    if (errors.telefono) {
      toast.dismiss();
      toast.error(errors.telefono.message);
    }

    if (errors.nombre) {
      toast.dismiss();
      toast.error(errors.nombre.message);
    }
  }, [
    errors.nombre,
    errors.telefono,
    errors.calle,
    errors.numero,
    errors.ciudad,
  ]);

  // useEffect para mostrar las alertas de registro cliente
  useEffect(() => {
    if (loadingRegistrar) {
      toast.loading("Registrando cliente");
    }

    if (successRegistrar) {
      toast.remove();
      toast.success("Cliente registrado");
      // Reset cliente registrar para que no se ejecute este bloque de codigo cada vez que entra a registrar cliente
      dispatch({ type: RESET_CLIENTE_REGISTRAR });
      navigate("/clientes");
    }

    if (errorRegistrar) {
      toast.dismiss();
      toast.error("Error al registrar cliente");
    }
  }, [successRegistrar, errorRegistrar, loadingRegistrar, navigate, dispatch]);

  // Funcion para registrar cliente
  const manejarRegistrarCliente = (data) => {
    // Esta funcion permite crear un array de precios con el formato que recibe el backend
    const nuevosPreciosCliente = crearPreciosCliente(productosCliente);

    dispatch(
      registrarCliente({
        NOMBRE: data.nombre,
        CONTACTO: data.contacto,
        TELEFONO: data.telefono,
        CORREO: data.correo,
        TIPO_PAGO: data.tipoPago,
        direccion: {
          CALLE: data.calle,
          NUMERO: data.numero,
          COLONIA: data.colonia,
          CIUDAD: data.ciudad,
          MUNICIPIO: data.municipio,
          CP: data.codigoPostal !== "" ? data.codigoPostal : null,
        },
        preciosCliente: nuevosPreciosCliente,
      })
    );
  };

  // Renderizar loading si se estan cargando los clientes
  if (loading)
    return (
      <StyledContainer fluid>
        <StyledRow>
          <StyledCol>
            <Loader />
          </StyledCol>
        </StyledRow>
      </StyledContainer>
    );

  // Renderizar mensaje de error si el servidor regresa un error al pedir la lista de clientes
  if (error)
    return (
      <StyledContainer fluid>
        <StyledRow>
          <StyledCol>
            <Mensaje variant="danger">
              Hubo un error al cargar la lista de clientes
            </Mensaje>
          </StyledCol>
        </StyledRow>
      </StyledContainer>
    );

  return (
    productos && (
      <>
        <StyledContainer fluid>
          <h1>Registrar cliente</h1>

          <Form onSubmit={handleSubmit(manejarRegistrarCliente)}>
            <StyledRow>
              <StyledCol md={4}>
                {/* Nombre */}
                <StyledFormGroup controlId="nombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    {...register("nombre", {
                      required: "Por favor, introduce el nombre del cliente",
                    })}
                    type="text"
                    autoComplete="off"
                  ></Form.Control>
                </StyledFormGroup>

                {/* Contacto */}
                <StyledFormGroup controlId="contacto">
                  <Form.Label>Nombre Contacto (Opcional)</Form.Label>
                  <Form.Control
                    {...register("contacto")}
                    type="text"
                    autoComplete="off"
                  ></Form.Control>
                </StyledFormGroup>

                {/* Telefono */}
                <StyledFormGroup controlId="telefono">
                  <Form.Label>Telefono</Form.Label>
                  <Form.Control
                    {...register("telefono", {
                      required: "Por favor, introduce el teléfono del cliente",
                    })}
                    type="number"
                    autoComplete="off"
                  ></Form.Control>
                </StyledFormGroup>

                {/* Correo */}
                <StyledFormGroup controlId="correo">
                  <Form.Label>Correo (Opcional)</Form.Label>
                  <Form.Control
                    {...register("correo")}
                    type="email"
                    autoComplete="off"
                  ></Form.Control>
                </StyledFormGroup>

                {/* Tipo de pago */}
                <StyledFormGroup controlId="tipoPago">
                  <Form.Label>Tipo de pago</Form.Label>
                  <Form.Control {...register("tipoPago")} as="select">
                    <option value="EFECTIVO">EFECTIVO</option>
                    <option value="CREDITO">CREDITO</option>
                  </Form.Control>
                </StyledFormGroup>
              </StyledCol>
              <StyledCol md={4}>
                {/* Calle */}
                <StyledFormGroup controlId="calle">
                  <Form.Label>Calle</Form.Label>
                  <Form.Control
                    {...register("calle", {
                      required: "Por favor, introduce la calle del cliente",
                    })}
                    type="text"
                    autoComplete="off"
                  ></Form.Control>
                </StyledFormGroup>

                {/* Numero */}
                <StyledFormGroup controlId="numero">
                  <Form.Label>Número Dirección</Form.Label>
                  <Form.Control
                    {...register("numero", {
                      required: "Por favor, introduce el número en la calle",
                    })}
                    type="number"
                  ></Form.Control>
                </StyledFormGroup>

                {/* Colonia */}
                <StyledFormGroup controlId="colonia">
                  <Form.Label>Colonia (Opcional)</Form.Label>
                  <Form.Control
                    {...register("colonia")}
                    type="text"
                    autoComplete="off"
                  ></Form.Control>
                </StyledFormGroup>
                <StyledBoton
                  type="button"
                  onClick={() => setMostrarPrecios(true)}
                >
                  Modificar precios
                </StyledBoton>
              </StyledCol>
              <StyledCol md={4}>
                {/* Ciudad */}
                <StyledFormGroup controlId="ciudad">
                  <Form.Label>Ciudad</Form.Label>
                  <Form.Control
                    {...register("ciudad", {
                      required: "Por favor, introduce la ciudad",
                    })}
                    type="text"
                    autoComplete="off"
                  ></Form.Control>
                </StyledFormGroup>

                {/* Municipio */}
                <StyledFormGroup controlId="municipio">
                  <Form.Label>Municipio (Opcional)</Form.Label>
                  <Form.Control
                    {...register("municipio")}
                    type="text"
                    autoComplete="off"
                  ></Form.Control>
                </StyledFormGroup>

                {/* Codigo postal */}
                <StyledFormGroup controlId="codigoPostal">
                  <Form.Label>C.P (Opcional)</Form.Label>
                  <Form.Control
                    {...register("codigoPostal")}
                    type="number"
                    autoComplete="off"
                  ></Form.Control>
                </StyledFormGroup>
                <StyledBoton type="submit">Registrar cliente</StyledBoton>
              </StyledCol>
            </StyledRow>
          </Form>
        </StyledContainer>

        {/* Formulario de precios del cliente */}
        <VentanaFormularioPrecios
          productos={productosCliente}
          mostrarPrecios={mostrarPrecios}
          manejarCerrarVentana={() => setMostrarPrecios(false)}
          manejarCambioPrecio={manejarCambioPrecio}
        />
      </>
    )
  );
};

export default RegistrarCliente;
