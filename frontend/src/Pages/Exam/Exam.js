import React, { useState, useEffect } from "react";
import { URL } from "../../Connections/Connection";

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();
today = yyyy + "-" + mm + "-" + dd;

const Exam = () => {
  const [que, setQue] = useState("");
  const data = JSON.parse(localStorage.getItem("data"));

  useEffect(() => {
    console.log(today, data.std);
    const func = async () => {
      const response = await fetch(URL + "/exam", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          std: data.std,
          date: today,
        }),
      });

      const res = await response.json();
      setQue(res[0].pdf);
      console.log(res[0].pdf);
    };
    func();
  }, [data.std]);

  console.log(today);
  return (
    <div>
      <h1>Exam</h1>
      <a href={que}>Que</a>
    </div>
  );
};

export default Exam;
