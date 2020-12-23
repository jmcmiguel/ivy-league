import React, { useEffect, useState } from "react";
import CreateIcon from "@material-ui/icons/Create";
import classes from "../components/styles/useStylesTeacherExam";
import ExamsCard from "./ExamsCard";
import { Link } from "react-router-dom";
import examServices from "../services/exams";
import ExamScoresDialog from "./ExamScoresDialog";
import {
  Button,
  Box,
  Fab,
  Grid,
  Typography,
  Container,
  Divider,
  CircularProgress,
} from "@material-ui/core";

const ExamTeacher = ({ match }) => {
  const [exams, setExams] = useState();
  const [openExamDetailsDialog, setOpenExamDetailsDialog] = useState(false);
  const [exam, setExam] = useState();

  useEffect(() => {
    examServices
      .getProfExams(localStorage.getItem("email"))
      .then(returnedData => {
        setExams(returnedData);
      })
      .catch(error => {
        console.log("Error: ", error);
      });
  }, []);

  useEffect(() => {}, [exams]);

  const handleDialogOpen = exam => {
    setExam(exam);
    setOpenExamDetailsDialog(true);
  };

  const renderExams = examsLength => {
    if (examsLength) {
      return exams
        .slice(0)
        .reverse()
        .map((exam, i) => (
          <ExamsCard key={i} exam={exam} handleDialogOpen={handleDialogOpen} />
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
            {`Yikes! you haven't created an exam yet :/`}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            component="p">
            Create an exam using the add button
          </Typography>
        </Box>
      );
    }
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <Link
        to={`${match.url}/createexam`}
        style={{ color: "inherit", textDecoration: "inherit" }}>
        <Fab
          color="primary"
          aria-label="add"
          size="medium"
          style={{
            margin: 0,
            top: "auto",
            right: "2rem",
            bottom: "5rem",
            position: "fixed",
          }}>
          <CreateIcon />
        </Fab>
      </Link>

      {/* Exam Scores Dialog */}
      <ExamScoresDialog
        open={openExamDetailsDialog}
        setOpen={setOpenExamDetailsDialog}
        exam={exam}
      />

      {/* Start Hero Unit */}
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
          Create and manage exam for your students here
        </Typography>
        <div className={classes.heroButtons} style={{ marginTop: "2rem" }}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button variant="contained" color="primary">
                <Link
                  to={`${match.url}/createexam`}
                  style={{ color: "inherit", textDecoration: "inherit" }}>
                  Create New Exam
                </Link>
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
      {/* End hero unit */}

      <Divider style={{ marginTop: "3rem", marginBottom: "3rem" }} />

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

export default ExamTeacher;
