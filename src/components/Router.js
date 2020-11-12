import React from "react";
import { MemoryRouter, Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import Student from "../pages/Student";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import TeacherHome from "../pages/TeacherHome";
import ForgotPassword from "../pages/ForgotPassword";
import Error404 from "../pages/Error404";

const Router = () => {
  return (
    <MemoryRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/forgotpassword" component={ForgotPassword} />
        <Route path="/student" component={Student} />
        <Route path="/teacher" component={TeacherHome} />
        <Route path="" component={Error404} />
      </Switch>
    </MemoryRouter>
  );
};

export default Router;
