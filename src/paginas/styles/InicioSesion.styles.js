import { Button, Form } from "react-bootstrap";
import styled from "styled-components";
import { BASE_URL } from "../../constantes/constantes";

const BACKGROUND_URL = `${BASE_URL}media/imagenes/general/background.jpg`;

export const StyledBackground = styled.div`
  position: relative;
  width: 100%;
  height: 88vh;
  background: linear-gradient(rgba(0, 0, 0, 0), 80%, rgba(0, 0, 0, 0.5)),
    url(${BACKGROUND_URL});
  background-size: 100% 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;

  @media screen and (max-width: 1200px){
    height: 100%;
  }
`;

export const StyledContainer = styled.div`
  position: relative;
  height: 90%;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StyledLogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 90%;
    width: 200px;

    @media screen and (max-height:500px){
      height: 90%;
      width: 120px;
    }
  }
`;

export const StyledForm = styled(Form)`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  align-items: center;
  background-color: rgba(185, 185, 185, 0.6);
  min-width: 300px;

  height: 350px;
  text-align: center;

  label {
    color: rgb(30, 50, 120);
    font-weight: bold;
  }

  input {
    margin-bottom: 20px;
    min-width: 280px;
    
    @media screen and (min-height: 300px) and (max-height: 400px){
      margin-bottom: 0px;
      padding: 0.25rem 1.5rem;
    }
  }

  @media screen and (min-height: 300px) and (max-height: 400px){
    height: 250px; 
  }
`;

export const StyledButton = styled(Button)`
  @media screen and (min-height: 300px) and (max-height: 400px){
    font-size: 1rem;
    padding: 10px;
    margin-top: 7px;
  }
`;