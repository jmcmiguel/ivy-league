import React, { useState, useEffect } from "react";
import classes from "../components/styles/useStylesTeacherHome";
import MuiAlert from "@material-ui/lab/Alert";
import AddIcon from "@material-ui/icons/Add";
import JoinClassDialog from "../components/JoinClassDialog";
import classServices from "../services/classes";
import StudentClassCard from "../components/StudentClassCard";
import {
  Container,
  Typography,
  Grid,
  Button,
  Divider,
  Fab,
  Snackbar,
  Box,
  CircularProgress,
} from "@material-ui/core";

const DashboardStudent = () => {
  const [openJoinClass, setOpenJoinClass] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [studentClasses, setStudentClasses] = useState();

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const getStudentClasses = () => {
    classServices
      .getStudentClass(localStorage.getItem("email"))
      .then(newStudentClasses => {
        setStudentClasses(newStudentClasses);
      })
      .catch(err => {
        console.log(err.message);
      });
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
            getStudentClasses();
          })
          .catch(err => {
            console.log("Error :>> ", err.message);
          });
      }
    });
  };

  const renderDashboard = studentsClassesLength => {
    if (studentsClassesLength) {
      return studentClasses
        .slice()
        .reverse()
        .map((section, i) => {
          return <StudentClassCard key={i} section={section} />;
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
            Heeey, why haven't you joined a class yet?{" "}
            <span role="img" aria-label="emoji">
              😟
            </span>
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            component="p">
            Join a class using the join class button
          </Typography>
        </Box>
      );
    }
  };

  useEffect(() => {
    getStudentClasses();
  }, []);

  useEffect(() => {}, [studentClasses]);

  return (
    <div style={{ minHeight: "100vh" }}>
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

      {/* Title */}
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
          Oversee your statistics and enrolled classes here
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

      {/* Contents */}
      <Container
        className={classes.cardGrid}
        maxWidth="md"
        style={{ marginBottom: "3rem" }}>
        <Grid container spacing={4}>
          {studentClasses ? (
            renderDashboard(studentClasses.length)
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
        </Grid>
      </Container>
    </div>
  );
};

export default DashboardStudent;
