import React, { useState, useContext } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { UserContext } from "../../App";
import { URL } from "../../Connections/Connection";
import Loader from "../../Components/Loader/Loader";
import swal from "sweetalert";
import {
  BsFillCalendar2Fill,
  BsFillFileEarmarkPdfFill,
  BsFillChatRightFill,
} from "react-icons/bs";
import { FiAlignJustify } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import { BiBookBookmark, BiTime } from "react-icons/bi";
import {
  FormWrapper,
  InputField,
  InputContainer,
  Icon,
  Button,
  Dropdown,
} from "../../Components/Form/FormStyle";

const Upload = () => {
  const [user] = useContext(UserContext);

  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [examName, setExamName] = useState("");
  const [std, setStd] = useState("");
  const [sub, setSub] = useState("");
  const [prof, setProf] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [dur, setDur] = useState();
  const [que, setQue] = useState("");
  const [pdf, setPdf] = useState("");

  const handleClick = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("file", que);
    data.append("upload_preset", "exam-portal");
    data.append("cloud_name", "multiverse");
    try {
      const Details = await fetch(
        "https://api.cloudinary.com/v1_1/multiverse/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const PostDetails = await Details.json();

      setPdf(PostDetails.url);
      console.log(pdf);

      const response = await fetch(URL + "/upload", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          examName,
          std,
          sub,
          prof,
          date,
          dur,
          pdf: PostDetails.url,
          desc,
        }),
      });

      const res = await response.json();
      setLoading(false);
      if (res.message) {
        swal(res.message, {
          buttons: false,
          timer: 1500,
        });
        history.push("/");
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

  if (user.name) {
    return <Redirect to="/admin/login" />;
  } else {
    if (loading) {
      return <Loader />;
    } else {
      return (
        <FormWrapper>
          <h2>Upload Question</h2>

          <InputContainer>
            <Icon>
              <FiAlignJustify />
            </Icon>
            <Dropdown
              onChange={(e) => {
                setExamName(e.target.value);
              }}
            >
              <option value="0">Exam Name</option>
              <option value="Mid-Term">Mid-Term</option>
              <option value="End-Term">End-Term</option>
            </Dropdown>
          </InputContainer>

          <InputContainer>
            <Icon>
              <FaGraduationCap />
            </Icon>
            <Dropdown
              onChange={(e) => {
                setStd(e.target.value);
              }}
            >
              <option value="0">Class</option>
              <option value="VII">VII</option>
              <option value="VIII">VIII</option>
              <option value="IX">IX</option>
            </Dropdown>
          </InputContainer>

          <InputContainer>
            <Icon className="fa fa-user icon"></Icon>
            <InputField
              type="text"
              placeholder="Teacher's Name"
              onChange={(e) => {
                setProf(e.target.value);
              }}
            />
          </InputContainer>

          <InputContainer>
            <Icon>
              <BiBookBookmark />
            </Icon>
            <Dropdown
              onChange={(e) => {
                setSub(e.target.value);
              }}
            >
              <option value="0">Subject</option>
              <option value="Maths">Maths</option>
              <option value="English">English</option>
              <option value="Science">Science</option>
            </Dropdown>
          </InputContainer>

          <InputContainer>
            <Icon>
              <BsFillCalendar2Fill />
            </Icon>
            <InputField
              type="date"
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </InputContainer>

          <InputContainer>
            <Icon>
              <BiTime />
            </Icon>
            <Dropdown
              onChange={(e) => {
                setDur(e.target.value);
              }}
            >
              <option value="0">Duration(in hrs)</option>
              <option value="3">3</option>
            </Dropdown>
          </InputContainer>

          <InputContainer>
            <Icon>
              <BsFillFileEarmarkPdfFill />
            </Icon>
            <InputField
              type="file"
              placeholder="Question(in pdf)"
              onChange={(e) => {
                setQue(e.target.files[0]);
              }}
            />
          </InputContainer>

          <InputContainer>
            <Icon>
              <BsFillChatRightFill />
            </Icon>
            <InputField
              type="text"
              placeholder="Any Description"
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
          </InputContainer>

          <Button onClick={handleClick}>Uplaod</Button>
        </FormWrapper>
      );
    }
  }
};

export default Upload;
