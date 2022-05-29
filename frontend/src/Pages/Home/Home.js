import React from "react";
import { HomeIcon } from "./HomeStyle";
import { FaBook } from "react-icons/fa";

const Home = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <HomeIcon>
        <FaBook />
        <p>Exam-Portal</p>
      </HomeIcon>
      <h2>Timing of Exam :- 8:00 AM - 12:00PM</h2>
      <p>(For All the Exams)</p>
    </div>
  );
};

export default Home;
