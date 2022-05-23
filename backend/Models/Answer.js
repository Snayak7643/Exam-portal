const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const Answer = new mongoose.Schema({
  reg_no: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  sub: {
    type: String,
    required: true,
  },
  std: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  student: {
    type: ObjectId,
    ref: "Student",
  },
  question: {
    type: ObjectId,
    ref: "Question",
  },
  pdf: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Answer", Answer);
