import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <RouterLink
        to="/"
        style={{ color: "inherit", textDecoration: "inherit" }}>
        BPSU Online Examination System
      </RouterLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
