import React from "react";
import clsx from "clsx";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import useStylesTeacherHome from "./styles/useStylesTeacherHome";

const HomeAppBar = ({ open, handleDrawerOpen, name }) => {
  const classes = useStylesTeacherHome();

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, open && classes.appBarShift)}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(
            classes.menuButton,
            open && classes.menuButtonHidden
          )}>
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}>
          {`Welcome Student ${localStorage.getItem("lastName")}!`}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default HomeAppBar;
