import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  TableWrapper,
  Table,
  Tr,
  Th,
  Td,
} from "../../Components/Table/TableStyle";
import { URL } from "../../Connections/Connection";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const func = async () => {
      const response = await fetch(URL + "/allstudents", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + localStorage.getItem("jwt"),
        },
      });

      const res = await response.json();
      setStudents(res);
      console.log(res);
    };
    func();
  }, [setStudents, reload]);

  const handleClick = async (_id) => {
    const response = await fetch(URL + "/deletestudent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        _id,
      }),
    });

    const res = await response.json();
    console.log(res);
    if (res.message) {
      setReload(!reload);
    }
  };

  const Rows = () => {
    return students.map((student, i) => {
      return (
        <Tr key={i}>
          <Td>{i + 1}</Td>
          <Td>{student.reg_no}</Td>
          <Td>{student.name}</Td>
          <Td>{student.std}</Td>
          <Td>
            <Link to={`/allstudents/${student._id}`}>Edit</Link>
            <button onClick={() => handleClick(student._id)}>Delete</button>
          </Td>
        </Tr>
      );
    });
  };

  return (
    <TableWrapper>
      <Table>
        <thead>
          <Tr>
            <Th>Sl.No</Th>
            <Th>Reg_No</Th>
            <Th>Name</Th>
            <Th>Class</Th>
            <Th>Edit / Delete</Th>
          </Tr>
        </thead>

        <tbody>{Rows()}</tbody>
      </Table>
    </TableWrapper>
  );
};

export default Students;
