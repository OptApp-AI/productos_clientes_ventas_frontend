import { Nav, NavDropdown, NavLink, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import styled from "styled-components";

export const StyledNavbar = styled(Navbar)`
  height: 12vh;

  @media screen and (max-width: 1200px) {
    height: auto;
    z-index: 1000;
  }
`;

export const StyledLinkContainerEmpresa = styled(LinkContainer)`
  @media screen and (max-width: 350px){
    padding: 0px;
    margin: 0px;
    width: 60px;
  }
`;

export const StyledImage = styled.img`
  @media screen and (max-width: 350px){
    height: 45px;
    width: 70px;
  }
`;

export const StyledNavWrapper = styled(Nav.Link)`
  display: flex;
  align-items: center;
`;

export const StyledImageContainer = styled.div`
  display: flex;
  line-height: 100px;
  height: 50px;
  margin-top: 0px;
`;

export const StyledText = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: black;
  display: inline-block;
`;

export const StyledNavDropdown = styled(NavDropdown)`
  & div {
    color: ${(props) => props.bgcolor};
  }
`;

export const StyledTextHGP = styled(StyledText)`
  @media screen and (max-width: 990px){
    display: none;
  }
`;

export const StyledTextUsername = styled(StyledText)`
  @media screen and (max-width: 450px){
    font-size: 1rem;

export const StyledNavLink = styled(NavLink)`
  & div {
    color: ${(props) => props.bgcolor};

  }
`;
