import { Button, Form } from "react-bootstrap";
import styled from "styled-components";
import { StyledButton } from "./FormularioProductosVenta.styles";

export const StyledForm = styled(Form)`
  width: 80%;
  height: 100%;

  @media (max-width: 768px) {
    width: 50%;

    @media screen and (max-width: 400px){
      width: 70%;
    }
  }
`;

export const StyledFormGroup = styled(Form.Group)`
  label {
    color: var(--font-color-label);
    font-weight: var(--font-weight-label);
    font-size: 0.8rem;
    margin-bottom: 0;
  }

  input,
  select {
    color: var(--font-color-input);
    font-weight: var(--font-weight-input);
    font-size: 13px;
    margin-bottom: 5px;
    height: 2.9rem;
  }
`;

export const StyledBoton = styled(StyledButton)`
  width: 100%;
  max-width: 200px;
  height: 40px;
  margin: 16px auto;
  padding: 10px;
  font-weight: bold;
  font-size: 0.9rem;

  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
    min-width: 160px;
  }
`;
