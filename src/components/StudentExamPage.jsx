import React, { useState, useEffect } from "react";
import { Container, Typography, Divider } from "@material-ui/core";
import { differenceInSeconds, parseISO, addSeconds, format } from "date-fns";
import renderExamQuestions from "../components/renderExamQuestions";
import { Skeleton } from "@material-ui/lab";

const StudentExamPage = props => {
  const exam = props.location.examProps.exam;
  const [counter, setCounter] = useState(
    differenceInSeconds(parseISO(exam.deadline), parseISO(exam.sched))
  );
  const [timer, setTimer] = useState();

  const formattedTime = seconds => {
    var helperDate = addSeconds(new Date(0), seconds);
    return format(helperDate, "mm:ss");
  };

  useEffect(() => {
    const timer =
      counter > 0 &&
      setInterval(() => {
        setCounter(counter - 1);
        setTimer(formattedTime(counter));
      }, 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <div>
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
        variant="body"
        align="center"
        color="textSecondary"
        component="p">
        {timer ? `Exam will auto-submit in: ${timer}` : <Skeleton />}
      </Typography>

      {/* Divider */}
      <Divider style={{ marginTop: "3rem", marginBottom: "3rem" }} />

      {/* Render Exam Questions */}
      <renderExamQuestions exam={exam} />
    </div>
  );
};

export default StudentExamPage;
