import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { Link } from "react-router-dom";
import CreateIcon from "@material-ui/icons/Create";
import HomeIcon from "@material-ui/icons/Home";
import HistoryIcon from "@material-ui/icons/History";

const useStyles = makeStyles({
  root: {
    minWidth: "100vw",
    bottom: 0,
    position: "fixed",
    zIndex: 1,
  },
});

export default function StudentBottomNav({ match }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}>
      <BottomNavigationAction
        label="Home"
        icon={<HomeIcon />}
        component={Link}
        to={`${match.url}`}
      />
      <BottomNavigationAction
        label="Exams"
        icon={<CreateIcon />}
        component={Link}
        to={`${match.url}/exams`}
      />
      <BottomNavigationAction
        label="History"
        icon={<HistoryIcon />}
        component={Link}
        to={`${match.url}/examhistory`}
      />
    </BottomNavigation>
  );
}
