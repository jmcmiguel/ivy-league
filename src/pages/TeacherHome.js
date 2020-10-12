import React from "react";
import { CssBaseline, Container } from "@material-ui/core";
import useStylesTeacherHome from "../components/styles/useStylesTeacherHome";
import HomeDrawer from "../components/HomeDrawer";
import HomeAppBar from "../components/HomeAppBar";
import SubjectsTeacher from "../components/SubjectsTeacher.js";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import DashboardTeacher from "../components/DashboardTeacher.js";
import ExamTeacher from "../components/ExamTeacher";

const TeacherHome = () => {
  let match = useRouteMatch();
  const classes = useStylesTeacherHome();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <HomeAppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <HomeDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        match={match}
      />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Switch>
            <Route path={`${match.path}`} exact component={DashboardTeacher} />
            <Route
              path={`${match.path}/subjects`}
              exact
              component={SubjectsTeacher}
            />
            <Route path={`${match.path}/exams`} exact component={ExamTeacher} />
          </Switch>
        </Container>
      </main>
    </div>
  );
};

export default TeacherHome;
