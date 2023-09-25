import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import Loader from "../componentes/general/Loader";
import Mensaje from "../componentes/general/Mensaje";
import {
  StyledCol,
  StyledContainer,
  StyledRow,
} from "./styles/AjusteInventarioLista.styles";
import { useMostrarDetallesAjusteInventario } from "./utilis/AjusteInventario.utilis";
import TablaAjusteInventario from "../componentes/AjusteInventarioLista/TablaAjusteInventario";
import VentanaMostrarAjusteInventario from "../componentes/AjusteInventarioLista/VentanaMostrarAjusteInventario";
import { pedirAjusteInventarioLista } from "../actions/ajusteInventario";

const AjusteInventarioLista = () => {
  // Funcion para disparar las acciones
  const dispatch = useDispatch();
  // Obtener lista de productos del Redux
  const ajusteInventarioLista = useSelector(
    (state) => state.ajusteInventarioLista
  );
  const { loading, ajusteInventarios, error } = ajusteInventarioLista;

  const {
    mostrarAjusteInventario,
    ajusteInventario,
    manejarCerrarVentana,
    manejarMostrarDetallesAjusteInventario,
  } = useMostrarDetallesAjusteInventario(dispatch, ajusteInventarios);

  // useEffect para obtener productos del Redux store
  useEffect(() => {
    // Si no hay productos, disparar la accion de pedir productos
    if (!ajusteInventarios) {
      dispatch(pedirAjusteInventarioLista());
    }
  }, [dispatch, ajusteInventarios]);

  // Renderizar loading si se estan cargando los productos
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

  // Renderizar mensaje de errors si el servidor regresa un error al pedir la lista de productos
  if (error)
    return (
      <StyledContainer fluid>
        <StyledRow>
          <StyledCol>
            <Mensaje variant="danger">
              Hubo un error al cargar la lista de ajuste inventario
            </Mensaje>
          </StyledCol>
        </StyledRow>
      </StyledContainer>
    );

  // Si se obtienen los productos renderizar la tabla de productos
  return (
    ajusteInventarios && (
      <>
        <StyledContainer fluid>
          <h1>Ajuste Inventarios</h1>
          <StyledRow>
            <StyledCol>
              {/* Tabla de productos */}
              <TablaAjusteInventario
                ajusteInventarios={ajusteInventarios}
                manejarMostrarDetallesAjusteInventario={
                  manejarMostrarDetallesAjusteInventario
                }
              />
            </StyledCol>
          </StyledRow>
        </StyledContainer>

        {/* Mostrar ventana con detalles del producto */}
        {mostrarAjusteInventario && (
          <VentanaMostrarAjusteInventario
            ajusteInventario={ajusteInventario}
            mostrarAjusteInventario={mostrarAjusteInventario}
            manejarCerrarVentana={manejarCerrarVentana}
          />
        )}
      </>
    )
  );
};

export default AjusteInventarioLista;
