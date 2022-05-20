import React, { useState } from "react";
import { URL } from "../../Connections/Connection";
import {
  FormWrapper,
  InputField,
  InputContainer,
  Icon,
  Button,
  Dropdown,
} from "../../Components/Form/FormStyle";

const Upload = () => {
  const [std, setStd] = useState("");
  const [sub, setSub] = useState("");
  const [prof, setProf] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [dur, setDur] = useState();
  const [que, setQue] = useState("");
  const [pdf, setPdf] = useState("");

  const handleClick = async () => {
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
      if (res.err) {
        console.log(res.err);
      } else {
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FormWrapper>
      <h2>Upload Question</h2>

      <InputContainer>
        <Icon className="fa fa-envelope icon"></Icon>
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
        <Icon className="fa fa-envelope icon"></Icon>
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
        <Icon className="fa fa-envelope icon"></Icon>
        <InputField
          type="date"
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
      </InputContainer>

      <InputContainer>
        <Icon className="fa fa-envelope icon"></Icon>
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
        <Icon className="fa fa-user icon"></Icon>
        <InputField
          type="file"
          placeholder="Question(in pdf)"
          onChange={(e) => {
            setQue(e.target.files[0]);
          }}
        />
      </InputContainer>

      <InputContainer>
        <Icon className="fa fa-user icon"></Icon>
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
};

export default Upload;
