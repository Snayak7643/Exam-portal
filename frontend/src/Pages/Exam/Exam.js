import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../App";
import { Link, useHistory } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import swal from "sweetalert";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import {
  TableWrapper,
  Table,
  Tr,
  Th,
  Td,
} from "../../Components/Table/TableStyle";
import { URL } from "../../Connections/Connection";

const Exam = () => {
  const [loading, setLoading] = useState(true);

  const [user] = useContext(UserContext);

  const history = useHistory();

  const [que, setQue] = useState({});
  const [pdf, setPdf] = useState(""); //choosen file

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await fetch(URL + "/exam", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          pdf,
          que,
        }),
      });

      const res = await response.json();
      console.log(res);
      setLoading(false);
      if (res.message) {
        swal(res.message, {
          buttons: false,
          timer: 1500,
        });
        history.push("/uploadedanswers");
      } else if (res.err) {
        swal(res.err, {
          buttons: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const func = async () => {
      setLoading(true);
      const response = await fetch(URL + "/exam", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + localStorage.getItem("jwt"),
        },
      });

      const res = await response.json();
      if (res.length !== 0) {
        setQue(res[0]);
      }
      console.log(res);
      setLoading(false);
    };
    func();
  }, [user]);

  if (user.name) {
    console.log("render..");
    if (loading) {
      return <Loader />;
    } else {
      return (
        <TableWrapper>
          {Object.keys(que).length !== 0 ? (
            <Table>
              <thead>
                <Tr>
                  <Th>Subject</Th>
                  <Th>Question</Th>
                  <Th>Choose File</Th>
                  <Th>Uploaded File</Th>
                </Tr>
              </thead>
              <tbody>
                <Tr>
                  <Td>{que.sub}</Td>
                  <Td>
                    <a href={que.pdf} target="_blank" rel="noreferrer">
                      <BsFillFileEarmarkPdfFill />
                    </a>
                  </Td>
                  <Td>
                    <input
                      type="text"
                      placeholder="answer"
                      onChange={(e) => {
                        setPdf(e.target.value);
                      }}
                    />
                    <button onClick={handleClick}>Submit</button>
                  </Td>
                  <Td>
                    <Link to="/uploadedanswers">Check</Link>
                  </Td>
                </Tr>
              </tbody>
            </Table>
          ) : (
            <h4>No Exams for Now</h4>
          )}
        </TableWrapper>
      );
    }
  } else {
    console.log(user, "rediect");
    return <Redirect to="/student/login" />;
  }
};

export default Exam;
