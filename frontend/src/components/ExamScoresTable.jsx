import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import userServices from "../services/users";
import { Skeleton } from "@material-ui/lab";
import { format, parseISO } from "date-fns";

const ExamScoresTable = ({ title, exam }) => {
  const [users, setUsers] = useState();

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

  const getName = email => {
    let fullName = "";

    users.forEach(user => {
      if (user.email === email) {
        fullName = `${user.lastName}, ${user.firstName} ${user.middleName}`;
      }
    });

    return fullName;
  };

  useEffect(() => {
    userServices
      .getAll()
      .then(users => setUsers(users))
      .catch(err => console.log(err.message));
  }, []);

  const rows = exam.submittedExam.map((submission, i) => {
    const id = i;
    const name = submission.submittedBy;
    const score = getScore(exam, submission.submittedBy);
    const totalScore = getTotalScore(exam);
    const dateSubmitted = format(
      parseISO(submission.submissionDate),
      "hh:mm:ss aaa MMMM dd, yyyy"
    );
    return { id, name, score, totalScore, dateSubmitted };
  });

  return (
    <div>
      <Title>{title}</Title>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Score</TableCell>
            <TableCell>Date Submitted</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{users ? getName(row.name) : <Skeleton />}</TableCell>
              <TableCell>{`${row.score} / ${row.totalScore}`}</TableCell>
              <TableCell>{`${row.dateSubmitted}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExamScoresTable;
