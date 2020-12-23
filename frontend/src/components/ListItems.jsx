import React from "react";
import PeopleIcon from "@material-ui/icons/People";
import CreateIcon from "@material-ui/icons/Create";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { Link } from "react-router-dom";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  List,
  Divider,
} from "@material-ui/core";

const ListItems = ({ match }) => {
  return (
    <>
      <Divider />
      <List>
        <div>
          <ListSubheader inset>Student Management</ListSubheader>
          <Link to={`${match.url}`} style={{ all: "inherit" }}>
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
          <Link to={`${match.url}/exams`} style={{ all: "inherit" }}>
            <ListItem button>
              <ListItemIcon>
                <CreateIcon />
              </ListItemIcon>
              <ListItemText primary="Exams" />
            </ListItem>
          </Link>

          <Link to={`${match.url}/students`} style={{ all: "inherit" }}>
            <ListItem button>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Classes" />
            </ListItem>
          </Link>
        </div>
      </List>

      <Divider />

      <List>
        <div>
          <div>
            <Link
              to="/"
              style={{ all: "inherit" }}
              onClick={() => {
                localStorage.clear();
                window.location.replace("/");
              }}>
              <ListItem button>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Log Out" />
              </ListItem>
            </Link>
          </div>
        </div>
      </List>
    </>
  );
};

export default ListItems;
