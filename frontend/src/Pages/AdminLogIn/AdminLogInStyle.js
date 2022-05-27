import styled from "styled-components";
import { FaUserLock } from "react-icons/fa";

export const CardWrapper = styled.div`
  overflow: hidden;
  padding: 0 0 32px;
  margin: 48px auto 0;
  width: 380px;
  font-family: Quicksand, arial, sans-serif;
  border-radius: 5px;
  background-color: #121b29;
  color: white;
`;

export const CardIcon = styled(FaUserLock)`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

export const CardHeader = styled.header`
  text-align: center;
  padding-top: 32px;
  padding-bottom: 32px;
`;

export const CardHeading = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

export const CardBody = styled.div`
  padding-right: 32px;
  padding-left: 32px;
`;

export const CardFieldset = styled.fieldset`
  position: relative;
  padding: 0;
  margin: 0;
  border: 0;

  & + & {
    margin-top: 24px;
  }

  &:nth-last-of-type(2) {
    margin-top: 32px;
  }

  &:last-of-type {
    text-align: center;
  }
`;

export const CardInput = styled.input`
  padding: 7px 0;
  width: 100%;
  font-family: inherit;
  font-size: 14px;
  border-top: 0;
  border-right: 0;
  border-left: 0;
  border-bottom: 1px solid white;
  transition: border-bottom-color 0.25s ease-in;
  background-color: white;
  outline: 0;

  &:focus {
    border-bottom-color: #202b3d;
  }
`;

export const CardButton = styled.button`
  display: block;
  width: 100%;
  padding: 12px 0;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  color: white;
  background-color: #121b29;
  border: 1px solid white;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);

  &:hover {
    color: #121b29;
    background-color: white;
  }
`;

export const CardLink = styled.div`
  display: inline-block;
  font-size: 12px;
  text-decoration: none;
  color: #aaa;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  transition: color 0.25s ease-in;

  &:hover {
    color: #777;
  }
`;
