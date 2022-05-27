import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../App";
import Loader from "../../Components/Loader/Loader";
import {
  TableWrapper,
  Table,
  Tr,
  Th,
  Td,
} from "../../Components/Table/TableStyle";
import { URL } from "../../Connections/Connection";

const UploadedAnswers = () => {
  const [loading, setLoading] = useState(true);

  const [user] = useContext(UserContext);

  const [ans, setAns] = useState([]);

  useEffect(() => {
    const func = async () => {
      setLoading(true);
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
      setLoading(false);
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

  if (user.name) {
    if (loading) {
      return <Loader />;
    } else {
      return (
        <TableWrapper>
          <Table>
            <thead>
              <Tr style={{ backgroundColor: "#121b29" }}>
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
    }
  } else {
    return <Redirect to="/student/login" />;
  }
};

export default UploadedAnswers;
