import React, { useState, useContext } from "react";
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
import {
  FormWrapper,
  InputContainer,
  Icon,
  Button,
  Dropdown,
} from "../../Components/Form/FormStyle";
import { URL } from "../../Connections/Connection";

const AllAnswers = () => {
  const [loading, setLoading] = useState(false);

  const [user] = useContext(UserContext);

  const [examName, setExamName] = useState("");
  const [std, setStd] = useState("");
  const [sub, setSub] = useState("");

  const [answers, setAnswers] = useState([]);

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await fetch(URL + "/allanswers", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          examName,
          std,
          sub,
        }),
      });

      const res = await response.json();
      setAnswers(res);
      console.log(res);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  if (user.name) {
    return <Redirect to="/admin/login" />;
  } else {
    if (loading) {
      return <Loader />;
    } else {
      return (
        <TableWrapper>
          <FormWrapper>
            <InputContainer>
              <Icon className="fa fa-envelope icon"></Icon>
              <Dropdown
                onChange={(e) => {
                  setExamName(e.target.value);
                }}
              >
                <option value="0">Exam Name</option>
                <option value="Mid-Term">Mid-Term</option>
                <option value="End-Term">End-Term</option>
              </Dropdown>
            </InputContainer>

            <InputContainer>
              <Icon className="fa fa-envelope icon"></Icon>
              <Dropdown
                onChange={(e) => {
                  setStd(e.target.value);
                }}
              >
                <option value="0">Class</option>
                <option value="VII">VII</option>
                <option value="VIII">VIII</option>
                <option value="IX">IX</option>
              </Dropdown>
            </InputContainer>

            <InputContainer>
              <Icon className="fa fa-envelope icon"></Icon>
              <Dropdown
                onChange={(e) => {
                  setSub(e.target.value);
                }}
              >
                <option value="0">Subject</option>
                <option value="Maths">Maths</option>
                <option value="English">English</option>
                <option value="Science">Science</option>
              </Dropdown>
            </InputContainer>

            <Button onClick={handleClick}>Submit</Button>
          </FormWrapper>

          <TableWrapper>
            <Table>
              <thead>
                <Tr style={{ backgroundColor: "#121b29" }}>
                  <Th>Reg_No</Th>
                  <Th>Name</Th>
                  <Th>Date</Th>
                  <Th>Uploaded-File</Th>
                </Tr>
              </thead>

              <tbody>
                {answers.length !== 0 ? (
                  answers.map((answer, i) => {
                    return (
                      <Tr key={i}>
                        <Td>{answer.reg_no}</Td>
                        <Td>{answer.name}</Td>
                        <Td>{answer.date}</Td>
                        <Td>{answer.pdf}</Td>
                      </Tr>
                    );
                  })
                ) : (
                  <Tr>
                    <Td>No Uploaded Files</Td>
                  </Tr>
                )}
              </tbody>
            </Table>
          </TableWrapper>
        </TableWrapper>
      );
    }
  }
};

export default AllAnswers;
