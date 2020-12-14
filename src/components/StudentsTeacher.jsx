import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import classes from "../components/styles/useStylesTeacherHome";
import SectionsCard from "../components/SectionsCard";
import AddSectionDialog from "../components/AddSectionDialog";
import sectionServices from "../server/services/classes";
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
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const StudentsTeacher = () => {
  const [openAddSection, setOpenAddSection] = useState(false);
  const [sections, setSections] = useState();
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
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

  useEffect(() => {
    sectionServices
      .getProfClass(localStorage.getItem("email"))
      .then(returnedData => {
        setSections(returnedData);
      })
      .catch(error => {
        console.log("Error: ", error);
      });
  }, []);

  useEffect(() => {}, [sections]);

  const renderClasses = classesLength => {
    if (classesLength) {
      return sections
        .slice(0)
        .reverse()
        .map((section, i) => {
          return <SectionsCard key={i} section={section} />;
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
            {`Awwww. You haven't created a class yet :(`}
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
      <AddSectionDialog
        open={openAddSection}
        setOpen={setOpenAddSection}
        handleAdd={handleAdd}
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
            <Grid item>
              <Button variant="outlined" color="primary">
                View Reports
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
      {/* End hero unit */}
      <Divider style={{ marginTop: "3rem", marginBottom: "3rem" }} />
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {sections ? (
            renderClasses(sections.length)
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Skeleton variant="rect" height="12.625rem" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Skeleton variant="rect" height="12.625rem" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Skeleton variant="rect" height="12.625rem" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Skeleton variant="rect" height="12.625rem" />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default StudentsTeacher;
