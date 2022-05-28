import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  border-bottom: 1px solid white;
  background-image: linear-gradient(to right, #360b3b, #056b6f);
  height: 80px;
  display: flex;
  justify-content: center;
  z-index: 10;
  /* Third Nav */
  /* justify-content: flex-start; */
`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 2rem;
  height: 100%;
  cursor: pointer;
  &.activated {
    color: #15cdfc;
    border-bottom: 5px solid #15cdfc;
  }
  &:hover {
    font-weight: bold;
    border-bottom: 5px solid white;
  }
  @media screen and (max-width: 768px) {
    margin-top: 40px;
  }
`;

export const NavMenu = styled.div`
  margin: 0;
  display: flex;
  align-items: center;

  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 84vh;
    position: absolute;
    top: 80px;
    background: linear-gradient(to right, #360b3b, #056b6f);
    top: ${({ show }) => (show ? "80px" : "-100%")};
    opacity: 1;
    transition: all 0.5s ease;
    z-index: 10;
  }
`;
export const NavIcon = styled.div`
  display: none;
  color: #fff;
  font-weight: bold;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    left: 50px;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;
