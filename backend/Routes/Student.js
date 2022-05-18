const express = require("express");
const router = express.Router();
const Student = require("../Models/Student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

module.exports = router;
