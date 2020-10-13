import React from "react";
import { Container, Typography, Grid, Button, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import classes from "../components/styles/useStylesTeacherHome";

const StudentsTeacher = () => {
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
          Students
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button variant="contained" color="primary">
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
    </div>
  );
};

export default StudentsTeacher;
