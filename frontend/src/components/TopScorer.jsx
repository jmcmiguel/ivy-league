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

const TopScorer = ({ name, section, subject, highestScore }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>{`${subject} (${section})`}</Title>
      <Typography component="p" variant="h4">
        {`${name}`}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Highest in Last Exam
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
