import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { URL } from "../../Connections/Connection";
import Loader from "../../Components/Loader/Loader";
import { BsFillCalendar2Fill } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa";
import { BiBookBookmark, BiRegistered } from "react-icons/bi";
import {
  FormWrapper,
  InputField,
  InputContainer,
  Icon,
  Button,
  Dropdown,
  Divider,
} from "../../Components/Form/FormStyle";

const StudentDetail = (props) => {
  let { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [student, setStudent] = useState({});
  const [reg, setReg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [std, setStd] = useState("");
  const [sub1, setSub1] = useState("");
  const [sub2, setSub2] = useState("");
  const [sub3, setSub3] = useState("");
  const [dob, setDob] = useState("");

  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    const func = async () => {
      const response = await fetch(URL + "/studentdetails", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({ _id: id }),
      });

      const res = await response.json();
      setStudent(res);
      setReg(res.reg_no);
      setName(res.name);
      setEmail(res.email);
      setStd(res.std);
      setSub1(res.subjects[0]);
      setSub2(res.subjects[1]);
      setSub3(res.subjects[2]);
      setDob(res.dob);
      console.log(res);

      setLoading(false);
    };
    func();
  }, [id]);

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await fetch(URL + "/updatestudent", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          _id: id,
          reg_no: reg,
          name,
          std,
          email,
          password: student.password,
          dob,
          subjects: [sub1, sub2, sub3],
        }),
      });

      const res = await response.json();
      console.log(res);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
    history.push("/allstudents");
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <FormWrapper>
        <h2>Update Student</h2>
        <InputContainer>
          <Icon className="fa fa-user icon"></Icon>
          <InputField
            style={{ backgroundColor: "wheat" }}
            type="text"
            value={name ? name : ""}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </InputContainer>

        <InputContainer>
          <Icon>
            <BiRegistered />
          </Icon>
          <InputField
            style={{ backgroundColor: "wheat" }}
            type="text"
            value={reg ? reg : ""}
            onChange={(e) => {
              setReg(e.target.value);
            }}
          />
        </InputContainer>

        <InputContainer>
          <Icon>
            <BsFillCalendar2Fill />
          </Icon>
          <InputField
            style={{ backgroundColor: "wheat" }}
            type="date"
            value={dob ? dob : "dd-mm-yyyy"}
            onChange={(e) => {
              setDob(e.target.value);
            }}
          />
        </InputContainer>

        <InputContainer>
          <Icon className="fa fa-envelope icon"></Icon>
          <InputField
            style={{ backgroundColor: "wheat" }}
            type="text"
            value={email ? email : ""}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </InputContainer>

        <InputContainer>
          <Icon>
            <FaGraduationCap />
          </Icon>
          <Dropdown
            style={{ backgroundColor: "wheat" }}
            value={std ? std : "Class"}
            onChange={(e) => {
              setStd(e.target.value);
            }}
          >
            <option value="VII">VII</option>
            <option value="VIII">VIII</option>
            <option value="IX">IX</option>
          </Dropdown>
        </InputContainer>

        <Divider />

        <InputContainer>
          <h4>Subjects</h4>
        </InputContainer>

        <InputContainer>
          <Icon>
            <BiBookBookmark />
          </Icon>
          <Dropdown
            style={{ backgroundColor: "wheat" }}
            value={sub1 ? sub1 : "Sub1"}
            onChange={(e) => {
              setSub1(e.target.value);
            }}
          >
            <option value="Maths">Maths</option>
            <option value="English">English</option>
            <option value="Science">Science</option>
          </Dropdown>
        </InputContainer>
        <InputContainer>
          <Icon>
            <BiBookBookmark />
          </Icon>
          <Dropdown
            style={{ backgroundColor: "wheat" }}
            value={sub2 ? sub2 : "Sub2"}
            onChange={(e) => {
              setSub2(e.target.value);
            }}
          >
            <option value="Maths">Maths</option>
            <option value="English">English</option>
            <option value="Science">Science</option>
          </Dropdown>
        </InputContainer>
        <InputContainer>
          <Icon>
            <BiBookBookmark />
          </Icon>
          <Dropdown
            style={{ backgroundColor: "wheat" }}
            value={sub3 ? sub3 : "Sub3"}
            onChange={(e) => {
              setSub3(e.target.value);
            }}
          >
            <option value="Maths">Maths</option>
            <option value="English">English</option>
            <option value="Science">Science</option>
          </Dropdown>
        </InputContainer>

        <Button onClick={handleClick}>Enroll</Button>
      </FormWrapper>
    );
  }
};

export default StudentDetail;
