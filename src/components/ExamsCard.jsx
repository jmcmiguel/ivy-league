import React, { useState, useEffect } from "react";
import classes from "../components/styles/useStylesTeacherExam";
import classServices from "../server/services/classes";
import { format, parseISO } from "date-fns";
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
  }, [exam]);

  return (
    <Grid item xs={12} md={6}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          {/* Exam Name */}
          <Typography gutterBottom variant="h5" align="center">
            {exam.examName}
          </Typography>

          {/* Course Code and Section */}
          <Typography gutterBottom align="center">
            {`${section.courseCode} (${section.section})`}
          </Typography>

          {/* Exam Desc */}
          <Typography variant="subtitle2" gutterBottom align="center">
            {exam.examDesc}
          </Typography>

          {/* Exam Schedule  */}
          <Typography variant="caption" gutterBottom align="center" paragraph>
            {`Schedule: ${format(parseISO(exam.sched), "PPpp")}`}
          </Typography>

          {/* Exam Deadline */}
          <Typography
            variant="caption"
            gutterBottom
            align="center"
            paragraph
            style={{ marginTop: "-1rem" }}>
            {`Deadline: ${format(parseISO(exam.deadline), "PPpp")}`}
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
