import React, { useState, useEffect } from "react";
import classes from "../components/styles/useStylesTeacherExam";
import classServices from "../services/classes";
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

const ExamsCard = ({
  exam,
  handleDialogOpenStats,
  handleDialogOpen,
  handleDelete,
  handleViewExam,
}) => {
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
  }, [exam]);

  const renderExamTotalExaminees = (totalExaminees, studentEnrolled) => {
    if (+totalExaminees === 0) {
      return "No one has taken this exam yet";
    } else if (totalExaminees === studentEnrolled) {
      return "Everyone has taken this exam";
    } else {
      return `${totalExaminees}/${studentEnrolled} has taken this exam`;
    }
  };

  return (
    <Grid item xs={12} md={6}>
      <Card className={classes.card} elevation={3}>
        <CardContent className={classes.cardContent}>
          {/* Exam Name */}
          <Typography gutterBottom variant="h5" align="center">
            {exam.examName}
          </Typography>

          {/* Course Code and Section */}
          <Typography gutterBottom align="center">
            {section ? (
              `${section.courseCode} (${section.section})`
            ) : (
              <Skeleton />
            )}
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
              {section ? (
                renderExamTotalExaminees(
                  exam.submittedExam.length,
                  section.studentEnrolled.length
                )
              ) : (
                <Skeleton />
              )}
            </Typography>
          </div>
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
          <Button
            size="small"
            color="primary"
            onClick={() => handleDialogOpenStats(exam)}>
            Stats
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => handleDialogOpen(exam)}>
            Submissions
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => handleViewExam(exam)}>
            View
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              handleDelete(exam.uuid);
            }}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ExamsCard;
