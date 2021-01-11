import React, { useState } from "react";
import classServices from "../services/classes";
import DashboardCharts from "../components/DashboardCharts";
import useStylesTeacherHome from "../components/styles/useStylesTeacherHome";
import clsx from "clsx";

import {
  Box,
  Typography,
  Paper,
  Container,
  Divider,
  CircularProgress,
  Grid,
} from "@material-ui/core";

const DashboardTeacher = () => {
  const [Data, setData] = useState();

  const getScore = (exam, studentEmail) => {
    const questions = exam.questions.map(question => {
      return {
        uuid: question.uuid,
        points: question.points,
        answer: question.answer,
        type: question.type,
      };
    });

    const answers = exam.submittedExam.filter(
      submission => submission.submittedBy === studentEmail
    )[0];

    const answerUUIDs = Object.keys(answers);

    let points = 0;

    for (let i = 0; i < questions.length; i++) {
      for (let ii = 0; ii < answerUUIDs.length - 1; ii++) {
        if (questions[i].uuid === answerUUIDs[ii]) {
          if (answers[answerUUIDs[ii]]) {
            if (questions[i].type === "essayType") {
              points += parseInt(questions[i].points);
            } else if (
              questions[i].answer.toUpperCase() ===
              answers[answerUUIDs[ii]].toUpperCase()
            ) {
              points += parseInt(questions[i].points);
            }
          }
        }
      }
    }

    return points;
  };

  const getName = (email, users) => {
    const user = users.filter(user => user.email === email).slice(0, 1);

    if (user.length) {
      return `${user[0].lastName}, ${user[0].firstName} ${user[0].middleName}`;
    } else {
      return "No submission yet";
    }
  };

  const getIdNumber = (email, users) => {
    const user = users.filter(user => user.email === email).slice(0, 1);
    return user[0].idNumber;
  };

  const renderDashboard = dataLength => {
    if (dataLength) {
      return Data.map((data, i) => {
        return (
          <div key={i}>
            <Paper
              elevation={2}
              className={fixedHeightPaper}
              style={{ marginBottom: "3.5rem" }}>
              <DashboardCharts
                section={data.section}
                subject={data.subject}
                desc={data.desc}
                highestScorer={data.highestScorer}
                topScore={data.topScore}
                chartData={data.chartData}
                tableData={data.tableData}
              />
            </Paper>
          </div>
        );
      });
    } else {
      return (
        <Box pt={8} style={{ marginBottom: "3rem" }}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom>
            Yikes! No data to show yet{" "}
            <span role="img" aria-label="emoji">
              😬
            </span>
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            component="p">
            To show data, add students and exams
          </Typography>
        </Box>
      );
    }
  };

  const getTableData = (classs, exams, users) => {
    let tableData = [];

    if (!classs) {
      return;
    }

    classs.studentEnrolled.forEach((email, i) => {
      const getTotalScore = exams
        .filter(exam => exam.classCode === classs.classCode)
        .map((exam, i) => {
          let scores = [];

          exam.submittedExam.length
            ? exam.submittedExam.forEach(submission => {
                if (submission.submittedBy === email) {
                  scores.push(getScore(exam, submission.submittedBy));
                }
              })
            : scores.push(0);

          return scores;
        });

      let newData = {
        idNumber: getIdNumber(email, users),
        name: getName(email, users),
        avgScore: (
          getTotalScore.reduce(
            (acc, curVal) => parseInt(acc) + parseInt(curVal),
            0
          ) / getTotalScore.length
        ).toFixed(2),
        ttlScore: getTotalScore
          .reduce((acc, curVal) => parseInt(acc) + parseInt(curVal), 0)
          .toFixed(2),
      };
      tableData.push(newData);
    });

    // Sorts the table data
    tableData.sort((a, b) => a.ttlScore - b.ttlScore);
    // Add ranks to each data
    tableData.forEach((data, i) => (data.rank = i + 1));

    return tableData;
  };

  useState(() => {
    classServices
      .getClassAndExams(localStorage.getItem("email"))
      .then(returnedData => {
        let newSampleData = [];

        returnedData.classes.forEach(classs => {
          const examsAndAvg = returnedData.exams
            .filter(exam => exam.classCode === classs.classCode)
            .map((exam, i) => {
              let scores = [];

              exam.submittedExam.length
                ? exam.submittedExam.forEach(submission => {
                    scores.push(getScore(exam, submission.submittedBy));
                  })
                : scores.push(0);

              return {
                examname: exam.examName,
                avgscore: `${
                  scores.reduce((a, b) => a + b, 0) / scores.length
                }`,
              };
            });

          const examTopScore = returnedData.exams
            .filter(exam => exam.classCode === classs.classCode)
            .map((exam, i) => {
              let scores = [];

              exam.submittedExam.length
                ? exam.submittedExam.forEach(submission => {
                    scores.push({
                      score: getScore(exam, submission.submittedBy),
                      email: submission.submittedBy,
                    });
                  })
                : scores.push({ score: 0, email: "" });

              scores.sort((a, b) => a.score - b.score);

              return scores.pop();
            });

          newSampleData.push({
            section: classs.section,
            subject: classs.courseCode,
            desc: classs.courseDesc,
            highestScorer: examTopScore.length
              ? getName(
                  examTopScore[examTopScore.length - 1].email,
                  returnedData.users
                )
              : "No Submission yet",
            topScore: examTopScore.length
              ? examTopScore[examTopScore.length - 1].score
              : 0,
            chartData: examsAndAvg.length
              ? examsAndAvg
              : [{ examname: "No exams yet", avgscore: 0 }],
            tableData: getTableData(
              classs,
              returnedData.exams,
              returnedData.users
            ).length
              ? getTableData(classs, returnedData.exams, returnedData.users)
              : null,
          });
        });
        setData(newSampleData);
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);

  const classes = useStylesTeacherHome();
  const fixedHeightPaper = clsx(classes.paper);

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Start Hero Unit */}
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom>
          Home
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p">
          View Exam Statistics for each classes
        </Typography>
      </Container>

      {/* End hero unit */}
      <Divider style={{ marginTop: "3rem", marginBottom: "3rem" }} />

      {Data ? (
        renderDashboard(Data.length)
      ) : (
        <Grid
          container
          spacing={2}
          alignItems="center"
          justify="center"
          style={{ marginTop: "5rem" }}>
          <CircularProgress />
        </Grid>
      )}
    </div>
  );
};

export default DashboardTeacher;
