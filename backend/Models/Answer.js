const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const Answer = new mongoose.Schema({
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
