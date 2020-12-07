import React from "react";
import { Grid, Typography } from "@material-ui/core";

const VerifyQuestions = ({ questions }) => {
  let examQuestions = [];

  for (let i = 0; i < questions.length; i++) {
    if (questions[i].type === "multipleChoice") {
      examQuestions.push(
        <Grid container spacing={1}>
          {/* Question */}
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              {`${i + 1}.) ${questions[i].question} (${questions[i].points} ${
                questions.points > 1 ? "points" : "point"
              })`}
            </Typography>
          </Grid>
          {/* Choices */}
          {questions[i].choices.map((choice, i) => {
            return (
              <Grid item key={i}>
                <Typography variant="body1">
                  {`${choice.value.toUpperCase()}.) ${choice.label}`}
                </Typography>
              </Grid>
            );
          })}
          {/* Answer */}
          <Grid item xs={12}>
            <Typography
              variant="body1"
              gutterBottom>{`Answer: ${questions[i].answer}`}</Typography>
          </Grid>
        </Grid>
      );
    } else if (questions[i].type === "trueOrFalse") {
      examQuestions.push(
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {/* Question */}
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                {`${i + 1}.) ${questions[i].question} (${questions[i].points} ${
                  questions[i].points > 1 ? "points" : "point"
                })`}
              </Typography>
            </Grid>
            {/* Answer */}
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                {`Answer: ${questions[i].answer === "t" ? "True" : "False"}`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      );
    } else if (questions[i].type === "identification") {
      examQuestions.push(
        <Grid container spacing={1}>
          {/* Question */}
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              {`${i + 1}.) ${questions[i].question} (${questions[i].points} ${
                questions[i].points > 1 ? "points" : "point"
              })`}
            </Typography>
          </Grid>
          {/* Answer */}
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              {`Answer: ${questions[i].answer}`}
            </Typography>
          </Grid>
        </Grid>
      );
    } else if (questions[i].type === "essayType") {
      examQuestions.push(
        <Grid container spacing={1}>
          {/* Question */}
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              {`${i + 1}.) ${questions[i].question} (${questions[i].points} ${
                questions[i].points > 1 ? "points" : "point"
              })`}
            </Typography>
          </Grid>
        </Grid>
      );
    }
  }

  return (
    <Grid container spacing={3}>
      {examQuestions.map((qstn, i) => (
        <div key={i}>{qstn}</div>
      ))}
    </Grid>
  );
};

export default VerifyQuestions;
