require("dotenv/config");
const express = require("express");
const router = express.Router();
const Question = require("../Models/Question");
const Student = require("../Models/Student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminAuth = require("../Middleware/AdminAuth");

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
  const { std, sub, prof, day, month, year, dur, pdf, desc } = req.body;
  if (!std || !sub || !prof || !day || !month || !year || !dur || !pdf) {
    return res.status(422).json({ err: "Fill the Required Fields!!" });
  }
  const func = async () => {
    const savedQue = await Question.findOne({ std, sub, day, month, year });
    if (savedQue) {
      return res.status(422).json({ err: "Question is already uplaoded !!" });
    }
    const que = new Question({
      std,
      sub,
      prof,
      day,
      month,
      year,
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

module.exports = router;
