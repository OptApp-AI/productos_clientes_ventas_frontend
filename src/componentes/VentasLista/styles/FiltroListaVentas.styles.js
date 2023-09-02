import { Button, Form } from "react-bootstrap";
import styled from "styled-components";

export const StyledFormGroup = styled(Form.Group)`
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

export const StyledFormControlContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  input,
  select {
    width: 40%;
  }
`;

export const StyledBoton = styled(Button)`
  /* width: 50%; */
  max-width: 200px;
  height: 50px;
  margin: 10px 0;
  padding: 10px;
  background-color: rgba(0, 100, 0, 0.6);
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
  box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #00a100;
    box-shadow: 0px 2px 5px 2px rgba(0, 161, 0, 0.8);
    color: black;
  }

  @media screen and (max-width: 768px) {
    min-width: 160px;
  }
`;
