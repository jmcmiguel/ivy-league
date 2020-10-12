import React from "react";
import Link from "@material-ui/core/Link";
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

const TopScorer = ({ name, section, totalScore, highestScore }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Top Scorer</Title>
      <Typography component="p" variant="h4">
        {`${name} (${section})`}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Total Score: {totalScore}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Highest Score: {highestScore}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View Student Record
        </Link>
      </div>
    </React.Fragment>
  );
};

export default TopScorer;
