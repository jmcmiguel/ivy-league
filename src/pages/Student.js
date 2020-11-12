import React from "react";
import { CssBaseline, Container } from "@material-ui/core";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import useStylesTeacherHome from "../components/styles/useStylesTeacherHome";
import HomeDrawer from "../components/HomeDrawer";
import HomeAppBar from "../components/HomeAppBar";
import Student from "../components/TeacherBottomNav";

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
            <Route path={`${match.path}`} exact component={Student} />
          </Switch>
        </Container>
      </main>
    </div>
  );
};

export default TeacherHome;
