import React, { useState, useContext } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { UserContext } from "../../App";
import { URL } from "../../Connections/Connection";
import Loader from "../../Components/Loader/Loader";
import { BsFillCalendar2Fill } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa";
import { BiBookBookmark, BiRegistered } from "react-icons/bi";
import swal from "sweetalert";
import {
  FormWrapper,
  InputField,
  InputContainer,
  Icon,
  Button,
  Dropdown,
  Divider,
} from "../../Components/Form/FormStyle";

const Enroll = () => {
  const [user] = useContext(UserContext);

  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [reg, setReg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [std, setStd] = useState("");
  const [password, setPassword] = useState("");
  const [sub1, setSub1] = useState("");
  const [sub2, setSub2] = useState("");
  const [sub3, setSub3] = useState("");
  const [dob, setDob] = useState("");

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await fetch(URL + "/enroll", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          reg_no: reg,
          name,
          std,
          email,
          password,
          dob,
          subjects: [sub1, sub2, sub3],
        }),
      });

      const res = await response.json();
      setLoading(false);
      if (res.message) {
        swal(res.message, {
          buttons: false,
          timer: 1500,
        });
        history.push("/allstudents");
      } else if (res.err) {
        swal(res.err, {
          buttons: false,
          timer: 1500,
        });
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
        <FormWrapper>
          <h2>Enroll Form</h2>
          <InputContainer>
            <Icon className="fa fa-user icon"></Icon>
            <InputField
              type="text"
              placeholder="Enter Name"
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
              type="text"
              placeholder="Enter Registration No."
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
              type="date"
              onChange={(e) => {
                setDob(e.target.value);
              }}
            />
          </InputContainer>

          <InputContainer>
            <Icon className="fa fa-envelope icon"></Icon>
            <InputField
              type="text"
              placeholder="Enter Email"
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
              onChange={(e) => {
                setStd(e.target.value);
              }}
            >
              <option value="0">Class:</option>
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
              onChange={(e) => {
                setSub1(e.target.value);
              }}
            >
              <option value="0">Sub 1:</option>
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
              onChange={(e) => {
                setSub2(e.target.value);
              }}
            >
              <option value="0">Sub 2:</option>
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
              onChange={(e) => {
                setSub3(e.target.value);
              }}
            >
              <option value="0">Sub 3:</option>
              <option value="Maths">Maths</option>
              <option value="English">English</option>
              <option value="Science">Science</option>
            </Dropdown>
          </InputContainer>

          <InputContainer>
            <Icon className="fa fa-key icon"></Icon>
            <InputField
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </InputContainer>

          <Button onClick={handleClick}>Enroll</Button>
        </FormWrapper>
      );
    }
  }
};

export default Enroll;
