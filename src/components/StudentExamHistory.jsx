import React from "react";
import { Container, Typography, Divider } from "@material-ui/core";

const StudentExamHistory = () => {
  return (
    <div>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom>
          History
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p">
          See previous exam records here
        </Typography>
      </Container>
      <Divider style={{ marginTop: "3rem", marginBottom: "3rem" }} />
    </div>
  );
};

export default StudentExamHistory;
