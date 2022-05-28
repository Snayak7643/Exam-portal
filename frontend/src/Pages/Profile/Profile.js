import React, { useContext } from "react";
import { UserContext } from "../../App";
import {
  CardWrapper,
  CardIcon,
  CardHeader,
  CardHeading,
  CardBody,
} from "../AdminLogIn/AdminLogInStyle";

const Profile = () => {
  const [user] = useContext(UserContext);

  return (
    <CardWrapper>
      <CardHeader>
        <CardIcon />
        <CardHeading>Profile</CardHeading>
        <hr></hr>
      </CardHeader>

      <CardBody style={{ textAlign: "center" }}>
        <h4>Name: {user.name ? user.name : ""}</h4>
        <h4>Reg no.: {user.name ? user.reg_no : ""}</h4>
        <h4>Email: {user.name ? user.email : ""}</h4>
        <h4>Std: {user.name ? user.std : ""}</h4>
        <h4>D.O.B.: {user.name ? user.dob : ""}</h4>
      </CardBody>
    </CardWrapper>
  );
};

export default Profile;
