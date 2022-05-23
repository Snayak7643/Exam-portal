import React, { useState, useEffect } from "react";
import {
  TableWrapper,
  Table,
  Tr,
  Th,
  Td,
} from "../../Components/Table/TableStyle";
import { URL } from "../../Connections/Connection";

const UploadedAnswers = () => {
  const [ans, setAns] = useState([]);

  useEffect(() => {
    const func = async () => {
      const response = await fetch(URL + "/uploadedanswers", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + localStorage.getItem("jwt"),
        },
      });

      const res = await response.json();
      setAns(res);
      console.log(res);
    };
    func();
  }, []);

  const Rows = () => {
    return ans.map((answer, i) => {
      return (
        <Tr key={i}>
          <Td>{i + 1}</Td>
          <Td>{answer.sub}</Td>
          <Td>{answer.date}</Td>
          <Td>{answer.pdf}</Td>
        </Tr>
      );
    });
  };

  return (
    <TableWrapper>
      <Table>
        <thead>
          <Tr>
            <Th>Sl-No</Th>
            <Th>Subject</Th>
            <Th>Date</Th>
            <Th>Uploaded-File</Th>
          </Tr>
        </thead>
        <tbody>{Rows()}</tbody>
      </Table>
    </TableWrapper>
  );
};

export default UploadedAnswers;
