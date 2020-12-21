import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";

const ExamScoresTable = ({ title, exam }) => {
  const getTotalScore = exam => {
    const total = exam.questions.reduce((acc, cur) => ({
      points: parseInt(acc.points) + parseInt(cur.points),
    }));

    return total.points;
  };

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
          if (questions[i].answer === answers[answerUUIDs[ii]]) {
            points += parseInt(questions[i].points);
          } else if (questions[i].type === "essayType") {
            points += parseInt(questions[i].points);
          }
        }
      }
    }

    return points;
  };

  const rows = exam.submittedExam.map((submission, i) => {
    const id = i;
    const name = submission.submittedBy;
    const score = getScore(exam, submission.submittedBy);
    const totalScore = getTotalScore(exam);
    return { id, name, score, totalScore };
  });

  return (
    <React.Fragment>
      <Title>{title}</Title>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Score</TableCell>
            <TableCell align="right">Max Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.score}</TableCell>
              <TableCell align="right">{row.totalScore}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default ExamScoresTable;
