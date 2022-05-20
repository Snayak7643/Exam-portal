import styled from "styled-components";

export const FormWrapper = styled.div`
  max-width: 600px;
  margin: auto;
  text-align: center;
`;

export const Divider = styled.div`
  width: 100%;
  border: 1px solid grey;
`;

export const InputContainer = styled.div`
  display: flexbox;
  display: flex;
  width: 100%;
  margin-bottom: 15px;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 10px;
  outline: none;
  &:focus {
    border: 2px solid dodgerblue;
  }
`;

export const Icon = styled.i`
  padding: 10px;
  background: dodgerblue;
  color: white;
  min-width: 50px;
  text-align: center;
`;

export const Dropdown = styled.select`
  width: 100%;
  padding: 10px;
  outline: none;
  &:focus {
    border: 2px solid dodgerblue;
  }
`;

export const Button = styled.button`
  background-color: dodgerblue;
  color: white;
  padding: 15px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
  &:hover {
    opacity: 1;
  }
`;
