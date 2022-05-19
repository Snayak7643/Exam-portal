import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { URL } from "../../Connections/Connection";
import { UserContext } from "../../App";
import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardBody,
  CardFieldset,
  CardInput,
  CardButton,
} from "./AdminLogInStyle";

const AdminLogIn = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useContext(UserContext);

  const history = useHistory();

  const handleClick = async () => {
    const response = await fetch(URL + "/admin/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        password,
      }),
    });

    const res = await response.json();
    console.log(res);

    if (res.message) {
      localStorage.setItem("jwt", res.token);
      localStorage.setItem("data", JSON.stringify(res.data));
      setUser(res.data);
      console.log(user, "admin");
      history.push("/");
    }
  };

  return (
    <CardWrapper>
      <CardHeader>
        <CardHeading>Admin Log In</CardHeading>
      </CardHeader>

      <CardBody>
        <CardFieldset>
          <CardInput
            placeholder="User-Id"
            type="text"
            required
            onChange={(e) => {
              setId(e.target.value);
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
};

export default AdminLogIn;
