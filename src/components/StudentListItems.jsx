import React from "react";
import CreateIcon from "@material-ui/icons/Create";
import HomeIcon from "@material-ui/icons/Home";
import HistoryIcon from "@material-ui/icons/History";
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

const StudentListItems = ({ match }) => {
  return (
    <>
      <Divider />
      <List>
        <div>
          <ListSubheader inset>Menu</ListSubheader>
          <Link to={`${match.url}`} style={{ all: "inherit" }}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
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

          <Link to={`${match.url}/examhistory`} style={{ all: "inherit" }}>
            <ListItem button>
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary="History" />
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

export default StudentListItems;
