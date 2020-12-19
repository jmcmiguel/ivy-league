import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";

const RenderExamQuestions = ({ exam }) => {
  let examQuestions = [];

  for (let index = 0; index < exam.questions.length; index++) {
    // Multiple Choice
    if (exam.questions[index].type === "multipleChoice") {
      examQuestions.push(
        <Paper>
          {/* Question */}
          <Typography variant="body1" gutterBottom>
            {`${index + 1}.) ${exam.questions[index].question} (${
              exam.questions[index].points
            } ${exam.questions[index].points > 1 ? "points" : "point"})`}
          </Typography>

          {/* Choices */}
          {exam.questions[index].choices.map((choice, i) => {
            return (
              <Grid item key={i}>
                <Typography variant="body1">
                  {`${choice.value.toUpperCase()}.) ${choice.label}`}
                </Typography>
              </Grid>
            );
          })}
        </Paper>
      );

      // True or False
    } else if (exam.questions[index].type === "trueOrFalse") {
      examQuestions.push(
        <Paper>
          {/* Question */}
          <Typography variant="body1" gutterBottom>
            {`${index + 1}.) ${exam.questions[index].question} (${
              exam.questions[index].points
            } ${exam.questions[index].points > 1 ? "points" : "point"})`}
          </Typography>
        </Paper>
      );

      // Identification
    } else if (exam.questions[index].type === "identification") {
      examQuestions.push(
        <Paper>
          {/* Question */}
          <Typography variant="body1" gutterBottom>
            {`${index + 1}.) ${exam.questions[index].question} (${
              exam.questions[index].points
            } ${exam.questions[index].points > 1 ? "points" : "point"})`}
          </Typography>
        </Paper>
      );

      // Essay Type
    } else if (exam.questions[index].type === "essayType") {
      examQuestions.push(
        <Paper>
          {/* Question */}
          <Typography variant="body1" gutterBottom>
            {`${index + 1}.) ${exam.questions[index].question} (${
              exam.questions[index].points
            } ${exam.questions[index].points > 1 ? "points" : "point"})`}
          </Typography>
        </Paper>
      );
    }
  }

  return (
    <Grid container spacing={3} justify="center">
      {examQuestions.map((qstn, i) => (
        <Grid key={i} item xs={12} md={12} lg={12}>
          {qstn}
        </Grid>
      ))}
    </Grid>
  );
};

export default RenderExamQuestions;
