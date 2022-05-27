import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const NavLink = styled(Link)`
  color: #fff;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  &.activated {
    color: #15cdfc;
  }
  &:hover {
    font-weight: bold;
  }
`;
