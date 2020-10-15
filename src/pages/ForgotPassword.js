import React from "react";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import EmailVerificationForm from "../components/EmailVerificationForm";
import Copyright from "../components/Copyright";
import useStylesForgotPassword from "../components/styles/useStylesForgotPassword";
import {
  CssBaseline,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from "@material-ui/core";

const steps = ["Enter account details", "Wait for email verification"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <ForgotPasswordForm />;
    case 1:
      return <EmailVerificationForm />;
    default:
      throw new Error("Unknown step");
  }
}

const ForgotPassword = () => {
  const classes = useStylesForgotPassword();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Account Recovery
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Your account has been restored
                </Typography>
                <Typography variant="subtitle1">
                  You have succesfully restored your account
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}>
                    {activeStep === steps.length - 1 ? "Confirm" : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
};

export default ForgotPassword;
