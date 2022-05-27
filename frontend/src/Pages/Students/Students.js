import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../App";
import { NavLink } from "../../Components/Link/Link";
import { BsPencilSquare } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import Loader from "../../Components/Loader/Loader";
import {
  TableWrapper,
  Table,
  Tr,
  Th,
  Td,
  TableIcon,
} from "../../Components/Table/TableStyle";
import { URL } from "../../Connections/Connection";

const Students = () => {
  const [loading, setLoading] = useState(true);
  const [user] = useContext(UserContext);

  const [students, setStudents] = useState([]);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const func = async () => {
      setLoading(true);
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
      setLoading(false);
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
            <NavLink to={`/allstudents/${student._id}`}>
              <TableIcon>
                <BsPencilSquare />
              </TableIcon>
            </NavLink>
            <TableIcon style={{ cursor: "pointer" }}>
              <FaTrashAlt onClick={() => handleClick(student._id)}>
                Delete
              </FaTrashAlt>
            </TableIcon>
          </Td>
        </Tr>
      );
    });
  };

  if (user.name) {
    return <Redirect to="/admin/login" />;
  } else {
    if (loading) {
      return <Loader />;
    } else {
      return (
        <TableWrapper>
          <Table>
            <thead>
              <Tr style={{ backgroundColor: "#121b29" }}>
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
    }
  }
};

export default Students;
