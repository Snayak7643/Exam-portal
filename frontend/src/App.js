import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdminLogIn from "./Pages/AdminLogIn/AdminLogIn";
import StudentLogIn from "./Pages/StudentLogIn/StudentLogIn";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
