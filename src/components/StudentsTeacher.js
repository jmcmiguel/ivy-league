import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import classes from "../components/styles/useStylesTeacherHome";
import SectionsCard from "../components/SectionsCard";
import AddSectionDialog from "../components/AddSectionDialog";
import {
  Container,
  Typography,
  Grid,
  Button,
  Fab,
  Divider,
  Box,
} from "@material-ui/core";

let section = [
  {
    subject: "ITNW-1413",
    section: "NW3D",
    students: 36,
    description: "Software Engineering 1",
    image: "https://source.unsplash.com/random",
  },
  {
    subject: "ICTC-1314",
    section: "NW4B",
    students: 15,
    description: "Designs 1",
    image: "https://source.unsplash.com/random",
  },
  {
    subject: "FOLA-1234",
    section: "NW1C",
    students: 54,
    description: "Diferrential Calculus",
    image: "https://source.unsplash.com/random",
  },
];

// const sections = [];

const StudentsTeacher = () => {
  const [openAddSection, setOpenAddSection] = useState(false);
  const [sections, setSections] = useState(section);

  const handleAdd = (subject, sect, students, description) => {
    setSections([
      ...sections,
      {
        subject: subject,
        section: sect,
        students: students,
        description: description,
        image: "https://source.unsplash.com/random",
      },
    ]);
  };

  useEffect(() => {}, [sections]);

  return (
    <div>
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
          Manage students here by creating sections
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
            sections.map((section, i) => (
              <SectionsCard key={i} post={section} />
            ))
          ) : (
            <Box pt={8} style={{ marginBottom: "3rem" }}>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom>
                {` Awwww. You haven't created a section yet :(`}
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                component="p">
                Create a section using the add button
              </Typography>
            </Box>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default StudentsTeacher;
