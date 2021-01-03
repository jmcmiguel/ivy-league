import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  Paper,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import ExamScoresTable from "./ExamScoresTable";
import useStylesTeacherHome from "../components/styles/useStylesTeacherHome";

const ExamQuestionsDialog = ({ open, setOpen, exam }) => {
  const classes = useStylesTeacherHome();

  const handleClose = () => {
    setOpen(false);
  };

  const renderQuestions = questionsLength => {
    if (questionsLength) {
      return (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {exam.questions.map((question, i) => {
              return `${i + 1}.) ${question.question} (${question.points})pts`;
            })}
          </Paper>
        </Grid>
      );
    } else {
      return <Typography>No questions</Typography>;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>
        {exam ? `${exam.examName} Questions` : <Skeleton />}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {exam ? renderQuestions(exam.questions.length) : <Skeleton />}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExamQuestionsDialog;
