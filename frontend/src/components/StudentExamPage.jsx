import React, { useState, useEffect } from "react";
import RenderExamQuestions from "./RenderExamQuestions";
import examServices from "../services/exams";
import { differenceInSeconds, parseISO, addSeconds, format } from "date-fns";
import {
  Container,
  Typography,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  CircularProgress,
  Backdrop,
  makeStyles,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";

const StudentExamPage = props => {
  const exam = props.location.examProps.exam;
  const [open, setOpen] = useState(false);
  const [examAnswers, setExamAnswers] = useState();
  const [examUUID, setExamUUID] = useState();
  const [counter, setCounter] = useState(
    differenceInSeconds(parseISO(exam.deadline), addSeconds(new Date(), 1))
  );
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [openCloseDialog, setOpenCloseDialog] = useState(false);

  const useStyles = makeStyles(theme => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  }));

  const classes = useStyles();

  const formattedTime = seconds => {
    var helperDate = addSeconds(new Date(0), seconds);
    return format(helperDate, "mm:ss");
  };

  const handleClickOpen = (formData, examUUID) => {
    formData.submissionDate = new Date();
    setExamAnswers(formData);
    setExamUUID(examUUID);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleYes = () => {
    setBackdropOpen(true);

    examServices
      .addExamSubmission(examUUID, examAnswers)
      .then(returnedData => {
        setBackdropOpen(false);
        window.location.replace("/");
      })
      .catch(err => console.log(err.message));
    handleClose();
  };

  useEffect(() => {
    if (counter === 0) {
      setOpenCloseDialog(true);
      setTimeout(() => {
        setOpenCloseDialog(false);
        window.location.replace("/");
      }, 5000);
    }

    const timer =
      counter > 0 &&
      setInterval(() => {
        setCounter(counter - 1);
      }, 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <div style={{ minHeight: "100vh", marginBottom: "3rem" }}>
      {/* Backdrop */}
      <Backdrop className={classes.backdrop} open={backdropOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Exam is closed dialog */}
      <Dialog
        open={openCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Exam is closed"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your exam is not submitted because you have not submitted before
            deadline.
          </DialogContentText>
        </DialogContent>
      </Dialog>

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
        {`Exam will close in: ${formattedTime(counter)}`}
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
