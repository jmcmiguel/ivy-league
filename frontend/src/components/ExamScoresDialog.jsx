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

const ExamScoresDialog = ({ open, setOpen, exam }) => {
  const classes = useStylesTeacherHome();

  const handleClose = () => {
    setOpen(false);
  };

  const renderStudentScores = examSubmissionLength => {
    if (examSubmissionLength) {
      return (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <ExamScoresTable title="Submissions" exam={exam} />
          </Paper>
        </Grid>
      );
    } else {
      return (
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Typography>No submissions yet</Typography>
        </Grid>
      );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      maxWidth="md"
      fullWidth={true}>
      <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>
        {exam ? exam.examName : <Skeleton />}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {exam ? renderStudentScores(exam.submittedExam.length) : <Skeleton />}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Back
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExamScoresDialog;
