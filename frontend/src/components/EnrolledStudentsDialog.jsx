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
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const EnrolledStudentsDialog = ({ open, setOpen, enrolledStudents }) => {
  const [users, setUsers] = useState();

  const handleClose = () => {
    setOpen(false);
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
      aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Enrolled Students</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {users ? (
            users.map((user, i) => {
              return (
                <Typography variant="body1" key={i}>
                  {`${i + 1}.) ${user.lastName}, ${user.firstName} ${
                    user.middleName
                  }`}
                </Typography>
              );
            })
          ) : (
            <Skeleton width="100%" />
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EnrolledStudentsDialog;
