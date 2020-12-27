import React from "react";
import { CssBaseline, Container, Hidden } from "@material-ui/core";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import useStylesTeacherHome from "../components/styles/useStylesTeacherHome";
import HomeDrawer from "../components/HomeDrawer";
import HomeAppBar from "../components/HomeAppBar";
import ExamTeacher from "../components/ExamTeacher";
import StudentsTeacher from "../components/StudentsTeacher";
import CreateExam from "../pages/CreateExam";
import BottomNav from "../components/TeacherBottomNav";
import DashboardTeacher from "../components/DashboardTeacher";

const TeacherHome = () => {
  let match = useRouteMatch();
  const classes = useStylesTeacherHome();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <HomeAppBar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        name={localStorage.getItem("lastName")}
      />

      <HomeDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        match={match}
      />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Hidden mdUp>
          <BottomNav match={match} />
        </Hidden>
        <Container maxWidth="lg" className={classes.container}>
          {/* React Router */}
          <Switch>
            <Route path={`${match.path}`} exact component={DashboardTeacher} />
            <Route path={`${match.path}/exams`} exact>
              <ExamTeacher match={match} />
            </Route>
            <Route
              path={`${match.path}/students`}
              exact
              component={StudentsTeacher}
            />
            <Route
              path={`${match.path}/createexam`}
              exact
              component={CreateExam}
            />
          </Switch>
        </Container>
        {/* <Box pt={8}>
          <Copyright />
        </Box> */}
      </main>
    </div>
  );
};

export default TeacherHome;
