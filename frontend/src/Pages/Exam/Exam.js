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
  TableLink,
} from "../../Components/Table/TableStyle";
import { URL } from "../../Connections/Connection";

const DateToday = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;
  return today;
};

const Exam = () => {
  const [loading, setLoading] = useState(false);

  const [user] = useContext(UserContext);

  const history = useHistory();

  const [que, setQue] = useState({});
  const [pdf, setPdf] = useState(""); //choosen file
  const [anslink, setAnslink] = useState("");

  const handleClick = async () => {
    const time = new Date();
    const hr = time.getHours();
    const min = time.getMinutes();
    console.log(hr + ":" + min);

    //handling the time for the exam
    if (hr < 8 || hr > 12) {
      swal("Sorry, Time's Up", {
        buttons: false,
        timer: 1500,
      });
      history.push("/uploadedanswers");
      return;
    } else if ((hr === 8 && min < 0) || (hr === 12 && min > 5)) {
      swal("Sorry, Time's Up", {
        buttons: false,
        timer: 1500,
      });
      history.push("/uploadedanswers");
      return;
    }
    try {
      if (!pdf) {
        swal("Select A File", {
          buttons: false,
          timer: 1500,
        });
        return;
      }
      setLoading(true);
      const data = new FormData();
      data.append("file", pdf);
      data.append("upload_preset", "exam-portal");
      data.append("cloud_name", "multiverse");
      const Details = await fetch(
        "https://api.cloudinary.com/v1_1/multiverse/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const PostDetails = await Details.json();

      setAnslink(PostDetails.url);
      console.log(PostDetails.url);

      const response = await fetch(URL + "/exam", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          pdf: PostDetails.url,
          que,
        }),
      });

      console.log("ans ", anslink);

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
      const time = new Date();
      const hr = time.getHours();
      const min = time.getMinutes();
      console.log(hr + ":" + min);

      //handling the time for the exam
      if (hr < 8 || hr > 12) {
        return;
      } else if ((hr === 8 && min < 0) || (hr === 12 && min > 5)) {
        return;
      }

      setLoading(true);
      const date = DateToday();
      const response = await fetch(URL + "/examque", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          date,
        }),
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
                    <TableLink href={que.pdf} target="_blank" rel="noreferrer">
                      <BsFillFileEarmarkPdfFill />
                    </TableLink>
                  </Td>
                  <Td>
                    <input
                      type="file"
                      accept="image/*"
                      placeholder="answer"
                      onChange={(e) => {
                        setPdf(e.target.files[0]);
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
