import React, { useState, useEffect } from "react";
import { Container, Typography, Divider } from "@material-ui/core";
import { differenceInSeconds, parseISO, addSeconds, format } from "date-fns";
import RenderExamQuestions from "./RenderExamQuestions";

const StudentExamPage = props => {
  const exam = props.location.examProps.exam;
  const [counter, setCounter] = useState(
    differenceInSeconds(parseISO(exam.deadline), parseISO(exam.sched))
  );

  const formattedTime = seconds => {
    var helperDate = addSeconds(new Date(0), seconds);
    return format(helperDate, "mm:ss");
  };

  useEffect(() => {
    const timer =
      counter > 0 &&
      setInterval(() => {
        setCounter(counter - 1);
      }, 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <div style={{ minHeight: "100vh", marginBottom: "3rem" }}>
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
        {`Exam will auto-submit in: ${formattedTime(counter)}`}
      </Typography>

      {/* Divider */}
      <Divider style={{ marginTop: "3rem", marginBottom: "3rem" }} />

      {/* Render Exam Questions */}
      <RenderExamQuestions exam={exam} style={{ marginBottom: "3rem" }} />
    </div>
  );
};

export default StudentExamPage;
