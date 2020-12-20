import React, { useState, useEffect } from "react";
import classes from "../components/styles/useStylesTeacherHome";
import StudentExamsCard from "../components/StudentExamsCard";
import examServices from "../server/services/exams";
import {
  Container,
  Typography,
  Divider,
  Grid,
  CircularProgress,
  Box,
} from "@material-ui/core";

const StudentExamHistory = ({ match }) => {
  const [exams, setExams] = useState();

  const getStudentExams = () => {
    examServices
      .getSubmittedExams()
      .then(returnedData => {
        setExams(returnedData);
      })
      .catch(err => console.log(err.message));
  };

  const renderExams = examsLength => {
    if (examsLength) {
      return exams
        .slice(0)
        .reverse()
        .map(exam => (
          <StudentExamsCard key={exam.uuid} exam={exam} match={match} />
        ));
    } else {
      return (
        <Box pt={8} style={{ marginBottom: "3rem" }}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom>
            {`It's empty out here, you have no exam records yet :3`}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            component="p">
            Answered exams will be sent here
          </Typography>
        </Box>
      );
    }
  };

  useEffect(() => {
    getStudentExams();
  }, []);

  useEffect(() => {}, [exams]);

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Title */}
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom>
          Exam History
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p">
          Review previous exam records
        </Typography>
      </Container>
      <Divider style={{ marginTop: "3rem", marginBottom: "3rem" }} />

      {/* Contents */}
      <Container
        className={classes.cardGrid}
        maxWidth="md"
        style={{ marginBottom: "3rem" }}>
        <Grid container spacing={4}>
          {exams ? (
            renderExams(exams.length)
          ) : (
            <Grid
              container
              spacing={2}
              alignItems="center"
              justify="center"
              style={{ marginTop: "5rem" }}>
              <CircularProgress />
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default StudentExamHistory;
