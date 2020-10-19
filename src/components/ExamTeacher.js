import React from "react";
import AddIcon from "@material-ui/icons/Add";
import classes from "../components/styles/useStylesTeacherExam";
import ExamsCard from "./ExamsCard";
import { Link } from "react-router-dom";
import {
  Button,
  Box,
  Fab,
  Grid,
  Typography,
  Container,
  Divider,
} from "@material-ui/core";

const cards = [
  {
    title: "Exam 1",
    desc: "Programming 1",
    subject: "ICTC-1213",
    section: "NW3D",
    tookExam: 50,
    classCapacity: 50,
  },
  {
    title: "Exam 1",
    desc: "Mobile Dev",
    subject: "ICTC-1413",
    section: "NW3D",
    tookExam: 50,
    classCapacity: 50,
  },
  {
    title: "Exam 1",
    desc: "Designs 1",
    subject: "ICTC-1234",
    section: "NW3D",
    tookExam: 10,
    classCapacity: 50,
  },
];

const ExamTeacher = ({ match }) => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Link
        to={`${match.url}/createexam`}
        style={{ color: "inherit", textDecoration: "inherit" }}>
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
      </Link>

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
                <Link
                  to={`${match.url}/createexam`}
                  style={{ color: "inherit", textDecoration: "inherit" }}>
                  Create New Exam
                </Link>
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
