import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  Paper,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import useStylesTeacherHome from "../components/styles/useStylesTeacherHome";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

const ExamStatsDialog = ({ open, setOpen, exam }) => {
  const classes = useStylesTeacherHome();

  const handleClose = () => {
    setOpen(false);
  };

  const renderStatistics = questionsLength => {
    if (questionsLength) {
      return (
        <Grid item xs={12}>
          {exam.questions.map((question, i) => {
            let displayQuestion = "";
            let data = [];

            switch (question.type) {
              case "multipleChoice":
                data = [
                  {
                    name: "A",
                    answer: exam.submittedExam.filter(
                      submission =>
                        submission[question.uuid].toUpperCase() === "A"
                    ).length,
                  },
                  {
                    name: "B",
                    answer: exam.submittedExam.filter(
                      submission =>
                        submission[question.uuid].toUpperCase() === "B"
                    ).length,
                  },
                  {
                    name: "C",
                    answer: exam.submittedExam.filter(
                      submission =>
                        submission[question.uuid].toUpperCase() === "C"
                    ).length,
                  },
                  {
                    name: "D",
                    answer: exam.submittedExam.filter(
                      submission =>
                        submission[question.uuid].toUpperCase() === "D"
                    ).length,
                  },
                ];

                displayQuestion = (
                  <Grid container spacing={2} style={{ marginTop: "0.5rem" }}>
                    {/* Choices */}
                    <Grid item>
                      {question.choices.map((choice, i) => {
                        if (choice.value === question.answer) {
                          return (
                            <Typography
                              variant="body2"
                              color="secondary"
                              key={i}>
                              {`${choice.value.toUpperCase()}.) ${
                                choice.label
                              }`}
                            </Typography>
                          );
                        } else {
                          return (
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              key={i}>
                              {`${choice.value.toUpperCase()}.) ${
                                choice.label
                              }`}
                            </Typography>
                          );
                        }
                      })}
                    </Grid>

                    {/* Bar Chart */}
                    <Grid item>
                      <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <YAxis />
                        <XAxis dataKey="name" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="answer">
                          {data.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                entry.name.toUpperCase() ===
                                question.answer.toUpperCase()
                                  ? "#82ca9d"
                                  : "#db4c4c"
                              }
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </Grid>
                  </Grid>
                );
                break;

              case "trueOrFalse":
                data = [
                  {
                    name: "True",
                    answer: exam.submittedExam.filter(
                      submission =>
                        submission[question.uuid].toUpperCase() === "T"
                    ).length,
                  },
                  {
                    name: "False",
                    answer: exam.submittedExam.filter(
                      submission =>
                        submission[question.uuid].toUpperCase() === "T"
                    ).length,
                  },
                ];

                displayQuestion = (
                  <Grid container spacing={2} style={{ marginTop: "0.5rem" }}>
                    {/* Answer */}
                    <Grid item>
                      <Typography variant="body2" color="secondary">
                        Answer: {question.answer === "f" ? "False" : "True"}
                      </Typography>
                    </Grid>

                    {/* Bar Chart */}
                    <Grid item>
                      <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <YAxis />
                        <XAxis dataKey="name" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="answer">
                          {data.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                entry.name.slice(0, 1).toUpperCase() ===
                                question.answer.toUpperCase()
                                  ? "#82ca9d"
                                  : "#db4c4c"
                              }
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </Grid>
                  </Grid>
                );
                break;

              case "identification":
                data = [
                  {
                    name: question.answer,
                    answer: exam.submittedExam.filter(
                      submission =>
                        submission[question.uuid].toUpperCase() ===
                        question.answer.toUpperCase()
                    ).length,
                  },
                  {
                    name: "Others",
                    answer: exam.submittedExam.filter(
                      submission =>
                        submission[question.uuid].toUpperCase() !==
                        question.answer.toUpperCase()
                    ).length,
                  },
                ];
                displayQuestion = (
                  <Grid container spacing={2} style={{ marginTop: "0.5rem" }}>
                    {/* Answer */}
                    <Grid item>
                      <Typography variant="body2" color="secondary">
                        {`Answer: ${question.answer}`}
                      </Typography>
                    </Grid>

                    {/* Bar Chart */}
                    <Grid item>
                      <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <YAxis />
                        <XAxis dataKey="name" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="answer">
                          {data.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                entry.name === question.answer
                                  ? "#82ca9d"
                                  : "#db4c4c"
                              }
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </Grid>
                  </Grid>
                );
                break;

              case "essayType":
                displayQuestion = (
                  <Typography variant="body2" color="secondary">
                    Essay Type
                  </Typography>
                );
                break;
              default:
                break;
            }

            return (
              <Paper
                key={i}
                className={classes.paper}
                style={{ marginBottom: "0.5rem" }}>
                <div>
                  <Typography variant="body1" display="inline">{`${i + 1}.) ${
                    question.question
                  } `}</Typography>
                  <Typography
                    variant="caption"
                    color="textSecondary">{`${question.points} points`}</Typography>
                </div>
                {displayQuestion}
              </Paper>
            );
          })}
        </Grid>
      );
    } else {
      return <Typography>No questions</Typography>;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      maxWidth="md"
      fullWidth={true}>
      <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>
        {exam ? `${exam.examName} Statistics` : <Skeleton />}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {exam ? renderStatistics(exam.questions.length) : <Skeleton />}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Back
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExamStatsDialog;
