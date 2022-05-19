require("dotenv/config");
const Student = require("../Models/Student");
const jwt = require("jsonwebtoken");

const StudentAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(402).json({ err: "You are not Logged In!!" });
  }
  const token = authorization.replace("Bearer", "");

  jwt.verify(token, process.env.JWT_SECRET_STUDENT, (err, decode) => {
    if (err) {
      return res.status(402).json({ err });
    }
    Student.findOne({ reg_no: decode.reg_no }).then((student) => {
      req.data = student;
      next();
    });
  });
};

module.exports = StudentAuth;
