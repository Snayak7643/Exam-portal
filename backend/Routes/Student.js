const express = require("express");
const router = express.Router();
const Student = require("../Models/Student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const StudentAuth = require("../Middleware/StudentAuth");
const Question = require("../Models/Question");
const Answer = require("../Models/Answer");
require("dotenv/config");

//router for student login
router.post("/student/login", (req, res) => {
  const { reg_no, password } = req.body;
  if (!reg_no || !password) {
    return res.status(402).json({ err: "Please Fill the Credentials!!" });
  }

  const func = async () => {
    try {
      const student = await Student.findOne({ reg_no });
      if (!student) {
        return res.status(402).json({ err: "Inavlid UserId Or Password" });
      }
      const result = await bcrypt.compare(password, student.password);

      if (!result) {
        return res.status(402).json({ err: "Inavlid UserId Or Password" });
      }
      const token = await jwt.sign({ reg_no }, process.env.JWT_SECRET_STUDENT);
      return res.json({
        message: "Logged In Successfully",
        token,
        data: student,
      });
    } catch (err) {
      console.log({ err });
    }
  };
  func();
});

//router for question

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();
today = yyyy + "-" + mm + "-" + dd;

router.get("/exam", StudentAuth, (req, res) => {
  const data = req.data;
  const std = data.std;
  const date = today;
  if (!std || !date) {
    return res.status(422).json({ err: "Information is not sufficient" });
  }
  const func = async () => {
    const que = await Question.find({ std, date });
    return res.json(que);
  };
  func();
});

//router for postig answers
router.post("/exam", StudentAuth, (req, res) => {
  const data = req.data;
  const { pdf, que } = req.body;
  if (!pdf || !que) {
    return res.status(422).json({ err: "File Not Choosen" });
  }

  const func = async () => {
    const savedAns = await Answer.findOne({
      student: data._id,
      question: que._id,
    });
    if (savedAns) {
      Answer.findByIdAndUpdate(
        { _id: savedAns._id },
        {
          $set: {
            reg_no: data.reg_no,
            name: data.name,
            sub: que.sub,
            std: que.std,
            date: que.date,
            student: data._id,
            question: que._id,
            pdf: pdf,
          },
        }
      ).exec(function (err, ans) {
        if (err) {
          return res.status(500).json({ error: err });
        } else {
          return res.json({ message: "File Updated", ans });
        }
      });
    } else {
      const ans = new Answer({
        reg_no: data.reg_no,
        name: data.name,
        sub: que.sub,
        std: que.std,
        date: que.date,
        student: data._id,
        question: que._id,
        pdf,
      });
      ans
        .save()
        .then((ans) => {
          return res.json({
            message: "File Uploaded Successfully",
            data: ans,
          });
        })
        .catch((err) => {
          console.log({ err });
        });
    }
  };
  func();
});

//router for uploaded answers
router.get("/uploadedanswers", StudentAuth, (req, res) => {
  const student = req.data;
  const func = async () => {
    const ans = await Answer.find({ student: student._id });
    return res.json(ans);
  };
  func();
});

module.exports = router;
