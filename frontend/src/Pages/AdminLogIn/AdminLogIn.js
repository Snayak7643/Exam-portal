import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { URL } from "../../Connections/Connection";
import { UserContext } from "../../App";
import Loader from "../../Components/Loader/Loader";
import swal from "sweetalert";
import {
  CardWrapper,
  CardIcon,
  CardHeader,
  CardHeading,
  CardBody,
  CardFieldset,
  CardInput,
  CardButton,
} from "./AdminLogInStyle";

const AdminLogIn = () => {
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useContext(UserContext);

  const history = useHistory();

  const handleClick = async () => {
    setLoading(true);
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

    if (res.message) {
      swal("Welcome " + res.data, {
        buttons: false,
        timer: 1500,
      });
      localStorage.setItem("jwt", res.token);
      localStorage.setItem("data", JSON.stringify({ data: res.data }));
      setUser({ data: res.data });
      console.log(user, "admin");
      history.push("/");
    } else {
      swal(res.err, {
        buttons: false,
        timer: 1500,
      });
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
  }
};

export default AdminLogIn;
