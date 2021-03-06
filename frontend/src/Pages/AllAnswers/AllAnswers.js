import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../App";
import Loader from "../../Components/Loader/Loader";
import { FiAlignJustify } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import { BiBookBookmark } from "react-icons/bi";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import swal from "sweetalert";
import {
  TableWrapper,
  Table,
  Tr,
  Th,
  Td,
  TableLink,
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
    if (examName === "0" || std === "0" || sub === "0") {
      swal("Fill All the Fields", {
        buttons: false,
        timer: 1500,
      });
      return;
    }
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
      setLoading(false);
      if (res.err) {
        swal(res.err, {
          buttons: false,
          timer: 1500,
        });
      } else {
        setAnswers(res);
      }
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
              <Icon>
                <FiAlignJustify />
              </Icon>
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
              <Icon>
                <FaGraduationCap />
              </Icon>
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
              <Icon>
                <BiBookBookmark />
              </Icon>
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
                        <Td>
                          <TableLink
                            href={answer.pdf}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <BsFillFileEarmarkPdfFill />
                          </TableLink>
                        </Td>
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
