import React, { useEffect, useState } from "react";
import CreateIcon from "@material-ui/icons/Create";
import classes from "../components/styles/useStylesTeacherExam";
import ExamsCard from "./ExamsCard";
import { Link } from "react-router-dom";
import examServices from "../services/exams";
import ExamScoresDialog from "./ExamScoresDialog";
import MuiAlert from "@material-ui/lab/Alert";
import {
  Button,
  Box,
  Fab,
  Grid,
  Typography,
  Container,
  Divider,
  CircularProgress,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@material-ui/core";
import ExamQuestionsDialog from "./ExamQuestionsDialog";
import ExamStatsDialog from "./ExamStatsDialog";

const ExamTeacher = ({ match }) => {
  const [exams, setExams] = useState();
  const [openExamDetailsDialog, setOpenExamDetailsDialog] = useState(false);
  const [exam, setExam] = useState();
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [examUUID, setExamUUID] = useState();
  const [openExamQuestions, setOpenExamQuestions] = useState(false);
  const handleDialogOpen = exam => {
    setExam(exam);
    setOpenExamDetailsDialog(true);
  };
  const [openExamStats, setOpenExamStats] = useState(false);

  const handleConfirmDialogOpen = examUUID => {
    setExamUUID(examUUID);
    setOpenConfirmDialog(true);
  };

  const handleViewExamOpen = exam => {
    setExam(exam);
    setOpenExamQuestions(true);
  };

  const handleDialogOpenStats = exam => {
    setExam(exam);
    setOpenExamStats(true);
  };

  const handleClose = () => {
    setOpenConfirmDialog(false);
  };

  const getExams = () => {
    examServices
      .getProfExams(localStorage.getItem("email"))
      .then(returnedData => {
        setExams(returnedData);
      })
      .catch(error => {
        console.log("Error: ", error);
      });
  };

  const handleDelete = examUUID => {
    examServices
      .deleteExam(examUUID)
      .then(returnedData => {
        getExams();
        setSnackbarSeverity("success");
        setSnackbarMessage("Exam Deleted");
        setOpenSnackbar(!openSnackbar);
      })
      .catch(err => console.log(err.message));
  };

  const handleYes = () => {
    handleDelete(examUUID);
    handleClose();
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const renderExams = examsLength => {
    if (examsLength) {
      return exams
        .slice(0)
        .reverse()
        .map((exam, i) => (
          <ExamsCard
            key={i}
            exam={exam}
            handleDialogOpen={handleDialogOpen}
            handleDelete={handleConfirmDialogOpen}
            handleViewExam={handleViewExamOpen}
            handleDialogOpenStats={handleDialogOpenStats}
          />
        ));
    } else {
      return (
        <Box pt={8} style={{ marghandleDialogOpeninBottom: "3rem" }}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom>
            Yikes! you haven't created an exam yet{" "}
            <span role="img" aria-label="emoji">
              😦
            </span>
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

  useEffect(() => {
    getExams();
  }, []);

  useEffect(() => {}, [exams]);

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Floating Icon Button */}
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

      {/* Exam Stats Dialog */}
      <ExamStatsDialog
        open={openExamStats}
        setOpen={setOpenExamStats}
        exam={exam}
      />

      {/* Exam Questions Dialog */}
      <ExamQuestionsDialog
        open={openExamQuestions}
        setOpen={setOpenExamQuestions}
        exam={exam}
      />

      {/* Exam Scores Dialog */}
      <ExamScoresDialog
        open={openExamDetailsDialog}
        setOpen={setOpenExamDetailsDialog}
        exam={exam}
      />

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}>
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Delete Exam?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This process is unreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleYes} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

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
