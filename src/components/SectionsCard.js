import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles({
  card: {
    display: "flex",
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});

const SectionsCard = ({ section }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={6}>
      <Card className={classes.card} variant={"outlined"}>
        <div className={classes.cardDetails}>
          <CardContent>
            <Typography component="h2" variant="h5">
              {`${section.courseCode} (${section.section})`}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {section.courseDesc}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {section.studentEnrolled ? section.studentEnrolled : 0}
              {` / ${section.classCapacity} students enrolled`}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {`Class Code: ${section.classCode}`}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Click to view all students
            </Typography>
          </CardContent>
        </div>
        <Hidden xsDown>
          <CardMedia className={classes.cardMedia} image={section.image} />
        </Hidden>
      </Card>
    </Grid>
  );
};

export default SectionsCard;
