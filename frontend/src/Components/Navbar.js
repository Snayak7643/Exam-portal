import React, { useContext } from "react";
import { UserContext } from "../App";
import { useHistory } from "react-router-dom";
import { Nav, NavLink, NavMenu } from "./NavbarStyle";

const Navbar = () => {
  const [user, setUser] = useContext(UserContext);

  const history = useHistory();

  const Navigation = () => {
    if (Object.keys(user).length !== 0) {
      if (user.name) {
        return [
          <NavLink key="exam" to="/exam">
            Exam
          </NavLink>,
          <NavLink key="uploadedanswers" to="/uploadedanswers">
            Upload-Answers
          </NavLink>,
          <NavLink
            key="studentlogout"
            to="/student/login"
            onClick={() => {
              localStorage.clear();
              setUser({});
              history.push("/student/login");
            }}
          >
            LogOut
          </NavLink>,
        ];
      } else {
        return [
          <NavLink key="enroll" to="/enroll">
            Enroll
          </NavLink>,
          <NavLink key="upload" to="/upload">
            Upload
          </NavLink>,
          <NavLink key="allstudents" to="/allstudents">
            All-Students
          </NavLink>,
          <NavLink key="allanswers" to="/allanswers">
            Check-Answers
          </NavLink>,
          <NavLink
            key="adminlogout"
            to="/student/login"
            onClick={() => {
              localStorage.clear();
              setUser({});
              history.push("/student/login");
            }}
          >
            LogOut
          </NavLink>,
        ];
      }
    } else {
      return [
        <NavLink key="adminlogin" to="/admin/login">
          admin
        </NavLink>,
        <NavLink key="studentlogin" to="/student/login">
          student
        </NavLink>,
      ];
    }
  };

  return (
    <Nav>
      <NavMenu>
        <NavLink key="home" to="/">
          Home
        </NavLink>
        {Navigation()}
      </NavMenu>
    </Nav>
  );
};

export default Navbar;
