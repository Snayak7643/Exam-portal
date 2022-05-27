import React, { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import AdminLogIn from "./Pages/AdminLogIn/AdminLogIn";
import StudentLogIn from "./Pages/StudentLogIn/StudentLogIn";
import Exam from "./Pages/Exam/Exam";
import Enroll from "./Pages/Enroll/Enroll";
import Upload from "./Pages/Upload/Upload";
import Students from "./Pages/Students/Students";
import UploadedAnswers from "./Pages/UploadedAnswers/UploadedAnswers";
import AllAnswers from "./Pages/AllAnswers/AllAnswers";
import StudentDetail from "./Pages/StudentDetail/StudentDetail";
import Navbar from "./Components/Navbar";

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();

  const [user, setUser] = useContext(UserContext);

  //for restoring the data after refresh
  useEffect(() => {
    if (localStorage.getItem("data") && Object.keys(user).length === 0) {
      const func = async () => {
        const data = await JSON.parse(localStorage.getItem("data"));
        console.log(data, "reload");
        setUser(data);
      };
      func();
    }
  }, [user, setUser]);

  //for checking authentication
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    if (!data) {
      history.push("/admin/login");
    }
  }, [user, setUser, history]);

  return (
    <Switch>
      <Route exact path="/">
        <h1>Home</h1>
      </Route>
      <Route path="/admin/login">
        <AdminLogIn />
      </Route>
      <Route path="/student/login">
        <StudentLogIn />
      </Route>
      <Route path="/exam">
        <Exam />
      </Route>
      <Route path="/enroll">
        <Enroll />
      </Route>
      <Route path="/upload">
        <Upload />
      </Route>
      <Route exact path="/allstudents">
        <Students />
      </Route>
      <Route path="/uploadedanswers">
        <UploadedAnswers />
      </Route>
      <Route path="/allanswers">
        <AllAnswers />
      </Route>
      <Route path="/allstudents/:id">
        <StudentDetail />
      </Route>
    </Switch>
  );
};

function App() {
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={[user, setUser]}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
