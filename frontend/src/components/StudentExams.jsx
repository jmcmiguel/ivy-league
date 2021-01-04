import React, { useState, useEffect } from "react";
import classes from "../components/styles/useStylesTeacherHome";
import StudentExamsCard from "../components/StudentExamsCard";
import examServices from "../services/exams";
import {
  Container,
  Typography,
  Divider,
  Grid,
  CircularProgress,
  Box,
} from "@material-ui/core";

const StudentExams = ({ match }) => {
  const [exams, setExams] = useState();

  const getStudentExams = () => {
    examServices
      .getNotSubmittedExams()
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
            Wooohoooooo{" "}
            <span role="img" aria-label="emoji">
              🙌🎉🍻
            </span>
            ! You have no upcoming exams{" "}
            <span role="img" aria-label="emoji">
              😂
            </span>
            !
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            component="p">
            Previous exam records can be reviewed instead{" "}
            <span role="img" aria-label="emoji">
              🤓
            </span>
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
          Exams
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p">
          Oversee incoming exams here
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

export default StudentExams;
