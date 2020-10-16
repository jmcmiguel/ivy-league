import React from "react";
import clsx from "clsx";
import { Grid, Paper, Typography } from "@material-ui/core";
import AverageScoreChart from "../components/AverageScoreChart.js";
import TopScorer from "../components/TopScorer";
import RankingBoard from "../components/RankingBoard";
import useStylesTeacherHome from "../components/styles/useStylesTeacherHome";

const DashboardCharts = ({
  section,
  subject,
  desc,
  chartData,
  highestScorer,
  topScore,
  tableData,
}) => {
  const classes = useStylesTeacherHome();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div>
      <Grid container spacing={3} justify={"center"}>
        <Grid item>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom>{`${subject} (${section})`}</Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            component="p">
            {desc}
          </Typography>
        </Grid>

        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <AverageScoreChart
              title={`${subject}(${section}) Average Score`}
              chartData={chartData}
            />
          </Paper>
        </Grid>
        {/* Top Scorer */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <TopScorer
              name={highestScorer}
              section={section}
              subject={subject}
              highestScore={topScore}
            />
          </Paper>
        </Grid>

        {/* Ranking Board */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <RankingBoard
              title={`${subject}(${section}) Ranking Board`}
              tableData={tableData}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardCharts;
