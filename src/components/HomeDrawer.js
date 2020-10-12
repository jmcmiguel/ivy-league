import React from "react";
import clsx from "clsx";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import useStylesTeacherHome from "./styles/useStylesTeacherHome";
import { Drawer, IconButton } from "@material-ui/core";
import ListItems from "../components/ListItems";

const HomeDrawer = ({ open, handleDrawerClose, match }) => {
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
      <ListItems match={match} />
    </Drawer>
  );
};

export default HomeDrawer;
