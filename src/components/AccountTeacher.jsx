import React from "react";
import { Container, Typography } from "@material-ui/core";

const AccountTeacher = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Start Hero Unit */}
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom>
          Your Account
        </Typography>
      </Container>
      {/* End hero unit */}
    </div>
  );
};

export default AccountTeacher;
