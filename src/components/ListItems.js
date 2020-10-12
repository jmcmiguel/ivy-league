import React from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import AssignmentIcon from "@material-ui/icons/Assignment";
import CreateIcon from "@material-ui/icons/Create";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
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
              <ListItemText primary="Students" />
            </ListItem>
          </Link>
        </div>
      </List>

      <Divider />

      <List>
        <div>
          <ListSubheader inset>Saved reports</ListSubheader>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="ICTC-1213(NW3D)" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="ICTC-1213(NW3A)" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="ITNW-0453(NW4B)" />
          </ListItem>
        </div>
      </List>

      <Divider />

      <List>
        <div>
          <div>
            <ListSubheader inset>Account Settings</ListSubheader>
            <Link to={`${match.url}/account`} style={{ all: "inherit" }}>
              <ListItem button>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="My Account" />
              </ListItem>
            </Link>
            <Link to="/" style={{ all: "inherit" }}>
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
