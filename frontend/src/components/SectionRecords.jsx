import React, { useState, useEffect } from "react";
import userServices from "../services/users";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const SectionRecords = ({
  open,
  setOpen,
  enrolledStudents,
  exams,
  classCode,
}) => {
  const [users, setUsers] = useState();

  const handleClose = () => {
    setOpen(false);
    setUsers();
  };

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

    const answerUUIDs = answers ? Object.keys(answers) : null;

    if (!answerUUIDs) {
      return "N/A";
    }

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

  const renderStudentsEnrolled = usersLength => {
    if (usersLength) {
      const columns = exams
        .filter(exam => exam.classCode === classCode)
        .map((exam, i) => {
          const id = i;
          const examName = `${exam.examName}`;
          return { id, examName, exam };
        });

      const rows = users.map((user, i) => {
        const id = i;
        const name = `${user.lastName}, ${user.firstName} ${user.middleName}`;
        const email = user.email;
        const idNumber = user.idNumber;

        return { id, name, email, idNumber };
      });

      return (
        <Grid item xs={12}>
          <Paper>
            <div>
              <Table size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>ID Number</TableCell>
                    {columns.map((column, i) => (
                      <TableCell key={i}>{column.examName}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <TableRow key={row.id}>
                      <TableCell>{users ? row.name : <Skeleton />}</TableCell>
                      <TableCell>
                        {users ? row.idNumber : <Skeleton />}
                      </TableCell>
                      {columns.map((column, i) => (
                        <TableCell key={i}>
                          {getScore(column.exam, row.email) === "N/A"
                            ? "N/A"
                            : `${getScore(
                                column.exam,
                                row.email
                              )} / ${getTotalScore(column.exam)}`}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Paper>
        </Grid>
      );
    } else {
      return <Typography variant="body1">No students enrolled yet</Typography>;
    }
  };

  useEffect(() => {
    userServices
      .getAll()
      .then(users => {
        setUsers(
          users.filter(user =>
            enrolledStudents.some(
              enrolledStudent => enrolledStudent === user.email
            )
          )
        );
      })
      .catch(err => console.log(err.message));
  }, [enrolledStudents]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      maxWidth="lg"
      fullWidth={true}>
      <DialogTitle id="form-dialog-title">Students Records</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} direction="column">
          {users ? (
            renderStudentsEnrolled(users.length)
          ) : (
            <Skeleton width="100%" />
          )}
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

export default SectionRecords;
