import axios from "axios";
import {
  FAIL_AJUSTE_INVENTARIO_LISTA,
  FAIL_AJUSTE_INVENTARIO_REGISTRAR,
  REQUEST_AJUSTE_INVENTARIO_LISTA,
  REQUEST_AJUSTE_INVENTARIO_REGISTRAR,
  SUCCESS_AJUSTE_INVENTARIO_LISTA,
  SUCCESS_AJUSTE_INVENTARIO_REGISTRAR,
} from "../constantes/ajusteInventarioConstantes";
import { actualizarAccessToken } from "./sesionActions";

export const registrarAjustarInventario =
  (ajusteInventario) => async (dispatch, getState) => {
    dispatch({ type: REQUEST_AJUSTE_INVENTARIO_REGISTRAR });

    try {
      const {
        usuarioInfo: { token },
      } = getState();

      // Crear header con el tipo de datos que se envia y el token para autenticacio
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        "/api/crear-ajuste-inventario/",
        ajusteInventario,
        config
      );

      dispatch({ type: SUCCESS_AJUSTE_INVENTARIO_REGISTRAR });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(actualizarAccessToken(registrarAjustarInventario));
      } else {
        dispatch({
          type: FAIL_AJUSTE_INVENTARIO_REGISTRAR,
          payload: error.message,
        });
      }
    }
  };

export const pedirAjusteInventarioLista = () => async (dispatch, getState) => {
  dispatch({ type: REQUEST_AJUSTE_INVENTARIO_LISTA });

  // Intentar pedir lista de productos al backend
  try {
    // Obtener el token desde el Redux store
    const {
      usuarioInfo: { token },
    } = getState();

    // Crear header con el tipo de datos que se envia y el token para autenticacio
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // Recibir la respuesta del backend y guardarla en data
    const { data } = await axios.get("api/ajuste-inventario/", config);

    dispatch({ type: SUCCESS_AJUSTE_INVENTARIO_LISTA, payload: data });
  } catch (error) {
    // Si el backend responde con un error 401 (no autorizado) intentar actualizar el token
    if (error.response && error.response.status === 401) {
      dispatch(actualizarAccessToken(pedirAjusteInventarioLista));
    } else {
      dispatch({ type: FAIL_AJUSTE_INVENTARIO_LISTA, payload: error.message });
    }
  }
};
