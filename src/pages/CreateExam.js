import React, { useState } from "react";
import ExamDetailsForm from "../components/ExamDetailsForm";
import EmailVerificationForm from "../components/EmailVerificationForm";
import useStylesForgotPassword from "../components/styles/useStylesForgotPassword";
import {
  CssBaseline,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@material-ui/core";

const steps = ["Enter exam details", "Input exam data", "Verify exam "];

const ForgotPassword = () => {
  const [formDatas, setFormDatas] = useState([]);

  const handleSubmitExamDetails = formData => {
    setFormDatas(...formDatas, formData);
    console.log(formData);
  };
  const classes = useStylesForgotPassword();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <ExamDetailsForm
            submitExamDetails={handleSubmitExamDetails}
            handleNext={handleNext}
          />
        );
      case 1:
        return <EmailVerificationForm />;
      default:
        throw new Error("Unknown step");
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Exam Creation
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
              <React.Fragment>{getStepContent(activeStep)}</React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
};

export default ForgotPassword;
