import React from "react";
import clsx from "clsx";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import useStylesTeacherHome from "./styles/useStylesTeacherHome";
import { Drawer, IconButton } from "@material-ui/core";
import ListItems from "../components/ListItems";
import StudentListItems from "../components/StudentListItems";

const HomeDrawer = ({ open, handleDrawerClose, match, listItems }) => {
  const classes = useStylesTeacherHome();
  return (
    <Drawer
      variant="temporary"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}>
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      {listItems === "Student" ? (
        <StudentListItems match={match} />
      ) : (
        <ListItems match={match} />
      )}
    </Drawer>
  );
};

export default HomeDrawer;
