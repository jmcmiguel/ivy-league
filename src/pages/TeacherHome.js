import React from "react";
import clsx from "clsx";
import {
  CssBaseline,
  Drawer,
  Box,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Badge,
  Container,
  Grid,
  Paper,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import {
  mainListItems,
  secondaryListItems,
  tertiaryListItems,
} from "../components/listItems";
import AverageScoreChart from "../components/AverageScoreChart.js";
import TopScorer from "../components/TopScorer";
import RankingBoard from "../components/RankingBoard";
import Copyright from "../components/Copyright";
import useStylesHome from "../components/useStylesHome";
import HomeDrawer from "../components/HomeDrawer";
import HomeAppBar from "../components/HomeAppBar";

const TeacherHome = () => {
  const classes = useStylesHome();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <HomeAppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <HomeDrawer open={open} handleDrawerClose={handleDrawerClose} />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <AverageScoreChart
                  title={"Average Score of ICTC-1213 students"}
                  chartData={[
                    { examname: "Exam 1", avgscore: 20 },
                    { examname: "Exam 2", avgscore: 10 },
                    { examname: "Exam 3", avgscore: 30 },
                    { examname: "Exam 4", avgscore: 50 },
                    { examname: "Exam 5", avgscore: 80 },
                  ]}
                />
              </Paper>
            </Grid>
            {/* Top Scorer */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <TopScorer
                  name={"Dela Cruz, Juan"}
                  section={"NW3D"}
                  totalScore={420}
                  highestScore={80}
                />
              </Paper>
            </Grid>
            {/* Chart 2 */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <AverageScoreChart
                  title={"Average Score of ITNW-1413 students"}
                  chartData={[
                    { examname: "Quiz 1", avgscore: 100 },
                    { examname: "Quiz 2", avgscore: 80 },
                    { examname: "Quiz 3", avgscore: 53 },
                    { examname: "Quiz 4", avgscore: 10 },
                    { examname: "Quiz 5", avgscore: 4 },
                    { examname: "Quiz 6", avgscore: 90 },
                    { examname: "Quiz 7", avgscore: 30 },
                    { examname: "Quiz 8", avgscore: 50 },
                    { examname: "Quiz 9", avgscore: 60 },
                  ]}
                />
              </Paper>
            </Grid>
            {/* Top Scorer 2*/}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <TopScorer
                  name={"Doe, John"}
                  section={"NW3A"}
                  totalScore={6969}
                  highestScore={90}
                />
              </Paper>
            </Grid>
            {/* Ranking Board */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <RankingBoard />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
};

export default TeacherHome;
