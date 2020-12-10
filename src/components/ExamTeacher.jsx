import React, { useEffect, useState } from "react";
import CreateIcon from "@material-ui/icons/Create";
import classes from "../components/styles/useStylesTeacherExam";
import ExamsCard from "./ExamsCard";
import { Link } from "react-router-dom";
import examServices from "../server/services/exams";
import classServices from "../server/services/classes";
import {
  Button,
  Box,
  Fab,
  Grid,
  Typography,
  Container,
  Divider,
} from "@material-ui/core";

const ExamTeacher = ({ match }) => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const classes = classServices.getClass();

    examServices
      .getAll()
      .then(returnedData => {
        setExams(returnedData);
      })
      .catch(error => {
        console.log("Error: ", error);
      });
  }, []);

  useEffect(() => {}, [exams]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Link
        to={`${match.url}/createexam`}
        style={{ color: "inherit", textDecoration: "inherit" }}>
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
          }}>
          <CreateIcon />
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

      <Container className={classes.cardGrid} maxWidth="lg">
        <Grid container spacing={4}>
          {exams.length ? (
            exams
              .slice(0)
              .reverse()
              .map((exam, i) => <ExamsCard key={i} exam={exam} />)
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
