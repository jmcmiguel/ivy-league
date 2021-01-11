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
          {exam.questions.map((question, i) => {
            let displayQuestion = "";

            switch (question.type) {
              case "multipleChoice":
                displayQuestion = (
                  <>
                    {question.choices.map((choice, i) => {
                      if (choice.value === question.answer) {
                        return (
                          <Typography variant="body2" color="secondary" key={i}>
                            {`${choice.value.toUpperCase()}.) ${choice.label}`}
                          </Typography>
                        );
                      } else {
                        return (
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            key={i}>
                            {`${choice.value.toUpperCase()}.) ${choice.label}`}
                          </Typography>
                        );
                      }
                    })}
                  </>
                );
                break;

              case "trueOrFalse":
                displayQuestion = (
                  <Typography variant="body2" color="secondary">
                    Answer: {question.answer === "f" ? "False" : "True"}
                  </Typography>
                );
                break;

              case "identification":
                displayQuestion = (
                  <Typography variant="body2" color="secondary">
                    {`Answer: ${question.answer}`}
                  </Typography>
                );
                break;

              case "essayType":
                displayQuestion = (
                  <Typography variant="body2" color="secondary">
                    Essay Type
                  </Typography>
                );
                break;
              default:
                break;
            }

            return (
              <Paper
                key={i}
                className={classes.paper}
                style={{ marginBottom: "0.5rem" }}>
                <div>
                  <Typography variant="body1" display="inline">{`${i + 1}.) ${
                    question.question
                  } `}</Typography>
                  <Typography
                    variant="caption"
                    color="textSecondary">{`${question.points} points`}</Typography>
                </div>
                {displayQuestion}
              </Paper>
            );
          })}
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
      aria-labelledby="form-dialog-title"
      maxWidth="sm"
      fullWidth={true}>
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
          Back
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExamQuestionsDialog;
