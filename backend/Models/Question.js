const mongoose = require("mongoose");

const Question = new mongoose.Schema({
  std: {
    type: String,
    required: true,
  },
  sub: {
    type: String,
    required: true,
  },
  prof: {
    type: String,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  dur: {
    type: Number,
    required: true,
  },
  pdf: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    default: "All the Best",
  },
});

module.exports = mongoose.model("Question", Question);
