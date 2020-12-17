import React, { useState } from "react";
import classes from "../components/styles/useStylesTeacherHome";
import {
  Container,
  Typography,
  Grid,
  Button,
  Divider,
  Fab,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import AddIcon from "@material-ui/icons/Add";
import JoinClassDialog from "../components/JoinClassDialog";
import classServices from "../server/services/classes";

const DashboardStudent = () => {
  const [openJoinClass, setOpenJoinClass] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleAdd = classCode => {
    classServices.getStudents(classCode).then(students => {
      if (students.includes(localStorage.getItem("email"))) {
        setSnackbarSeverity("error");
        setSnackbarMessage("Already enrolled in that class");
        setOpenSnackbar(!openSnackbar);
      } else {
        classServices
          .addStudent(classCode, localStorage.getItem("email"))
          .then(returnedData => {
            setSnackbarSeverity("success");
            setSnackbarMessage("Class enrolled succesfully");
            setOpenSnackbar(!openSnackbar);
          })
          .catch(err => {
            console.log("Error :>> ", err.message);
          });
      }
    });
  };

  return (
    <div>
      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}>
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        size="medium"
        style={{
          margin: 0,
          top: "auto",
          right: "2rem",
          bottom: "5rem",
          position: "fixed",
        }}
        onClick={() => {
          setOpenJoinClass(true);
        }}>
        <AddIcon />
      </Fab>

      {/* Join Class Dialog */}
      <JoinClassDialog
        open={openJoinClass}
        setOpen={setOpenJoinClass}
        handleAdd={handleAdd}
      />

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
          Oversee your statistics here
        </Typography>
        <div className={classes.heroButtons} style={{ marginTop: "2rem" }}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setOpenJoinClass(true);
                }}>
                Join New Class
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
      <Divider style={{ marginTop: "3rem", marginBottom: "3rem" }} />
    </div>
  );
};

export default DashboardStudent;
