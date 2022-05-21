import styled from "styled-components";

export const TableWrapper = styled.div`
  max-width: 95%;
  margin: 10px auto;
`;

export const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
`;

export const Th = styled.th`
  text-align: left;
  padding: 8px;
`;

export const Td = styled.td`
  text-align: left;
  padding: 8px;
`;

export const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
    color: black;
  }
`;
