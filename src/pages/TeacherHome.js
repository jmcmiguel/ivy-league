import React from "react";
import { CssBaseline, Container, Box } from "@material-ui/core";
import useStylesTeacherHome from "../components/styles/useStylesTeacherHome";
import HomeDrawer from "../components/HomeDrawer";
import HomeAppBar from "../components/HomeAppBar";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import DashboardTeacher from "../components/DashboardTeacher.js";
import ExamTeacher from "../components/ExamTeacher";
import StudentsTeacher from "../components/StudentsTeacher";
import AccountTeacher from "../components/AccountTeacher";
import Copyright from "../components/Copyright";

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
          {/* React Router */}
          <Switch>
            <Route path={`${match.path}`} exact component={DashboardTeacher} />
            <Route path={`${match.path}/exams`} exact component={ExamTeacher} />
            <Route
              path={`${match.path}/students`}
              exact
              component={StudentsTeacher}
            />
            <Route
              path={`${match.path}/account`}
              exact
              component={AccountTeacher}
            />
          </Switch>

          <Box pt={8}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
};

export default TeacherHome;
