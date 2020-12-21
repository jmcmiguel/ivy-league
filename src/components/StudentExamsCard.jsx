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
import { Skeleton } from "@material-ui/lab";

const StudentExamsCard = ({ exam }) => {
  const [section, setSection] = useState();

  useEffect(() => {
    classServices
      .getClass(exam.classCode)
      .then(returnedData => {
        setSection(returnedData);
      })
      .catch(error => {
        console.log("Error: ", error);
      });
  }, [exam.classCode]);

  useEffect(() => {}, [section]);

  return (
    <Grid item xs={12} md={6}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" align="center">
            {exam.examName}
          </Typography>

          {/* Course Desc */}
          <Typography gutterBottom align="center">
            {section ? `${section.courseDesc}` : <Skeleton />}
          </Typography>

          {/* Course Code & Section */}
          <Typography gutterBottom align="center" paragraph>
            {section ? (
              `${section.courseCode} (${section.section})`
            ) : (
              <Skeleton />
            )}
          </Typography>

          {/* Exam Description */}
          <Typography variant="subtitle2" gutterBottom align="center">
            {exam.examDesc}
          </Typography>

          {/* Exam Schedule */}
          <Typography variant="subtitle2" gutterBottom align="center">
            {`Schedule: ${format(parseISO(exam.sched), "PPpp")}`}
          </Typography>

          <div>
            <Divider
              variant="middle"
              style={{ marginTop: "1rem", marginBottom: "1rem" }}
            />
          </div>
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
          <Button size="small" color="primary">
            View
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default StudentExamsCard;
