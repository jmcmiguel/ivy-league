import React from "react";
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
import classes from "../components/styles/useStylesTeacherExam";

const ExamsCard = ({ key, section }) => {
  return (
    <Grid item key={key} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          variant={"outlined"}
          image={section.image}
          title={section.altText}
          style={{ height: "8rem" }}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            {section.title}
          </Typography>
          <Typography gutterBottom align="center">
            {section.desc}
          </Typography>
          <div style={{ marginTop: "2rem" }}>
            <Divider variant="middle" />
            <Typography gutterBottom color="secondary" align="center">
              {section.status}
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
  );
};

export default ExamsCard;
