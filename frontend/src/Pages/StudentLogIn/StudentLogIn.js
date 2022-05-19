import React from "react";
import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardBody,
  CardFieldset,
  CardInput,
  CardButton,
} from "../AdminLogIn/AdminLogInStyle";

const StudentLogIn = () => {
  return (
    <CardWrapper>
      <CardHeader>
        <CardHeading>Student Log In</CardHeading>
      </CardHeader>

      <CardBody>
        <CardFieldset>
          <CardInput placeholder="Registration No." type="text" required />
        </CardFieldset>

        <CardFieldset>
          <CardInput placeholder="Password" type="password" required />
        </CardFieldset>

        <CardFieldset>
          <CardButton type="button">Submit</CardButton>
        </CardFieldset>
      </CardBody>
    </CardWrapper>
  );
};

export default StudentLogIn;
