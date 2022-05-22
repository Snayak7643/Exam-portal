import React, { useState, useEffect } from "react";
import {
  TableWrapper,
  Table,
  Tr,
  Th,
  Td,
} from "../../Components/Table/TableStyle";
import { URL } from "../../Connections/Connection";

const Exam = () => {
  const [que, setQue] = useState({});
  const [pdf, setPdf] = useState("");

  const handleClick = async () => {
    try {
      const response = await fetch(URL + "/exam", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          pdf,
          que,
        }),
      });

      const res = await response.json();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const func = async () => {
      const response = await fetch(URL + "/exam", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + localStorage.getItem("jwt"),
        },
      });

      const res = await response.json();
      setQue(res[0]);
      console.log(res);
    };
    func();
  }, []);

  return (
    <TableWrapper>
      <Table>
        <thead>
          <Tr>
            <Th>Subject</Th>
            <Th>Question</Th>
            <Th>Choose File</Th>
            <Th>Uploaded File</Th>
          </Tr>
        </thead>
        <tbody>
          <Tr>
            <Td>{que.sub}</Td>
            <Td>
              <a href={que.pdf} target="_blank" rel="noreferrer">
                QueLink
              </a>
            </Td>
            <Td>
              <input
                type="text"
                placeholder="answer"
                onChange={(e) => {
                  setPdf(e.target.value);
                }}
              />
              <button onClick={handleClick}>Submit</button>
            </Td>
            <Td>Nofile</Td>
          </Tr>
        </tbody>
      </Table>
    </TableWrapper>
  );
};

export default Exam;
