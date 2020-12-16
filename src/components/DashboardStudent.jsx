import React from "react";
import classes from "../components/styles/useStylesTeacherHome";
import {
  Container,
  Typography,
  Grid,
  Button,
  Divider,
  Fab,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const DashboardStudent = () => {
  return (
    <div>
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
        }}>
        <AddIcon />
      </Fab>

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
              <Button variant="contained" color="primary">
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
