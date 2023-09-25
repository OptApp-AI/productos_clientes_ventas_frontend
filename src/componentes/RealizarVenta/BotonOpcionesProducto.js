import React, { useRef } from "react";
import { StyledButton, StyledButtonContainer } from "./styles/FormularioProductosVenta.styles";

const BotonOpcionesProducto = ({
  color,
  children,
  producto,
  onClick,
  disabled,
  gridArea,
}) => {
  const buttonRef= useRef(null);
  return (
    <StyledButtonContainer>
      <StyledButton
        ref={buttonRef}
        disabled={disabled}
        onClick={(e) => onClick(e, producto.id)}
        color={color}
        onFocus={() => buttonRef.current.blur()}
      >
        {children}
      </StyledButton>
    </StyledButtonContainer>
  );
};

export default BotonOpcionesProducto;
