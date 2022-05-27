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
    border: 3px solid #047570;
  }
`;

export const Icon = styled.i`
  padding: 10px;
  background: #047570;
  color: white;
  min-width: 50px;
  text-align: center;
`;

export const Dropdown = styled.select`
  width: 100%;
  padding: 10px;
  outline: none;
  &:focus {
    border: 3px solid #047570;
  }
`;

export const Button = styled.button`
  background-color: #047570;
  font-weight: bold;
  color: white;
  padding: 15px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 1;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  &:hover {
    background-color: white;
    color: #047570;
  }
`;
