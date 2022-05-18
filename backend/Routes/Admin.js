const express = require("express");
const router = express.Router();

//router for upload
router.post("/upload", (req, res) => {
  const { std, prof, date, st_time, en_time, dur, pdf, desc } = req.body;
  if (!std || !prof || !date || !st_time || !en_time || !dur || !pdf || !desc) {
    return res.status(422).json({ err: "All the fields are Required!!" });
  }
  res.json({ message: "File Uploaded Successfully" });
});

module.exports = router;
