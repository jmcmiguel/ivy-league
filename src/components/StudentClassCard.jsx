import React, { useState } from "react";
import userServices from "../server/services/users";
import {
  makeStyles,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Hidden,
  CardActionArea,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles({
  card: {
    display: "flex",
  },
  cardDetails: {
    flexGrow: 1,
  },
  cardMedia: {
    width: 160,
  },
});

const SectionsCard = ({ section }) => {
  const classes = useStyles();
  const [profName, setProfName] = useState();

  // Get Prof Name
  userServices
    .getUser(section.prof)
    .then(user => {
      setProfName(`${user.firstName} ${user.middleName} ${user.lastName}`);
    })
    .catch(err => console.log(err.message));

  return (
    <Grid item xs={12} md={6}>
      <Card className={classes.card}>
        <CardActionArea>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {`${section.courseCode} (${section.section})`}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" paragraph>
                {section.courseDesc}
              </Typography>
              <Typography variant="subtitle1">
                {profName ? `Professor: ${profName}` : <Skeleton />}
              </Typography>
            </CardContent>
          </div>
        </CardActionArea>

        <Hidden xsDown>
          <CardMedia className={classes.cardMedia} image={section.image} />
        </Hidden>
      </Card>
    </Grid>
  );
};

export default SectionsCard;
