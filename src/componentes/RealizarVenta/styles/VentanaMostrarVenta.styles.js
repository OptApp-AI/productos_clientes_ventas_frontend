import { Button, Col, Row, Form } from "react-bootstrap";

import styled from "styled-components";
import { StyledButton } from "./FormularioProductosVenta.styles";

export const StyledRow = styled(Row)`
  width: 100%;
  display: flex;
  align-items: center;
  max-width: 120rem;
`;

export const StyledCol = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

export const StyledFormGroup = styled(Form.Group)`
  width: 50%;
  min-width: 200px;
  label {
    color: var(--font-color-label);
    font-weight: var(--font-weight-label);
    font-size: var(--font-size-label);
  }

  input,
  select {
    color: var(--font-color-input);
    font-weight: var(--font-weight-input);
    font-size: var(--font-size-input);
    margin-bottom: 2rem;
  }
`;

export const StyledButtonConfirmar = styled(StyledButton)`
  position: fixed;
  bottom: 0;
  left: 0;
  margin-bottom: 15px;
  margin-left: 15px;
  font-weight: "bold";
`;

export const StyledButtonCancelar = styled(StyledButton)`
  font-weight: bold;
`;
