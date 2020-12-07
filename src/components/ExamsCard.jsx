import React, { useState, useEffect } from "react";
import classes from "../components/styles/useStylesTeacherExam";
import classServices from "../server/services/classes";
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Divider,
  Button,
} from "@material-ui/core";

const ExamsCard = ({ exam }) => {
  const [section, setSection] = useState({});

  useEffect(() => {
    classServices
      .getClass(exam.classCode)
      .then(returnedData => {
        setSection(returnedData);
      })
      .catch(error => {
        console.log("Error: ", error);
      });
  });

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" align="center">
            {exam.examName}
          </Typography>
          <Typography gutterBottom align="center">
            {`${section.courseCode} (${section.section})`}
          </Typography>
          <Typography variant="subtitle2" gutterBottom align="center">
            {exam.examDesc}
          </Typography>
          <div>
            <Divider
              variant="middle"
              style={{ marginTop: "1rem", marginBottom: "1rem" }}
            />
            <Typography gutterBottom color="secondary" align="center">
              {exam.submittedExam.length === section.classCapacity
                ? "Everyone "
                : `${exam.submittedExam.length}/${section.classCapacity} `}
              has taken this exam
            </Typography>
          </div>
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
          <Button size="small" color="primary">
            View
          </Button>
          <Button size="small" color="primary">
            Edit
          </Button>
          <Button size="small" color="primary">
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ExamsCard;
