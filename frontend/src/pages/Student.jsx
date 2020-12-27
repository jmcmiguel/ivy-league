import React from "react";
import { CssBaseline, Container, Hidden } from "@material-ui/core";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import useStylesTeacherHome from "../components/styles/useStylesTeacherHome";
import HomeDrawer from "../components/HomeDrawer";
import StudentBottomNav from "../components/StudentBottomNav";
import Dashboard from "../components/DashboardStudent";
import Exams from "../components/StudentExams";
import Account from "../components/AccountStudent";
import History from "../components/StudentExamHistory";
import StudentAppBar from "../components/StudentAppBar";
import StudentExamPage from "../components/StudentExamPage";

const Student = () => {
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

      <StudentAppBar open={open} handleDrawerOpen={handleDrawerOpen} />

      <HomeDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        match={match}
        listItems="Student"
      />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Hidden mdUp>
          <StudentBottomNav match={match} />
        </Hidden>
        <Container maxWidth="lg" className={classes.container}>
          {/* React Router */}
          <Switch>
            <Route path={`${match.path}`} exact component={Dashboard} />
            <Route path={`${match.path}/exams`} exact>
              <Exams match={match} />
            </Route>
            <Route path={`${match.path}/examhistory`} exact>
              <History match={match} />
            </Route>
            <Route path={`${match.path}/account`} exact component={Account} />
            <Route
              path={`${match.path}/studentexampage`}
              exact
              component={StudentExamPage}
            />
          </Switch>
        </Container>
      </main>
    </div>
  );
};

export default Student;
