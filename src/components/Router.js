import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import Student from "../pages/Student";
import Teacher from "../pages/Teacher";
import SignIn from "../pages/SignIn";
import Error404 from "../pages/Error404";
import SignUp from "../pages/SignUp";
import TeacherHome from "../pages/TeacherHome";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/student" exact component={Student} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/teacher" exact component={Teacher} />
        <Route path="/teacherhome" exact component={TeacherHome} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/" component={Error404} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
