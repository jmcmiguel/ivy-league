import React from "react";
import ControlledTextField from "../components/ControlledTextField";
import ControlledSelect from "../components/ControlledSelect";
import { Divider, Grid, Typography } from "@material-ui/core";

const ExamPool = ({ question, questionss, errors, control }) => {
  let questions = [];

  console.log("questionss :>> ", questionss);
  console.log("question :>> ", question);

  switch (question.type) {
    case "multichoice":
      for (let i = 1; i <= question.noitems; i++) {
        const questionItem = (
          <Grid container spacing={2}>
            <Typography
              variant="h6"
              gutterBottom
              style={{
                marginTop: "2rem",
                marginBottom: "rem",
              }}>{`Question ${i} (Multiple Choice)`}</Typography>

            <Grid item xs={12}>
              <ControlledTextField
                name={`Question${i}`}
                label={`Question ${i}`}
                error={errors}
                control={control}
                required={true}
                multiline={true}
                rows={5}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextField
                name={`c1`}
                label={`Choice 1`}
                error={errors}
                control={control}
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextField
                name={`c2`}
                label={`Choice 2`}
                error={errors}
                control={control}
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextField
                name={`c3`}
                label={`Choice 3`}
                error={errors}
                control={control}
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextField
                name={`c4`}
                label={`Choice 4`}
                error={errors}
                control={control}
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledSelect
                name={`answer`}
                label={`Answer`}
                error={errors}
                control={control}
                required={true}
                menu={["A", "B", "C", "D"]}
              />
            </Grid>
          </Grid>
        );

        questions.push(questionItem);
      }

      return (
        <Grid container spacing={5}>
          {questions.map((question, index) => {
            return (
              <Grid key={index} item xs={12}>
                {question}
                {index >= questions.length - 1 ? null : (
                  <Divider style={{ marginTop: "5rem" }} />
                )}
              </Grid>
            );
          })}
        </Grid>
      );

    case "trueorfalse":
      return <div>True or False</div>;

    case "identification":
      return <div>Identification</div>;

    default:
      return <div>Nothing</div>;
  }
};

export default ExamPool;
