import React from "react";
import { Grid, Typography, Paper } from "@material-ui/core";

const VerifyQuestions = ({ questions }) => {
  let examQuestions = [];

  for (let i = 0; i < questions.length; i++) {
    if (questions[i].type === "multipleChoice") {
      examQuestions.push(
        <Grid container spacing={1}>
          <Paper
            style={{
              minWidth: "100%",
              padding: "1rem",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}>
            {/* Question */}
            <Grid item xs={12}>
              <Typography
                variant="body1"
                gutterBottom
                style={{ display: "inline" }}>
                {`${i + 1}.) ${questions[i].question}`}
              </Typography>
              <Typography variant="caption">{` ${questions[i].points} ${
                questions.points > 1 ? "points" : "point"
              }`}</Typography>
            </Grid>

            {/* Choices */}
            {questions[i].choices.map((choice, i) => {
              return (
                <Grid item key={i}>
                  <Typography variant="caption">
                    {`${choice.value.toUpperCase()}.) ${choice.label}`}
                  </Typography>
                </Grid>
              );
            })}

            {/* Answer */}
            <Grid item xs={12}>
              <Typography
                color="secondary"
                variant="body1"
                gutterBottom>{`Answer: ${questions[i].answer}`}</Typography>
            </Grid>
          </Paper>
        </Grid>
      );
    } else if (questions[i].type === "trueOrFalse") {
      examQuestions.push(
        <Grid container spacing={1}>
          <Paper
            style={{
              minWidth: "100%",
              padding: "1rem",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}>
            {/* Question */}
            <Grid item xs={12}>
              <Typography
                variant="body1"
                gutterBottom
                style={{ display: "inline" }}>
                {`${i + 1}.) ${questions[i].question}`}
              </Typography>
              <Typography variant="caption">{` ${questions[i].points} ${
                questions.points > 1 ? "points" : "point"
              }`}</Typography>
            </Grid>

            {/* Answer */}
            <Grid item xs={12}>
              <Typography variant="body1" color="secondary" gutterBottom>
                {`Answer: ${questions[i].answer === "t" ? "True" : "False"}`}
              </Typography>
            </Grid>
          </Paper>
        </Grid>
      );
    } else if (questions[i].type === "identification") {
      examQuestions.push(
        <Grid container spacing={1}>
          <Paper
            style={{
              minWidth: "100%",
              padding: "1rem",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}>
            {/* Question */}
            <Grid item xs={12}>
              <Typography
                variant="body1"
                gutterBottom
                style={{ display: "inline" }}>
                {`${i + 1}.) ${questions[i].question}`}
              </Typography>
              <Typography variant="caption">{` ${questions[i].points} ${
                questions.points > 1 ? "points" : "point"
              }`}</Typography>
            </Grid>

            {/* Answer */}
            <Grid item xs={12}>
              <Typography variant="body1" color="secondary" gutterBottom>
                {`Answer: ${questions[i].answer}`}
              </Typography>
            </Grid>
          </Paper>
        </Grid>
      );
    } else if (questions[i].type === "essayType") {
      examQuestions.push(
        <Grid container spacing={1}>
          <Paper
            style={{
              minWidth: "100%",
              padding: "1rem",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}>
            {/* Question */}
            <Grid item xs={12}>
              <Typography
                variant="body1"
                gutterBottom
                style={{ display: "inline" }}>
                {`${i + 1}.) ${questions[i].question}`}
              </Typography>
              <Typography variant="caption">{` ${questions[i].points} ${
                questions.points > 1 ? "points" : "point"
              }`}</Typography>
            </Grid>
          </Paper>
        </Grid>
      );
    }
  }

  return (
    <Grid container spacing={3}>
      {examQuestions.map((qstn, i) => (
        <Grid container spacing={2} key={i}>
          {qstn}
        </Grid>
      ))}
    </Grid>
  );
};

export default VerifyQuestions;
