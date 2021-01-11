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
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import EnrolledStudentsTable from "./EnrolledStudentsTable";

const EnrolledStudentsDialog = ({ open, setOpen, enrolledStudents }) => {
  const [users, setUsers] = useState();

  const handleClose = () => {
    setOpen(false);
    setUsers();
  };

  const renderStudentsEnrolled = usersLength => {
    if (usersLength) {
      return (
        <Grid item xs={12}>
          <Paper>
            <EnrolledStudentsTable users={users} />
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
      maxWidth="md"
      fullWidth={true}>
      <DialogTitle id="form-dialog-title">Enrolled Students</DialogTitle>
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

export default EnrolledStudentsDialog;
