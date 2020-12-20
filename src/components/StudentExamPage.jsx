import React, { useState, useEffect } from "react";
import RenderExamQuestions from "./RenderExamQuestions";
import examServices from "../server/services/exams";
import { differenceInSeconds, parseISO, addSeconds, format } from "date-fns";
import {
  Container,
  Typography,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";

const StudentExamPage = props => {
  const exam = props.location.examProps.exam;
  const [open, setOpen] = useState(false);
  const [examAnswers, setExamAnswers] = useState();
  const [examUUID, setExamUUID] = useState();
  const [counter, setCounter] = useState(
    differenceInSeconds(parseISO(exam.deadline), parseISO(exam.sched))
  );

  const formattedTime = seconds => {
    var helperDate = addSeconds(new Date(0), seconds);
    return format(helperDate, "mm:ss");
  };

  const handleClickOpen = (formData, examUUID) => {
    setExamAnswers(formData);
    setExamUUID(examUUID);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleYes = () => {
    examServices
      .addExamSubmission(examUUID, examAnswers)
      .then(returnedData => {
        window.location.replace("/");
        console.log("returnedData :>> ", returnedData);
      })
      .catch(err => console.log(err.message));
    handleClose();
  };

  useEffect(() => {
    const timer =
      counter > 0 &&
      setInterval(() => {
        setCounter(counter - 1);
      }, 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <div style={{ minHeight: "100vh", marginBottom: "3rem" }}>
      {/* Yes/No Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Submit Exam?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleYes} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="sm">
        {/* Exam Title */}
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom>
          {`${exam.examName}`}
        </Typography>
      </Container>

      {/* Exam Desc */}
      <Typography
        variant="h5"
        align="center"
        color="textSecondary"
        component="p"
        paragraph>
        {`${exam.examDesc}`}
      </Typography>

      {/* Exam Timer */}
      <Typography
        variant="body1"
        align="center"
        color="textSecondary"
        component="p">
        {`Exam will auto-submit in: ${formattedTime(counter)}`}
      </Typography>

      {/* Divider */}
      <Divider style={{ marginTop: "3rem", marginBottom: "3rem" }} />

      {/* Render Exam Questions */}
      <RenderExamQuestions
        exam={exam}
        style={{ marginBottom: "3rem" }}
        handleDialogOpen={handleClickOpen}
      />
    </div>
  );
};

export default StudentExamPage;
