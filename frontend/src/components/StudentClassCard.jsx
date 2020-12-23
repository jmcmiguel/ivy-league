import React, { useState, useEffect } from "react";
import userServices from "../services/users";
import examServices from "../services/exams";
import {
  makeStyles,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Hidden,
  CardActionArea,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles({
  card: {
    display: "flex",
  },
  cardDetails: {
    flexGrow: 1,
  },
  cardMedia: {
    width: 160,
  },
});

const SectionsCard = ({ section }) => {
  const classes = useStyles();
  const [profName, setProfName] = useState();
  const [exams, setExams] = useState();

  useEffect(() => {
    // Get Prof Name
    userServices
      .getUser(section.prof)
      .then(user => {
        setProfName(`${user.firstName} ${user.middleName} ${user.lastName}`);
      })
      .catch(err => console.log(err.message));

    // Get Upcoming Exams
    examServices
      .getUpcomingExams(section.classCode)
      .then(exams => {
        setExams(exams);
      })
      .catch(err => {
        console.log(err.message);
      });
  }, [section]);

  const renderUpcomingExams = examsLength => {
    if (examsLength) return `Upcoming Exams: ${exams.length}`;
    else return "No Upcoming Exams";
  };

  return (
    <Grid item xs={12} md={6}>
      <Card className={classes.card}>
        <CardActionArea>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {`${section.courseCode} (${section.section})`}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" paragraph>
                {section.courseDesc}
              </Typography>
              <Typography variant="subtitle1">
                {profName ? `Professor: ${profName}` : <Skeleton />}
              </Typography>
              <Typography variant="subtitle1">
                {exams ? renderUpcomingExams(exams.length) : <Skeleton />}
              </Typography>
            </CardContent>
          </div>
        </CardActionArea>

        <Hidden xsDown>
          <CardMedia className={classes.cardMedia} image={section.image} />
        </Hidden>
      </Card>
    </Grid>
  );
};

export default SectionsCard;
