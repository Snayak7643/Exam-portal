import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import { URL } from "../../Connections/Connection";
import Loader from "../../Components/Loader/Loader";
import {
  CardWrapper,
  CardHeader,
  CardIcon,
  CardHeading,
  CardBody,
  CardFieldset,
  CardInput,
  CardButton,
} from "../AdminLogIn/AdminLogInStyle";

const StudentLogIn = () => {
  const [loading, setLoading] = useState(false);

  const [reg, setReg] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useContext(UserContext);

  const history = useHistory();

  const handleClick = async () => {
    setLoading(true);
    const response = await fetch(URL + "/student/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reg_no: reg,
        password,
      }),
    });

    const res = await response.json();
    console.log(res);

    if (res.message) {
      localStorage.setItem("jwt", res.token);
      localStorage.setItem("data", JSON.stringify(res.data));
      setUser(res.data);
      console.log(user, "student");
      history.push("/");
    }
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <CardWrapper>
        <CardHeader>
          <CardIcon />
          <CardHeading>Student Log In</CardHeading>
        </CardHeader>

        <CardBody>
          <CardFieldset>
            <CardInput
              placeholder="Registration No."
              type="text"
              required
              onChange={(e) => {
                setReg(e.target.value);
              }}
            />
          </CardFieldset>

          <CardFieldset>
            <CardInput
              placeholder="Password"
              type="password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </CardFieldset>

          <CardFieldset>
            <CardButton type="button" onClick={handleClick}>
              Submit
            </CardButton>
          </CardFieldset>
        </CardBody>
      </CardWrapper>
    );
  }
};

export default StudentLogIn;
