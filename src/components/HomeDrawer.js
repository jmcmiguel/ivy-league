import React from "react";
import clsx from "clsx";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Drawer, Divider, List, IconButton } from "@material-ui/core";
import {
  mainListItems,
  secondaryListItems,
  tertiaryListItems,
} from "../components/listItems";
import useStylesTeacherHome from "./styles/useStylesTeacherHome";

const HomeDrawer = ({ open, handleDrawerClose }) => {
  const classes = useStylesTeacherHome();
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}>
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>{mainListItems}</List>
      <Divider />
      <List>{secondaryListItems}</List>
      <Divider />
      <List>{tertiaryListItems}</List>
    </Drawer>
  );
};

export default HomeDrawer;
