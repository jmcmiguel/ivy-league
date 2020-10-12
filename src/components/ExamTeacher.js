import React from "react";
import { Button, Box } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../components/Copyright";

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [
  {
    image: "https://source.unsplash.com/random",
    altText: "Alternative Text 1",
    title: "Exam 1",
    desc: "ICTC-1213 (NW3D)",
  },
  {
    image: "https://source.unsplash.com/random",
    altText: "Alternative Text 2",
    title: "Exam 1",
    desc: "ICTC-1413 (NW3D)",
  },
  {
    image: "https://source.unsplash.com/random",
    altText: "Alternative Text 3",
    title: "Exam 3",
    desc: "ICTC-1213 (NW3D)",
  },
  {
    image: "https://source.unsplash.com/random",
    altText: "Alternative Text 1",
    title: "Exam 1",
    desc: "ICTC-1213 (NW3D)",
  },
  {
    image: "https://source.unsplash.com/random",
    altText: "Alternative Text 1",
    title: "Exam 1",
    desc: "ICTC-1213 (NW3D)",
  },
  {
    image: "https://source.unsplash.com/random",
    altText: "Alternative Text 1",
    title: "Exam 1",
    desc: "ICTC-1213 (NW3D)",
  },
];

const ExamTeacher = () => {
  const classes = useStyles();

  return (
    <div>
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
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}

        <Grid container spacing={4}>
          {cards.map(card => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={card.image}
                  title={card.altText}
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {card.title}
                  </Typography>
                  <Typography>{card.desc}</Typography>
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
