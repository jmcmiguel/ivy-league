import React from "react";
import AddIcon from "@material-ui/icons/Add";
import classes from "../components/styles/useStylesTeacherExam";
import {
  Button,
  Box,
  Fab,
  Grid,
  Typography,
  Container,
  Divider,
} from "@material-ui/core";
import ExamsCard from "./ExamsCard";

const cards = [
  {
    image: "https://source.unsplash.com/random",
    altText: "Alternative Text 1",
    title: "Exam 1",
    desc: "ICTC-1213 (NW3D)",
    status: "Everyone has taken this exam",
  },
  {
    image: "https://source.unsplash.com/random",
    altText: "Alternative Text 2",
    title: "Exam 1",
    desc: "ICTC-1413 (NW3D)",
    status: "3 more people has not taken this exam",
  },
  {
    image: "https://source.unsplash.com/random",
    altText: "Alternative Text 3",
    title: "Exam 3",
    desc: "ICTC-1213 (NW3D)",
    status: "Exam not yet published",
  },
  {
    image: "https://source.unsplash.com/random",
    altText: "Alternative Text 1",
    title: "Exam 1",
    desc: "ICTC-1213 (NW3D)",
    status: "No one has taken this exam yet",
  },
  {
    image: "https://source.unsplash.com/random",
    altText: "Alternative Text 1",
    title: "Exam 1",
    desc: "ICTC-1213 (NW3D)",
    status: "Everyone has taken this exam",
  },
  {
    image: "https://source.unsplash.com/random",
    altText: "Alternative Text 1",
    title: "Exam 1",
    desc: "ICTC-1213 (NW3D)",
    status: "Everyone has taken this exam",
  },
];

// const cards = [];

const ExamTeacher = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
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
        }}>
        <AddIcon />
      </Fab>

      {/* Start Hero Unit */}
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom>
          Exams
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button variant="contained" color="primary">
                Create New Exam
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
          {cards.length ? (
            cards
              .slice(0)
              .reverse()
              .map((card, i) => <ExamsCard key={i} section={card} />)
          ) : (
            <Box pt={8} style={{ marginBottom: "3rem" }}>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom>
                {`Yikes! you haven't created an exam yet :/`}
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                component="p">
                Create an exam using the add button
              </Typography>
            </Box>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default ExamTeacher;
