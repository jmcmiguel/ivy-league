import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import classes from "../components/styles/useStylesTeacherHome";
import SectionsCard from "../components/SectionsCard";
import AddSectionDialog from "../components/AddSectionDialog";
import sectionServices from "../services/classes";
import MuiAlert from "@material-ui/lab/Alert";
import {
  Container,
  Typography,
  Grid,
  Button,
  Fab,
  Divider,
  Box,
  Snackbar,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@material-ui/core";
import EnrolledStudentsDialog from "./EnrolledStudentsDialog";
import SectionRecords from "../components/SectionRecords";
import examServices from "../services/exams";

const StudentsTeacher = () => {
  const [openAddSection, setOpenAddSection] = useState(false);
  const [sections, setSections] = useState();
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [classCode, setClassCode] = useState("");
  const [open, setOpen] = useState(false);
  const [enrolledStudents, setEnrolledStudents] = useState();
  const [openEnrolledStudentsDialog, setOpenEnrolledStudentsDialog] = useState(
    false
  );
  const [exams, setExams] = useState();
  const [openRecords, setOpenRecords] = useState(false);

  const handleDelete = classCode => {
    sectionServices
      .deleteClass(classCode)
      .then(returnedData => {
        getClasses();
        setSnackbarSeverity("success");
        setSnackbarMessage("Class succesfully deleted");
        setOpenSnackbar(!openSnackbar);
      })
      .catch(err => {
        console.log("Error :>> ", err.message);
      });
  };

  const handleClickOpen = classCode => {
    setOpen(true);
    setClassCode(classCode);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleYes = () => {
    handleDelete(classCode);
    handleClose();
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleStudentsDialogOpen = enrolledStudents => {
    setEnrolledStudents(enrolledStudents);
    setOpenEnrolledStudentsDialog(true);
  };

  const handleRecordsOpen = (enrolledStudents, classCode) => {
    setEnrolledStudents(enrolledStudents);
    setClassCode(classCode);
    setOpenRecords(true);
  };

  const handleAdd = (
    courseCode,
    courseDesc,
    section,
    classCapacity,
    classCode,
    image
  ) => {
    const newSection = {
      courseCode: courseCode,
      courseDesc: courseDesc,
      section: section,
      classCapacity: classCapacity,
      classCode: classCode,
      image: image,
      prof: localStorage.getItem("email"),
    };

    sectionServices
      .create(newSection)
      .then(returnedData => {
        if (returnedData === "section already exists") {
          setSnackbarSeverity("error");
          setSnackbarMessage("A section with that subject already exists");
          setOpenSnackbar(!openSnackbar);
        } else {
          setSnackbarSeverity("success");
          setSnackbarMessage("Section created");
          setOpenSnackbar(!openSnackbar);
          setSections([...sections, newSection]);
        }
      })
      .catch(error => {
        console.log("Error: ", error);
      });
  };

  const getClasses = () => {
    sectionServices
      .getProfClass(localStorage.getItem("email"))
      .then(returnedData => {
        setSections(returnedData);
      })
      .catch(error => {
        console.log("Error: ", error);
      });
  };

  const getExams = () => {
    examServices
      .getProfExams(localStorage.getItem("email"))
      .then(returnedData => {
        setExams(returnedData);
      })
      .catch(error => {
        console.log("Error: ", error);
      });
  };

  useEffect(() => {
    getClasses();
    getExams();
  }, []);

  useEffect(() => {}, [sections]);

  const renderClasses = classesLength => {
    if (classesLength) {
      return sections
        .slice(0)
        .reverse()
        .map((section, i) => {
          return (
            <SectionsCard
              key={i}
              section={section}
              handleDialogOpen={handleClickOpen}
              handleStudentsOpen={handleStudentsDialogOpen}
              handleRecordsOpen={handleRecordsOpen}
            />
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
            Awwww. You haven't created a class yet{" "}
            <span role="img" aria-label="emoji">
              😞
            </span>
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            component="p">
            Create a class using the add button to get started
          </Typography>
        </Box>
      );
    }
  };

  return (
    <div style={{ minHeight: "100vh" }}>
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
          setOpenAddSection(true);
        }}>
        <AddIcon />
      </Fab>

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

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Delete class?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This wil delete this class and all its exams. This process is
            unreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleYes} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Records Dialog */}
      <SectionRecords
        open={openRecords}
        setOpen={setOpenRecords}
        exams={exams}
        classCode={classCode}
        enrolledStudents={enrolledStudents}
      />

      {/* Add section Dialog */}
      <AddSectionDialog
        open={openAddSection}
        setOpen={setOpenAddSection}
        handleAdd={handleAdd}
      />

      {/* Enrolled Students Dialog */}
      <EnrolledStudentsDialog
        open={openEnrolledStudentsDialog}
        setOpen={setOpenEnrolledStudentsDialog}
        enrolledStudents={enrolledStudents}
      />

      {/* Start Hero Unit */}
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom>
          Classes
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p">
          Manage your students here by creating classes in which they can enroll
          in
        </Typography>
        <div className={classes.heroButtons} style={{ marginTop: "2rem" }}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setOpenAddSection(true);
                }}>
                Create New Class
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>

      {/* End hero unit */}
      <Divider style={{ marginTop: "3rem", marginBottom: "3rem" }} />

      {/* Contents */}
      <Container
        className={classes.cardGrid}
        maxWidth="md"
        style={{ marginBottom: "3rem" }}>
        <Grid container spacing={4}>
          {sections ? (
            renderClasses(sections.length)
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

export default StudentsTeacher;
