import React from "react";
import clsx from "clsx";
import { Grid, Paper } from "@material-ui/core";
import AverageScoreChart from "../components/AverageScoreChart.js";
import TopScorer from "../components/TopScorer";
import RankingBoard from "../components/RankingBoard";
import useStylesTeacherHome from "../components/styles/useStylesTeacherHome";

const DashboardTeacher = () => {
  const classes = useStylesTeacherHome();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <AverageScoreChart
              title={"ICTC-1213 (NW3D) Average Score"}
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
              name={"Sanchez, Rick"}
              section={"NW3D"}
              subject={"ICTC-1213"}
              highestScore={80}
            />
          </Paper>
        </Grid>
        {/* Ranking Board */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <RankingBoard
              title={"ICTC-1213 (NW3D) Ranking Board"}
              tableData={[
                {
                  rank: 1,
                  idNumber: "18-0xxxx",
                  name: "Rick Sanchez",
                  section: "NW3D",
                  avgScore: 102,
                  ttlScore: 9000,
                },
                {
                  rank: 2,
                  idNumber: "20-0xxxx",
                  name: "Morty Smith",
                  section: "NW2C",
                  avgScore: 10,
                  ttlScore: 90,
                },
                {
                  rank: 3,
                  idNumber: "14-0xxxx",
                  name: "Light Yagami",
                  section: "NW4F",
                  avgScore: 400,
                  ttlScore: 10000,
                },
                {
                  rank: 4,
                  idNumber: "16-0xxxx",
                  name: "Tanjiro Kamado",
                  section: "NW4A",
                  avgScore: 1123,
                  ttlScore: 901230,
                },
                {
                  rank: 5,
                  idNumber: "18-0xxxx",
                  name: "Nezuko-Chan",
                  section: "NW3D",
                  avgScore: 1023,
                  ttlScore: 9420,
                },
              ]}
            />
          </Paper>
        </Grid>
        {/* Chart 2 */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <AverageScoreChart
              title={"ITNW-1413 (NW3A) Average Score"}
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
              subject={"ITNW-1413"}
              highestScore={90}
            />
          </Paper>
        </Grid>
        {/* Ranking Board */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <RankingBoard
              title={"ITNW-1413 (NW3A) Ranking Board"}
              tableData={[
                {
                  rank: 1,
                  idNumber: "18-0xxxx",
                  name: "Rick Sanchez",
                  section: "NW3D",
                  avgScore: 102,
                  ttlScore: 9000,
                },
                {
                  rank: 2,
                  idNumber: "20-0xxxx",
                  name: "Morty Smith",
                  section: "NW2C",
                  avgScore: 10,
                  ttlScore: 90,
                },
                {
                  rank: 3,
                  idNumber: "14-0xxxx",
                  name: "Light Yagami",
                  section: "NW4F",
                  avgScore: 400,
                  ttlScore: 10000,
                },
                {
                  rank: 4,
                  idNumber: "16-0xxxx",
                  name: "Tanjiro Kamado",
                  section: "NW4A",
                  avgScore: 1123,
                  ttlScore: 901230,
                },
                {
                  rank: 5,
                  idNumber: "18-0xxxx",
                  name: "Nezuko-Chan",
                  section: "NW3D",
                  avgScore: 1023,
                  ttlScore: 9420,
                },
              ]}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardTeacher;
