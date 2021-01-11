import React from "react";
import {
  makeStyles,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Hidden,
  CardActions,
  Button,
} from "@material-ui/core";

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

const SectionsCard = ({
  section,
  handleDialogOpen,
  handleStudentsOpen,
  handleRecordsOpen,
}) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={6}>
      <Card className={classes.card} elevation={3}>
        <div className={classes.cardDetails}>
          <CardContent>
            <Typography component="h2" variant="h5">
              {`${section.courseCode} (${section.section})`}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {section.courseDesc}
            </Typography>
            <Typography variant="subtitle1">
              {section.studentEnrolled ? section.studentEnrolled.length : 0}
              {` / ${section.classCapacity} students enrolled`}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {`Class Code: ${section.classCode}`}
            </Typography>
          </CardContent>

          <CardActions style={{ marginTop: "-1.5rem" }}>
            <Button
              size="small"
              color="primary"
              onClick={() => {
                handleStudentsOpen(section.studentEnrolled);
              }}>
              View
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => {
                handleRecordsOpen(section.studentEnrolled, section.classCode);
              }}>
              Report
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => {
                handleDialogOpen(section.classCode);
              }}>
              Delete
            </Button>
          </CardActions>
        </div>

        <Hidden xsDown>
          <CardMedia className={classes.cardMedia} image={section.image} />
        </Hidden>
      </Card>
    </Grid>
  );
};

export default SectionsCard;
