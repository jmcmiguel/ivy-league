import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import classes from "../components/styles/useStylesTeacherHome";
import SectionsCard from "../components/SectionsCard";
import AddSectionDialog from "../components/AddSectionDialog";
import sectionServices from "../server/services/sections";
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

const StudentsTeacher = () => {
  const [openAddSection, setOpenAddSection] = useState(false);
  const [sections, setSections] = useState([]);
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleAdd = (
    subject,
    sect,
    classCapacity,
    description,
    classCode,
    image
  ) => {
    const newSection = {
      subject: subject,
      section: sect,
      classCapacity: classCapacity,
      description: description,
      classCode: classCode,
      image: image,
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
      .getAll()
      .then(returnedData => {
        setSections(returnedData);
      })
      .catch(error => {
        console.log("Error: ", error);
      });
  }, []);

  useEffect(() => {}, [sections]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Box zIndex="tooltip" position="absolute">
        <Fab
          color="primary"
          aria-label="add"
          size="large"
          style={{
            margin: 0,
            top: "auto",
            right: 50,
            bottom: 40,
            left: "auto",
            position: "fixed",
          }}
          onClick={() => {
            setOpenAddSection(true);
          }}>
          <AddIcon />
        </Fab>
      </Box>

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
          Students
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p">
          Manage students here by creating sections in which students can enroll
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
                Create New Section
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

      <Divider style={{ marginTop: "3rem", marginBottom: "4rem" }} />

      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {sections.length ? (
            sections
              .slice(0)
              .reverse()
              .map((section, i) => {
                return <SectionsCard key={i} section={section} />;
              })
          ) : (
            <Box pt={8} style={{ marginBottom: "3rem" }}>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom>
                {`Awwww. You haven't created a section yet :(`}
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                component="p">
                Create a section using the add button to get started
              </Typography>
            </Box>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default StudentsTeacher;
