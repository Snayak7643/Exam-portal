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
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90vh;
    position: absolute;
    top: 80px;
    background: #000;
    top: ${({ active }) => (active ? "80px" : "-100%")};
    opacity: 1;
    transition: all 0.5s ease;
    z-index: 10;
  }
`;
