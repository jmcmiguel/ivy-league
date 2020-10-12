import React from "react";
import { Container, Typography } from "@material-ui/core";
import classes from "../components/styles/useStylesTeacherHome";

const ExamTeacher = () => {
  return (
    <div>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom>
          New Normal of Taking Exams
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p">
          Our goal with this system is to make the examination experience easier
          for both the teacher and students in this tough times.
        </Typography>
      </Container>
    </div>
  );
};

export default ExamTeacher;
