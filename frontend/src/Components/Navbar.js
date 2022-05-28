import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import { useHistory } from "react-router-dom";
import { Nav, NavLink, NavMenu, NavIcon } from "./NavbarStyle";
import swal from "sweetalert";
import { FiList, FiChevronsUp } from "react-icons/fi";

const Navbar = () => {
  const [user, setUser] = useContext(UserContext);

  const history = useHistory();

  const [show, setShow] = useState(0);

  const handleClick = () => {
    setShow(!show);
  };

  const Navigation = () => {
    if (Object.keys(user).length !== 0) {
      if (user.name) {
        return [
          <NavLink key="profile" to="/profile" onClick={handleClick}>
            Profile
          </NavLink>,
          <NavLink key="exam" to="/exam" onClick={handleClick}>
            Exam
          </NavLink>,
          <NavLink
            key="uploadedanswers"
            to="/uploadedanswers"
            onClick={handleClick}
          >
            Upload-Answers
          </NavLink>,
          <NavLink
            key="studentlogout"
            to="/student/login"
            onClick={() => {
              swal("Logged Out Successfully", {
                buttons: false,
                timer: 1500,
              });
              localStorage.clear();
              setUser({});
              history.push("/student/login");
              handleClick();
            }}
          >
            LogOut
          </NavLink>,
        ];
      } else {
        return [
          <NavLink key="enroll" to="/enroll" onClick={handleClick}>
            Enroll
          </NavLink>,
          <NavLink key="upload" to="/upload" onClick={handleClick}>
            Upload
          </NavLink>,
          <NavLink key="allstudents" to="/allstudents" onClick={handleClick}>
            All-Students
          </NavLink>,
          <NavLink key="allanswers" to="/allanswers" onClick={handleClick}>
            Check-Answers
          </NavLink>,
          <NavLink
            key="adminlogout"
            to="/student/login"
            onClick={() => {
              swal("Logged Out Successfully", {
                buttons: false,
                timer: 1500,
              });
              localStorage.clear();
              setUser({});
              history.push("/student/login");
              handleClick();
            }}
          >
            LogOut
          </NavLink>,
        ];
      }
    } else {
      return [
        <NavLink key="adminlogin" to="/admin/login" onClick={handleClick}>
          admin
        </NavLink>,
        <NavLink key="studentlogin" to="/student/login" onClick={handleClick}>
          student
        </NavLink>,
      ];
    }
  };

  return (
    <Nav>
      <NavIcon onClick={handleClick}>
        {show ? <FiChevronsUp /> : <FiList />}
      </NavIcon>
      <NavMenu show={show}>
        <NavLink key="home" to="/" onClick={handleClick}>
          Home
        </NavLink>
        {Navigation()}
      </NavMenu>
    </Nav>
  );
};

export default Navbar;
