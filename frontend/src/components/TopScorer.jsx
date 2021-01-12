import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

const TopScorer = ({ name, section, subject, highestScore, examName }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>{`Top Scorer`}</Title>
      <Typography component="p" variant="h6">
        {`${name}`}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {examName === "No exams yet"
          ? "No exams yet"
          : `Highest in ${examName}`}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {examName === "No exams yet"
          ? "No Score yet"
          : `Score: ${highestScore}`}
      </Typography>
    </React.Fragment>
  );
};

export default TopScorer;
