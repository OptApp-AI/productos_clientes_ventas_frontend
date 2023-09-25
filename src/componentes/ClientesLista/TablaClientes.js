import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { TableStyled } from "./styles/TablaClientes.styles";
import useScreenSize from "../../paginas/utilis/UseScreenSize";

const TablaClientes = ({
  clientesFiltrados,
  manejarMostrarDetallesCliente,
  manejarClienteDetalles,
  manejarBorrarCliente,
}) => {
  const isSmallViewport = useMediaQuery({ maxWidth: 800 });
  const shouldShow = !isSmallViewport;
  const {alto, ancho} = useScreenSize();

  return (
    <Container>
      <Row>
        <Col>
          <TableStyled striped hover>
            <thead>
              <tr>

                {ancho > 500 ? (
                  <th>ID</th>
                ) : null}
                <th>NOMBRE</th>

                {shouldShow ? (
                  <th>CONTACTO</th>
                ) : null}

                {ancho > 1000 ? (
                  <>
                    <th>TELEFONO</th>
                    <th>TIPO DE PAGO</th>
                  </>
                ): null}

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
                  {ancho > 500 ? (
                    <td>{c.id}</td>
                  ): null}

                  <td>{c.NOMBRE}</td>

                  {shouldShow ? (
                    <>
                      <td>
                        {c.CONTACTO
                          ? c.CONTACTO
                          : "NO DISPONIBLE"}
                      </td>
                    </>
                  ) : null}

                  {ancho > 1000 ? (
                    <>
                      <td>{c.TELEFONO.split('-')[0]}</td>
                      <td>{c.TIPO_PAGO}</td>
                    </>
                  ): null}

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
