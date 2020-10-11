import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const ForgotPasswordForm = () => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Account Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="E-Mail Address"
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="idNumber"
            name="idNumber"
            label="ID Number"
            fullWidth
            autoComplete="idNumber"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ForgotPasswordForm;
