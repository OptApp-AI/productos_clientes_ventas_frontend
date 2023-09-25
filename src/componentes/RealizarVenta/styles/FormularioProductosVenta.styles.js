import { Button, Col, Container, Form, Row } from "react-bootstrap";
import styled, { keyframes } from "styled-components";
import { css } from "styled-components";

// Layout
export const StyledContainer = styled(Container)`
  height: 100%;
  padding: 2rem 0;
  background: linear-gradient(
    rgb(54, 54, 82),
    15%,
    rgb(84, 106, 144),
    60%,
    rgb(68, 111, 151)
  );

  h1 {
    text-align: center;
    color: var(--white-color);
    margin-bottom: 3rem;
  }
`;

export const StyledRow = styled(Row)`
  height: 80%;
  width: 100%;
  display: flex;
  align-items: center;
  max-width: 120rem;
`;

export const StyledCol = styled(Col)`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const colorChange = keyframes`
  from{
    background: none;
  }
  to{
    bakcground: linear-gradient(rgba(255, 255, 255, 0.8) 5%, transparent 90%);
  }
`;

const colorChangeInv = keyframes`
  from{
    background: linear-gradient(rgba(255, 255, 255, 0.8) 5%, transparent 90%);
  }
  to{
    bakcground: none;
  }
`;

export const StyledProductoContenedor = styled.div`
  box-shadow: ${props => props.confirmado== true ? '1px 1px 5px 2px rgba(255, 255, 255, 0.7)':'1px 1px 5px 2px rgba(255, 255, 255, 0.8)'};
  height: 160px;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
  /* justify-content: center; */
  background: ${props => props.confirmado == true ? 'none':'linear-gradient(rgba(255, 255, 255, 0.8) 10%, transparent 95%)'};
  background-color: ${props => props.confirmado==true ? 'rgba(220, 220, 220, 0.15)':'rgba(255,255,255,0.3)'};
  border-radius: 10px;
  transition: background 0.5s ease;
  animation: ${props => props.confirmado == true ? colorChange: colorChangeInv} 0.5s ease;

  @media screen and (max-width: 450px){
    height: 180px;
    gap: 7px;
  }
`;

export const StyledProductoInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  justify-content: center;
  margin-left: 20px;
  width: 100px;

  img {
    width: 100px;
    height: 100px;
    border-radius: 5px;
  }

  span {
    color: ${props => props.confirmado== true ? 'rgb(255,255,255)':'rgb(0,0,0)'};
    font-weight: bold;
  }

  @media screen and (max-width: 1000px){
    width: 150px;
    margin-left: 8px;

    @media screen and (max-width: 400px){
        width: 110px;

        img{
          width:70px;
          height: 70px;
        }
    }
  }
`;

export const StyledOptionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  @media screen and (max-width: 880px){
    width: 100%;
    display: grid;
    grid-template-columns: 0.5fr 1fr 0.5fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: "Seleccionador Seleccionador Botones"
                         "Seleccionador Seleccionador Botones";
    
    @media screen and (max-width: 769px){
      display: flex;

      @media screen and (max-width: 551px){
        display: grid;

        @media screen and (max-width: 450px){
          grid-template-columns: 0.5fr 1fr 0.4fr;
          grid-gap: 15px;

          @media screen and (max-width: 400px){
            grid-template-rows: 1.5fr 1fr;
            grid-template-columns: 1fr;
            grid-template-areas: "Seleccionador"
                                 "Botones";
            min-width: 100px;
            height: 100%;
            grid-gap: 2px;
          }
        }
      }
    }
  }
`;

export const StyledSeleccionadorCantidad = styled.div`
  padding: 10px;
  margin-left: 40px;
  width: 100%;
  display: grid;
  grid-gap: 15px;
  grid-template-rows: 1.5fr 2fr;
  grid-template-columns: 1fr;
  grid-template-areas: "Subtotal"
                       "Seleccionador";

  @media screen and (max-width: 1000px){
    margin-left: 0px;
    margin-top: 7px;
    padding: 0px;
    grid-area: Seleccionador;

    @media screen and (max-width: 400px){
      grid-gap: 0px;
      margin: 0;
      padding: 0;
    }
  }
`;

export const StyledSeleccionadorForm = styled(Form.Group)`
  grid-area: Seleccionador;
  width: 100%;
  display:flex;
  justify-content:center;
  align-items:center;

  input{
    max-width:280px;

    @media screen and (max-width: 400px){
      padding: 0px 15px;
      height: 60%;
    }
  }
`;

export const StyledSubtotal = styled.p`
  font-size: 1rem;
  grid-area: Subtotal;
  width: 100%;
  height: 100%;
  margin:0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;

  &:first-child{
    color: ${props => props.confirmado==true ? 'white':'black'};
  }

`;

export const StyledButtonsContainer = styled.div`
  display: grid;
  width: 70%;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-template-areas: "Confirmar-Modificar Eliminar";
  grid-gap: 20px;
  justify-content: space-around;
  margin-left: 15px;
  align-items: center;
  padding: 10px;
  
  Button {
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media screen and (max-width: 1080px) {
    Button {
      width: 70px;
      font-size: 0.8rem;
    }
    margin-left: 10px;
    grid-area: Botones;

    @media screen and (min-width: 768px) and (max-width: 880px){
      grid-template-rows: 1fr 1fr;
      grid-template-columns: 1fr;
      grid-template-areas: "Confirmar-Modificar"
                           "Eliminar";
      Button{
        font-size: 1rem;
      }
    }

    @media screen and (max-width: 570px){
      grid-template-rows: 1fr 1fr;
      grid-template-columns: 1fr;
      grid-template-areas: "Confirmar-Modificar"
                           "Eliminar";
      Button{
        font-size: 1rem;
        width: 50px;
      }
      margin-top: 5px;
    }
    @media screen and (max-width: 400px){
      grid-template-rows: 1fr;
      grid-template-columns: repeat(2, 1fr);
      grid-template-areas: "Confirmar-Modificar Eliminar";
      width: 100%;
      Button{
        font-size: 0.65rem;
        width: 40px;
      }
      grid-gap: 0px;
      margin: 0;
      padding: 5px;
      align-items: top;
      
      Button{
        height: 15px;
        margin: 0;
      }
    }
  }
}`;

export const StyledButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

// Colores del boton
const colorStyles = ({ color }) => {
  switch(color){
    case 'red':
      return css`
        background-color: var(--active-red-button);
        box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.5);
        
        &:hover {
          background-color: var(--hover-red-button);
          box-shadow: 0px 2px 5px 2px rgba(var(--hover-red-button), 0.8);       
          color: var(--white-color);
        }

        &:disabled {
          background-color: var(--disabled-red-button);
        }

        &:first-child:active{
          color: var(--white-color);
          background-color:  var(--active-red-button);
        }

        &:active:focus{
          background-color: var(--active-red-button);
          box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.5);
          color: var(--white-color);
        }

        &:focus{
          background-color: var(--active-red-button);
          box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.6);       
          color: var(--white-color);
        }

        &:focus-visible{
          color: var(--white-color);
          background-color: var(--hover-red-button);
          box-shadow: 0px 2px 5px 2px rgba(0,0,0,0.6);
        }

        &:active:focus-visible{
          color: var(--white-color);
          background-color: var(--hover-red-button);
          box-shadow: 0px 2px 5px 2px rgba(0,0,0,0.6);
        }
      `
    
    case 'green':
      return css`
      background-color: var(--active-green-button);
      box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.5);
      
      &:hover {
        background-color: var(--hover-green-button);
        box-shadow: 0px 2px 5px 2px rgba(var(--hover-green-button), 0.8);
        color: var(--white-color);
      }

      &:disabled {
        background-color: var(--disabled-green-button);
      }

      &:first-child:active{
        color: var(--white-color);
        background-color:  var(--active-green-button);
      }

      &:active:focus{
        background-color: var(--active-green-button);
        box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.5);
        color: var(--white-color);
      }

      &:focus{
        background-color: var(--active-green-button);
        box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.6);       
        color: var(--white-color);
      }

      &:focus-visible{
        color: var(--white-color);
        background-color: var(--hover-green-button);
        box-shadow: 0px 2px 5px 2px rgba(0,0,0,0.6);
      }

      &:active:focus-visible{
        color: var(--white-color);
        background-color: var(--hover-green-button);
        box-shadow: 0px 2px 5px 2px rgba(0,0,0,0.6);
      }
    `
    case 'blue':
      return css`
      background-color: var(--active-blue-button);
      box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.5);
      
      &:hover {
        background-color: var(--hover-blue-button);
        box-shadow: 0px 2px 5px 2px rgba(var(--hover-blue-button), 0.8);
        color: var(--white-color);
      }

      &:disabled {
        background-color: var(--disabled-blue-button);
      }

      &:first-child:active{
        color: var(--white-color);
        background-color:  var(--active-blue-button);
      }

      &:active:focus{
        background-color: var(--active-blue-button);
        box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.5);
        color: var(--white-color);
      }

      &:focus{
        background-color: var(--active-blue-button);
        box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.6);       
        color: var(--white-color);
      }

      &:focus-visible{
        color: var(--white-color);
        background-color: var(--hover-blue-button);
        box-shadow: 0px 2px 5px 2px rgba(0,0,0,0.6);
      }

      &:active:focus-visible{
        color: var(--white-color);
        background-color: var(--hover-blue-button);
        box-shadow: 0px 2px 5px 2px rgba(0,0,0,0.6);
      }
    `
  }
};

export const StyledButton = styled(Button)`
  color: var(--white-color);
  font-weight: bold;
  ${colorStyles}
`;