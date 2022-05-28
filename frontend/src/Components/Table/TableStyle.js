import styled from "styled-components";

export const TableWrapper = styled.div`
  width: 95%;
  margin: 10px auto;
  overflow-x: auto;
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
    background-color: #047570;
    color: white;
  }
`;

export const TableIcon = styled.span`
  margin-right: 5px;
  font-size: 20px;
`;
