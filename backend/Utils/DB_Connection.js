const mongoose = require("mongoose");

const DB_Connection = () => {
  mongoose.connect(process.env.MONGO_URI);

  mongoose.connection.on("connected", () => {
    console.log("Connectedto DB");
  });

  mongoose.connection.on("err", (err) => {
    console.log(err);
  });
};

module.exports = DB_Connection;
