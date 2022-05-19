import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <li>
        <Link to="/admin/login">admin</Link>
      </li>
      <li>
        <Link to="/student/login">student</Link>
      </li>
      <li>
        <Link to="/">home</Link>
      </li>
    </div>
  );
};

export default Navbar;
