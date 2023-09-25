import { useState } from "react";

// Funcion para mostrar ventana con detalles del producto
export const useMostrarDetallesAjusteInventario = (
  dispatch,
  ajusteInventarios
) => {
  // Estado para la ventana emergente con la informacion del producto
  const [mostrarAjusteInventario, setMostrarAjusteInventario] = useState(false);
  // Estado para guardar informacion del producto
  const [ajusteInventario, setAjusteInventario] = useState({});

  // Funcion para cerrar la ventana de informacion del producto
  const manejarCerrarVentana = () => {
    setMostrarAjusteInventario(false);
  };

  // Funcion para mostrar ventana emergente con detalles del producto
  const manejarMostrarDetallesAjusteInventario = (ajusteInventarioId) => {
    const ajusteInventarioSeleccionado = {
      ...ajusteInventarios.find((ai) => ai.id === ajusteInventarioId),
    };
    setAjusteInventario(ajusteInventarioSeleccionado);
    setMostrarAjusteInventario(true);
  };

  return {
    mostrarAjusteInventario,
    setMostrarAjusteInventario,
    ajusteInventario,
    manejarCerrarVentana,
    manejarMostrarDetallesAjusteInventario,
  };
};
