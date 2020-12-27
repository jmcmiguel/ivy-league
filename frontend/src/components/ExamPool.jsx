import React from "react";
import ControlledTextField from "../components/ControlledTextField";
import ControlledSelect from "../components/ControlledSelect";
import { Grid, Typography } from "@material-ui/core";

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
                name={`Set${index}-Question${i}-multichoice`}
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
                name={`Set${index}-Choice${i}-c1`}
                label={`Choice A`}
                error={errors}
                control={control}
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextField
                name={`Set${index}-Choice${i}-c2`}
                label={`Choice B`}
                error={errors}
                control={control}
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextField
                name={`Set${index}-Choice${i}-c3`}
                label={`Choice C`}
                error={errors}
                control={control}
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextField
                name={`Set${index}-Choice${i}-c4`}
                label={`Choice D`}
                error={errors}
                control={control}
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledSelect
                name={`Set${index}-Answer${i}-multichoice`}
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

      break;

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
                name={`Set${index}-Question${i}-trueorfalse`}
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
                name={`Set${index}-Answer${i}-trueorfalse`}
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

      break;

    case "identification":
      for (let i = 1; i <= question.noitems; i++) {
        const questionItem = (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                gutterBottom
                style={{
                  marginTop: "2rem",
                  marginLeft: "1rem",
                }}>{`Question ${i} (Identification)`}</Typography>
            </Grid>

            <Grid item xs={12}>
              <ControlledTextField
                name={`Set${index}-Question${i}-identification`}
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
                name={`Set${index}-Answer${i}-identification`}
                label={`Answer`}
                error={errors}
                control={control}
                required={true}
              />
            </Grid>
          </Grid>
        );

        questions.push(questionItem);
      }

      break;

    case "enumeration":
      for (let i = 1; i <= question.noitems; i++) {
        const questionItem = (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ControlledTextField
                name={`Set${index}-Question${i}-enumeration`}
                label={`Question ${i}`}
                error={errors}
                control={control}
                required={true}
                multiline={true}
                rows={5}
              />
            </Grid>

            <Grid item xs={12}></Grid>
          </Grid>
        );

        questions.push(questionItem);
      }

      break;

    case "essaytype":
      for (let i = 1; i <= question.noitems; i++) {
        const questionItem = (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                gutterBottom
                style={{
                  marginTop: "2rem",
                  marginLeft: "1rem",
                }}>{`Question ${i} (Essay Type)`}</Typography>
            </Grid>

            <Grid item xs={12}>
              <ControlledTextField
                name={`Set${index}-Question${i}-essaytype`}
                label={`Question ${i}`}
                error={errors}
                control={control}
                required={true}
                multiline={true}
                rows={5}
              />
            </Grid>
          </Grid>
        );

        questions.push(questionItem);
      }

      break;

    default:
      return <div>Nothing rendered</div>;
  }

  return (
    <Grid container spacing={1}>
      <Grid item>
        <Typography
          variant="h4"
          style={{
            marginTop: "2rem",
            marginLeft: "1rem",
            marginBottom: "-1rem",
          }}>
          {`Set ${index + 1} [${question.points} points per item]`}
        </Typography>
      </Grid>
      {questions.map((question, index) => {
        return (
          <Grid key={index} item xs={12}>
            {question}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ExamPool;
