import React from "react";
import { useMediaQuery } from "react-responsive";
import { TableStyled } from "../AjusteInventarioLista/styles/TablaAjusteInventario.styles";

const TablaAjusteInventario = ({
  ajusteInventarios,
  manejarMostrarDetallesAjusteInventario,
}) => {
  // Determinar si el ancho de la pantalla es small o menor
  const isSmallViewport = useMediaQuery({ maxWidth: 768 });
  const shouldShow = !isSmallViewport;

  // Renderizar tabla de productos
  return (
    <TableStyled striped hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>CAJERO</th>

          {shouldShow ? (
            <>
              <th>BODEGA</th>
              <th>PRODUCTO</th>
              <th>TIPO DE AJUSTE</th>
            </>
          ) : null}

          <th>CANTIDAD</th>
        </tr>
      </thead>
      <tbody>
        {ajusteInventarios.map((ai) => (
          <tr
            key={ai.id}
            onClick={() => manejarMostrarDetallesAjusteInventario(ai.id)}
          >
            <td>{ai.id}</td>
            <td>{ai.CAJERO}</td>
            {shouldShow ? (
              <>
                <td>{ai.BODEGA}</td>
                <td>{ai.PRODUCTO_NOMBRE}</td>

                <td>{ai.TIPO_AJUSTE}</td>
              </>
            ) : null}

            <td>{ai.CANTIDAD}</td>
          </tr>
        ))}
      </tbody>
    </TableStyled>
  );
};

export default TablaAjusteInventario;
