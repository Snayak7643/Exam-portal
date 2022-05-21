const express = require("express");
const cors = require("cors");
require("dotenv/config");

const App = express();

//defining port
const PORT = process.env.PORT || 3300;

//listening to the server
App.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});

//connecting to DB
const DB_Connection = require("./Utils/DB_Connection");
DB_Connection();

//middlewares
App.use(express.json());
App.use(cors());
//type of cors incase cors doesnot work
App.use((req, res, next) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  next();
});
const Admin = require("./Routes/Admin");
const StudentRoute = require("./Routes/Student");
App.use(Admin);
App.use(StudentRoute);
