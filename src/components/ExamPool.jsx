import React from "react";
import ControlledTextField from "../components/ControlledTextField";
import ControlledSelect from "../components/ControlledSelect";
import { Divider, Grid, Typography } from "@material-ui/core";

const ExamPool = ({ question, errors, control, index }) => {
  let questions = [];

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
                marginLeft: "1rem",
              }}>{`Question ${i} (Multiple Choice)`}</Typography>

            <Grid item xs={12}>
              <ControlledTextField
                name={`Set${index}|Question${i}|multichoice`}
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
                name={`Set${index}|Choice${i}|c1`}
                label={`Choice A`}
                error={errors}
                control={control}
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextField
                name={`Set${index}|Choice${i}|c2`}
                label={`Choice B`}
                error={errors}
                control={control}
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextField
                name={`Set${index}|Choice${i}|c3`}
                label={`Choice C`}
                error={errors}
                control={control}
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextField
                name={`Set${index}|Choice${i}|c4`}
                label={`Choice D`}
                error={errors}
                control={control}
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledSelect
                name={`Set${index}|Answer${i}|Answer`}
                label={`Answer`}
                error={errors}
                control={control}
                required={true}
                menu={[
                  { value: "a", label: "A" },
                  { value: "b", label: "B" },
                  { value: "c", label: "C" },
                  { value: "d", label: "D" },
                ]}
              />
            </Grid>
          </Grid>
        );

        questions.push(questionItem);
      }

      return (
        <Grid container spacing={5}>
          <Grid item>
            <Typography
              variant="h4"
              style={{
                marginTop: "2rem",
                marginLeft: "1rem",
                marginBottom: "-3rem",
              }}>
              {`Set ${index + 1}`}
            </Typography>
          </Grid>
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
      for (let i = 1; i <= question.noitems; i++) {
        const questionItem = (
          <Grid container spacing={2}>
            <Typography
              variant="h6"
              gutterBottom
              style={{
                marginTop: "2rem",
                marginLeft: "1rem",
              }}>{`Question ${i} (True or False)`}</Typography>

            <Grid item xs={12}>
              <ControlledTextField
                name={`Set${index}|Question${i}|multichoice`}
                label={`Question ${i}`}
                error={errors}
                control={control}
                required={true}
                multiline={true}
                rows={5}
              />
            </Grid>

            <Grid item xs={12}>
              <ControlledSelect
                name={`Set${index}|Answer${i}|Answer`}
                label={`Answer`}
                error={errors}
                control={control}
                required={true}
                menu={[
                  { value: "t", label: "True" },
                  { value: "f", label: "False" },
                ]}
              />
            </Grid>
          </Grid>
        );
        questions.push(questionItem);
      }

      return (
        <Grid container spacing={5}>
          <Grid item>
            <Typography
              variant="h4"
              style={{
                marginTop: "2rem",
                marginLeft: "1rem",
                marginBottom: "-3rem",
              }}>{`Set ${index + 1}`}</Typography>
          </Grid>
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

    case "identification":
      return <div>Identification</div>;

    default:
      return <div>Nothing</div>;
  }
};

export default ExamPool;
