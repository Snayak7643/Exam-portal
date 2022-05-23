require("dotenv/config");
const express = require("express");
const router = express.Router();
const Question = require("../Models/Question");
const Student = require("../Models/Student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminAuth = require("../Middleware/AdminAuth");
const Answer = require("../Models/Answer");

//router for admin login
router.post("/admin/login", (req, res) => {
  const { id, password } = req.body;
  if (!id || !password) {
    return res.status(402).json({ err: "Please Fill the Credentials!!" });
  }

  const func = async () => {
    try {
      if (
        process.env.ADMIN_ID !== id ||
        process.env.ADMIN_PASSWORD !== password
      ) {
        return res.status(402).json({ err: "Inavlid UserId Or Password" });
      }
      const token = await jwt.sign({ id }, process.env.JWT_SECRET_ADMIN);
      return res.json({
        message: "Logged In Successfully",
        token,
        data: id,
      });
    } catch (err) {
      console.log({ err });
    }
  };
  func();
});

//router for upload
router.post("/upload", AdminAuth, (req, res) => {
  const { examName, std, sub, prof, date, dur, pdf, desc } = req.body;
  if (!examName || !std || !sub || !prof || !date || !dur || !pdf) {
    return res.status(422).json({ err: "Fill the Required Fields!!" });
  }
  const func = async () => {
    const savedQue = await Question.findOne({ std, sub, date });
    if (savedQue) {
      return res.status(422).json({ err: "Question is already uplaoded !!" });
    }
    const que = new Question({
      examName,
      std,
      sub,
      prof,
      date,
      dur,
      pdf,
      desc,
    });
    que
      .save()
      .then((que) => {
        return res.json({
          message: "File Uploaded Successfully",
          data: que,
        });
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  func();
});

//router for enroll
router.post("/enroll", AdminAuth, (req, res) => {
  const { reg_no, name, std, email, password, dob, subjects } = req.body;
  if (!reg_no || !name || !std || !email || !password || !dob || !subjects) {
    return res.status(402).json({ err: "All the Fiels are Requiresd" });
  }

  const func = async () => {
    const savedStudent = await Student.findOne({ reg_no });
    if (savedStudent) {
      return res.status(402).json({ err: "The Student is Already Enrolled!!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new Student({
      reg_no,
      name,
      std,
      email,
      password: hashedPassword,
      dob,
      subjects,
    });

    student
      .save()
      .then((student) => {
        return res.json({
          message: "Enrolled Successfully",
          data: student,
        });
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  func();
});

//router for all Students
router.get("/allstudents", AdminAuth, (req, res) => {
  const func = async () => {
    const students = await Student.find({});
    return res.json(students);
  };
  func();
});

//router for all Answers
router.post("/allanswers", AdminAuth, (req, res) => {
  const { examName, std, sub } = req.body;
  if (!std || !sub) {
    return res.status(422).json({ err: "Fill the Required Fields!!" });
  }
  const func = async () => {
    const answers = await Answer.find({ std, sub });
    return res.json(answers);
  };
  func();
});

//router for delete student
router.post("/deletestudent", AdminAuth, (req, res) => {
  const { _id } = req.body;
  Student.findByIdAndDelete({ _id })
    .then(function (student) {
      res.json({ message: "Deleted Successfully" });
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

//router for student details
router.post("/studentdetails", AdminAuth, (req, res) => {
  const { _id } = req.body;
  const func = async () => {
    const student = await Student.findById({ _id });
    return res.json(student);
  };
  func();
});

//router for update students
router.post("/updatestudent", AdminAuth, (req, res) => {
  const { _id, reg_no, name, std, email, password, dob, subjects } = req.body;
  if (
    !_id ||
    !reg_no ||
    !name ||
    !std ||
    !email ||
    !password ||
    !dob ||
    !subjects
  ) {
    return res.status(402).json({ err: "All the Fields are Requiresd" });
  }
  Student.findByIdAndUpdate(
    { _id },
    { $set: { reg_no, name, std, email, password, dob, subjects } }
  ).exec(function (err, student) {
    if (err) {
      return res.status(500).json({ error: err });
    } else {
      return res.json({ message: "File Updated", student });
    }
  });
});
module.exports = router;
