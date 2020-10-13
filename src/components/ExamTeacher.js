import React from "react";
import Copyright from "../components/Copyright";
import AddIcon from "@material-ui/icons/Add";
import classes from "../components/styles/useStylesTeacherExam";
import {
  Button,
  Box,
  Fab,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Container,
  Divider,
} from "@material-ui/core";

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

const ExamTeacher = () => {
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

      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {cards.map((card, i) => (
            <Grid item key={i} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={card.image}
                  title={card.altText}
                />
                <CardContent className={classes.cardContent}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    align="center">
                    {card.title}
                  </Typography>
                  <Typography gutterBottom align="center">
                    {card.desc}
                  </Typography>
                  <div style={{ marginTop: "2rem" }}>
                    <Divider variant="middle" />
                    <Typography gutterBottom color="secondary" align="center">
                      {card.status}
                    </Typography>
                  </div>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    View
                  </Button>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                  <Button size="small" color="primary">
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box pt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
};

export default ExamTeacher;
