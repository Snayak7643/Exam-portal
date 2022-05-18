const mongoose = require("mongoose");

const Student = new mongoose.Schema({
  reg_no: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  std: {
    type: String,
    required: true,
  },
  subjects: [
    {
      type: String,
    },
  ],
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Student", Student);
