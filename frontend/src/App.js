import React, { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import AdminLogIn from "./Pages/AdminLogIn/AdminLogIn";
import StudentLogIn from "./Pages/StudentLogIn/StudentLogIn";
import Exam from "./Pages/Exam/Exam";
import Enroll from "./Pages/Enroll/Enroll";
import Navbar from "./Components/Navbar";

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();

  const [user, setUser] = useContext(UserContext);

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
