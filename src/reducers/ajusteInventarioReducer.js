import {
  FAIL_AJUSTE_INVENTARIO_LISTA,
  FAIL_AJUSTE_INVENTARIO_REGISTRAR,
  REQUEST_AJUSTE_INVENTARIO_LISTA,
  REQUEST_AJUSTE_INVENTARIO_REGISTRAR,
  SUCCESS_AJUSTE_INVENTARIO_LISTA,
  SUCCESS_AJUSTE_INVENTARIO_REGISTRAR,
} from "../constantes/ajusteInventarioConstantes";

export const ajusteInventarioRegistrarReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_AJUSTE_INVENTARIO_REGISTRAR:
      return { loading: true };

    case SUCCESS_AJUSTE_INVENTARIO_REGISTRAR:
      return { loading: false, success: true };

    case FAIL_AJUSTE_INVENTARIO_REGISTRAR:
      return { loading: false, error: action.payload };

    default:
      return {};
  }
};

export const ajusteInventarioListaReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_AJUSTE_INVENTARIO_LISTA:
      return { loading: true };

    case SUCCESS_AJUSTE_INVENTARIO_LISTA:
      return { loading: false, ajusteInventarios: action.payload };

    case FAIL_AJUSTE_INVENTARIO_LISTA:
      return { loading: false, error: action.payload };

    default:
      return {};
  }
};
