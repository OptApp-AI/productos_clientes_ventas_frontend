import React, { useState } from "react";
import { Form } from "react-bootstrap";

import UseScreenSize from "../../paginas/utilis/UseScreenSize";
import VentanaMostrarProducto from "../ProductosLista/VentanaMostrarProducto";
import Mensaje from "../general/Mensaje";
import {
  StyledButtonsContainer,
  StyledCol,
  StyledOptionsContainer,
  StyledProductoContenedor,
  StyledProductoInfoContainer,
  StyledRow,
  StyledSeleccionadorCantidad,
  StyledSeleccionadorForm,
  StyledSubtotal,
} from "./styles/FormularioProductosVenta.styles";
import BotonOpcionesProducto from "./BotonOpcionesProducto";
import { BASE_URL } from "../../constantes/constantes";

const FormularioProductoVenta = ({
  productos,
  manejarCambioCantidad,
  manejarConfirmarProducto,
  manejarCancelarProducto,
}) => {
  // Estado para la ventana emergente con la informacion del producto
  const [mostrarProducto, setMostrarProducto] = useState(false);

  // Hook para mostrar ventana con informacion del producto
  const [producto, setProducto] = useState({});

  // Funcion para mostrar informacion del producto
  const manejarMostrarDetallesProducto = (productoId) => {
    const productoSeleccionado = modificarProducto({
      ...productos.find((c) => c.id === productoId),
    });

    setProducto(productoSeleccionado);
    setMostrarProducto(true);
  };

  const { ancho, alto } = UseScreenSize();

  // Si no hay productos seleccionados pedir al usuario que seleccione al menos uno
  if (!productos.length)
    return (
      <StyledRow>
        <StyledCol>
          <Mensaje variant="primary">
            No hay productos agregados. Seleccione un producto para poder
            realizar la venta
          </Mensaje>
        </StyledCol>
      </StyledRow>
    );

  return (
    <>
      {productos.map((producto) => {
        return (
          <StyledProductoContenedor
            confirmado= {producto.confirmado}
            key={producto.id}
            onClick={() => manejarMostrarDetallesProducto(producto.id)}
          >
            {/* Informacion del producto */}
            <StyledProductoInfoContainer style={{fontSize: "13px"}}  confirmado= {producto.confirmado}>

              <span>{producto.producto_nombre} </span>
              <img
                src={`${BASE_URL}${producto.producto_imagen}`}
                alt={producto.producto_nombre}
              />
            </StyledProductoInfoContainer>

            <StyledOptionsContainer>
              {/* Input para seleccionar cantidad */}
              <StyledSeleccionadorCantidad onClick={(e) => e.stopPropagation()}>
                <StyledSubtotal confirmado={producto.confirmado}>
                  
                  {ancho > 360 ? (
                    <span><span style={{fontWeight: 'bold'}}>Precio: </span>${producto.PRECIO}</span>
                  ) : null} 
                  
                  {ancho > 900 ? (
                    <span><span style={{fontWeight: 'bold'}}>Inventario: </span>{producto.producto_cantidad.toFixed(3)}</span>
                  ) : null}
                  
                  <span><span style={{fontWeight: 'bold'}}>Subtotal: </span>${(producto.PRECIO*producto.cantidadVenta).toFixed(2)}</span>
                </StyledSubtotal>
                <StyledSeleccionadorForm controlId={producto.id}>
                  <Form.Control
                    disabled={producto.confirmado}
                    type="number"
                    value={producto.cantidadVenta}
                    onChange={(e) =>
                      manejarCambioCantidad(
                        e,
                        Number(e.target.value),
                        producto.id
                      )
                    }
                  />
                </StyledSeleccionadorForm>
              </StyledSeleccionadorCantidad>

              {/* Botones para el producto de venta */}

              <StyledButtonsContainer>
                {producto.confirmado == false ? (
                  <BotonOpcionesProducto
                    color="green"
                    producto={producto}
                    onClick={manejarConfirmarProducto}
                    disabled={false}
                    style={{gridArea: "Confirmar-Modificar"}}
                  >
                  <i className="fa-solid fa-check"/>
                  </BotonOpcionesProducto>
                ) : (
                  <BotonOpcionesProducto
                    color="blue"
                    producto={producto}
                    onClick={manejarConfirmarProducto}
                    disabled={false}
                    style={{gridArea: "Confirmar-Modificar"}}
                  >
                    <i className="fa-solid fa-pen-to-square"/>
                  </BotonOpcionesProducto>
                )}

                <BotonOpcionesProducto
                  color="red"
                  producto={producto}
                  onClick={manejarCancelarProducto}
                  disabled={false}
                  style={{gridArea: "Eliminar"}}
                >
                  <i className="fa-solid fa-xmark"/>
                  
                </BotonOpcionesProducto>
              </StyledButtonsContainer>
            </StyledOptionsContainer>
          </StyledProductoContenedor>
        );
      })}

      {/* Mostrar producto */}
      {mostrarProducto && (
        <VentanaMostrarProducto
          producto={producto}
          mostrarProducto={mostrarProducto}
          manejarCerrarVentana={() => setMostrarProducto(false)}
        />
      )}
    </>
  );
};

const modificarProducto = (producto) => {
  const nuevoProducto = { ...producto };

  nuevoProducto.NOMBRE = nuevoProducto.producto_nombre;
  nuevoProducto.CANTIDAD = nuevoProducto.producto_cantidad;

  return nuevoProducto;
};

export default FormularioProductoVenta;
