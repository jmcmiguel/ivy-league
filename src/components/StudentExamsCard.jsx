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
import { Link } from "react-router-dom";

const StudentExamsCard = ({ exam, match }) => {
  const [section, setSection] = useState();

  const alreadySubmitted = () => {
    return exam.submittedExam.some(
      submission => submission["submittedBy"] === localStorage.getItem("email")
    );
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
          <Typography
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

          <div>
            <Divider variant="middle" style={{ marginTop: "1rem" }} />
          </div>
        </CardContent>
        <CardActions style={{ justifyContent: "center", marginBottom: "1rem" }}>
          <Button size="small" color="primary" disabled={alreadySubmitted()}>
            <Link
              to={{
                pathname: `${match.path}/studentexampage`,
                examProps: { exam: exam },
              }}
              style={{ color: "inherit", textDecoration: "inherit" }}>
              {alreadySubmitted()
                ? `Exam has already been submitted`
                : `Take Exam`}
            </Link>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default StudentExamsCard;
