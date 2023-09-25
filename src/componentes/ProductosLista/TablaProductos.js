import React from "react";

import ImagenObjeto from "../general/ImagenObjecto";
import { useMediaQuery } from "react-responsive";
import { UseScreenSize } from "../../paginas/utilis/UseScreenSize";
import { Button } from "react-bootstrap";
import { StyledButton, TableStyled } from "./styles/TablaProductos.styles";
import { BASE_URL } from "../../constantes/constantes";

const TablaProductos = ({
  productos,
  manejarMostrarDetallesProducto,
  manejarProductoDetalles,
  manejarAjusteInventario,
  manejarBorrarProducto,
}) => {
  // Determinar si el ancho de la pantalla es small o menor
  const isSmallViewport = useMediaQuery({ maxWidth: 768 });
  const shouldShow = !isSmallViewport;

  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

  // Renderizar tabla de productos
  return (
    <TableStyled striped hover>
      <thead>
        <tr>
          {shouldShow ? (
            <>
              <th>ID</th>
              <th>IMAGEN</th>
            </>
          ) : null}

          <th>NOMBRE</th>

          {shouldShow ? (
            <>
              <th>CANTIDAD</th>
              <th>PRECIO</th>
              <th>AJUSTAR INVENTARIO</th>
            </>
          ) : null}

          <th>EDITAR</th>

          {isAdmin && <th>BORRAR</th>}
        </tr>
      </thead>
      <tbody>
        {productos.map((p) => (
          <tr key={p.id} onClick={() => manejarMostrarDetallesProducto(p.id)}>
          
          {shouldShow ? (
            <>
              <td>{p.id}</td>
              <td>
                <ImagenObjeto src={`${BASE_URL}${p.IMAGEN}`} alt={p.NOMBRE} />
              </td>
            </>
          ) : null}

            <td>{p.NOMBRE}</td>

            {shouldShow ? (
              <>
                <td>{p.CANTIDAD}</td>
                <td>{p.PRECIO}</td>
                <td>
                  <Button onClick={() => manejarAjusteInventario(p.id)}>
                    <i className="fa-solid fa-clipboard"></i>
                  </Button>
                </td>
              </>
            ) : null}

            <td>
              <StyledButton onClick={() => manejarProductoDetalles(p.id)}>
                <i className="fa-solid fa-circle-info"></i>
              </StyledButton>
            </td>
            {/* Solo un admi puede borrar un producto */}
            {isAdmin && (
              <td>
                <StyledButton
                  variant="danger"
                  onClick={(e) => {
                    manejarBorrarProducto(e, p.id);
                  }}
                >
                  <i className="fa-solid fa-trash"></i>
                </StyledButton>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </TableStyled>
  );
};

export default TablaProductos;
