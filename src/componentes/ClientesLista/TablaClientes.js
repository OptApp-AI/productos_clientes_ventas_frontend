import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { TableStyled } from "./styles/TablaClientes.styles";

const TablaClientes = ({
  clientesFiltrados,
  manejarMostrarDetallesCliente,
  manejarClienteDetalles,
  manejarBorrarCliente,
}) => {
  const isSmallViewport = useMediaQuery({ maxWidth: 768 });
  const shouldShow = !isSmallViewport;

  return (
    <Container>
      <Row>
        <Col>
          <TableStyled striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>NOMBRE</th>

                {shouldShow ? (
                  <>
                    <th>CONTACTO</th>
                    <th>TELEFONO</th>
                    <th>TIPO DE PAGO</th>
                  </>
                ) : null}

                <th>EDITAR</th>
                <th>BORRAR</th>
              </tr>
            </thead>
            <tbody>
              {clientesFiltrados.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => manejarMostrarDetallesCliente(c.id)}
                >
                  <td>{c.id}</td>
                  <td>{truncateTexto(c.NOMBRE)}</td>

                  {shouldShow ? (
                    <>
                      <td>
                        {c.CONTACTO
                          ? truncateTexto(c.CONTACTO)
                          : "NO DISPONIBLE"}
                      </td>
                      <td>{c.TELEFONO}</td>
                      <td>{c.TIPO_PAGO}</td>
                    </>
                  ) : null}

                  <td>
                    <Button onClick={() => manejarClienteDetalles(c.id)}>
                      <i className="fa-solid fa-circle-info"></i>
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={(e) => manejarBorrarCliente(e, c.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </TableStyled>
        </Col>
      </Row>
    </Container>
  );
};

const truncateTexto = (texto) => {
  if (texto.length > 10) {
    return texto.substring(0, 10) + "...";
  }
  return texto;
};

export default TablaClientes;
