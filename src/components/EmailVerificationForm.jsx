import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const PaymentForm = () => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        An email has been sent to your account
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="code"
            label="Enter verification code"
            placeholder="XXX-XXX"
            helperText="Please wait at least a minute before resending verification"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}></Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PaymentForm;
