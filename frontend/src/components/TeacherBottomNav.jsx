import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { Link } from "react-router-dom";
import PeopleIcon from "@material-ui/icons/People";
import CreateIcon from "@material-ui/icons/Create";
import DashboardIcon from "@material-ui/icons/Dashboard";

const useStyles = makeStyles({
  root: {
    minWidth: "100vw",
    bottom: 0,
    position: "fixed",
    zIndex: 1,
  },
});

export default function TeacherBottomNav({ match }) {
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
        label="Dashboard"
        icon={<DashboardIcon />}
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
        label="Classes"
        icon={<PeopleIcon />}
        component={Link}
        to={`${match.url}/students`}
      />
    </BottomNavigation>
  );
}
