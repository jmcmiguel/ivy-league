import React from "react";
import ControlledTextField from "./ControlledTextField";
import ControlledRadioButton from "./ControlledRadioButton";
import classes from "../components/styles/useStylesTeacherHome";
import { useForm } from "react-hook-form";
import { Grid, Paper, Typography, Button } from "@material-ui/core";

const RenderExamQuestions = ({ exam, handleDialogOpen }) => {
  const { handleSubmit, errors, control } = useForm();
  let examQuestions = [];

  // Form Submit Handler
  const submitHandle = formData => {
    formData.submittedBy = localStorage.getItem("email");
    handleDialogOpen(formData, exam.uuid);
  };

  for (let index = 0; index < exam.questions.length; index++) {
    // Multiple Choice
    if (exam.questions[index].type === "multipleChoice") {
      examQuestions.push(
        <Paper style={{ padding: "1.5em" }}>
          {/* Question */}
          <div>
            <Typography variant="body1" display="inline" gutterBottom>
              {`${index + 1}.) ${exam.questions[index].question} `}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {`(${exam.questions[index].points} ${
                exam.questions[index].points > 1 ? "points" : "point"
              })`}
            </Typography>
          </div>

          {/* Choices */}
          <ControlledRadioButton
            name={exam.questions[index].uuid}
            label={`Question ${index + 1}`}
            error={errors}
            control={control}
            required={true}
            rules={{ required: "this is required" }}
            choices={exam.questions[index].choices}
          />
        </Paper>
      );

      // True or False
    } else if (exam.questions[index].type === "trueOrFalse") {
      examQuestions.push(
        <Paper style={{ padding: "1.5em" }}>
          {/* Question */}
          <div>
            <Typography variant="body1" display="inline" gutterBottom>
              {`${index + 1}.) ${exam.questions[index].question} `}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {`(${exam.questions[index].points} ${
                exam.questions[index].points > 1 ? "points" : "point"
              })`}
            </Typography>
          </div>

          {/* Choices */}
          <ControlledRadioButton
            name={exam.questions[index].uuid}
            label={`Question ${index + 1}`}
            error={errors}
            control={control}
            required={true}
            rules={{ required: "this is required" }}
            choices={[
              { value: "t", label: "True" },
              { value: "f", label: "False" },
            ]}
          />
        </Paper>
      );

      // Identification
    } else if (exam.questions[index].type === "identification") {
      examQuestions.push(
        <Paper style={{ padding: "1.5em" }}>
          {/* Question */}
          <div>
            <Typography variant="body1" display="inline" gutterBottom>
              {`${index + 1}.) ${exam.questions[index].question} `}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {`(${exam.questions[index].points} ${
                exam.questions[index].points > 1 ? "points" : "point"
              })`}
            </Typography>
          </div>

          {/* Answer Field */}
          <ControlledTextField
            name={exam.questions[index].uuid}
            label={`Question ${index + 1}`}
            error={errors}
            control={control}
            required={true}
            rules={{ required: "this is required" }}
          />
        </Paper>
      );

      // Essay Type
    } else if (exam.questions[index].type === "essayType") {
      examQuestions.push(
        <Paper style={{ padding: "1.5em" }}>
          {/* Question */}
          <div>
            <Typography variant="body1" display="inline" gutterBottom>
              {`${index + 1}.) ${exam.questions[index].question} `}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {`(${exam.questions[index].points} ${
                exam.questions[index].points > 1 ? "points" : "point"
              })`}
            </Typography>
          </div>

          {/* Answer Field */}
          <ControlledTextField
            multiline
            rows={8}
            name={exam.questions[index].uuid}
            label={`Question ${index + 1}`}
            error={errors}
            control={control}
            required={true}
            rules={{ required: "this is required" }}
          />
        </Paper>
      );
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(submitHandle)}>
      <Grid container spacing={2} justify="center">
        {examQuestions.map((qstn, i) => (
          <Grid key={i} item xs={12} md={10} lg={8}>
            {qstn}
          </Grid>
        ))}
      </Grid>

      <div className={classes.heroButtons} style={{ marginTop: "2rem" }}>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              Submit Exam
            </Button>
          </Grid>
        </Grid>
      </div>
    </form>
  );
};

export default RenderExamQuestions;
