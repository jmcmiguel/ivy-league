import React from "react";
import classes from "../components/styles/useStylesTeacherExam";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Divider,
  Button,
} from "@material-ui/core";

const ExamsCard = ({ section }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          variant={"outlined"}
          image={"https://source.unsplash.com/random"}
          title={section.title}
          style={{ height: "8rem" }}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            {section.title}
          </Typography>
          <Typography gutterBottom align="center">
            {`${section.subject} (${section.section})`}
          </Typography>
          <Typography gutterBottom align="center">
            {section.desc}
          </Typography>
          <div style={{ marginTop: "2rem" }}>
            <Divider variant="middle" />
            <Typography gutterBottom color="secondary" align="center">
              {section.tookExam === section.classCapacity
                ? "Everyone "
                : `${section.tookExam}/${section.classCapacity} `}
              has taken this exam
            </Typography>
          </div>
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
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
  );
};

export default ExamsCard;
