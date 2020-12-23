import React, { useState, useEffect } from "react";
import classes from "../components/styles/useStylesTeacherExam";
import classServices from "../services/classes";
import { format, parseISO, isAfter, isBefore } from "date-fns";
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
import { Link } from "react-router-dom";

const StudentExamsCard = ({ exam, match, totalScore, score }) => {
  const [section, setSection] = useState();

  const alreadySubmitted = () => {
    return exam.submittedExam.some(
      submission => submission["submittedBy"] === localStorage.getItem("email")
    );
  };

  const rightSched = () => {
    return (
      isAfter(Date.now(), parseISO(exam.sched)) &&
      isBefore(Date.now(), parseISO(exam.deadline))
    );
  };

  const renderExamStatus = () => {
    if (alreadySubmitted()) {
      return `Exam has already been submitted`;
    } else if (!rightSched()) {
      return "Exam will be available on scheduled date";
    } else {
      return "Take Exam";
    }
  };

  const renderButtonText = () => {
    if (alreadySubmitted() || !rightSched()) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    classServices
      .getClass(exam.classCode)
      .then(returnedData => {
        setSection(returnedData);
      })
      .catch(error => {
        console.log("Error: ", error);
      });
  }, [exam.classCode, exam.questions]);

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
          <Typography
            variant="body2"
            gutterBottom
            align="center"
            paragraph
            style={{ marginTop: "-0.5rem" }}>
            {section ? (
              `${section.courseCode} (${section.section})`
            ) : (
              <Skeleton />
            )}
          </Typography>

          {/* Exam Description */}
          <Typography variant="subtitle2" gutterBottom align="center" paragraph>
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

          <Divider variant="middle" style={{ marginTop: "1rem" }} />

          {/* Exam Score  */}
          <Typography
            variant="caption"
            gutterBottom
            align="center"
            paragraph
            color="secondary"
            style={{ marginTop: "1rem", marginBottom: "-1rem" }}>
            {alreadySubmitted() ? `Score: ${score} / ${totalScore}` : null}
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: "center", marginBottom: "1rem" }}>
          <Button size="small" color="primary" disabled={renderButtonText()}>
            <Link
              to={{
                pathname: `${match.path}/studentexampage`,
                examProps: { exam: exam },
              }}
              style={{ color: "inherit", textDecoration: "inherit" }}>
              {renderExamStatus()}
            </Link>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default StudentExamsCard;
