import React, { useState } from "react";
import ExamDetailsForm from "../components/ExamDetailsForm";
import ExamQuestionsForm from "../components/ExamQuestionsForm";
import useStylesForgotPassword from "../components/styles/useStylesForgotPassword";
import VerifyExamQuestions from "../components/VerifyExamQuestions";
import {
  CssBaseline,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@material-ui/core";

const steps = ["Enter exam details", "Input question pool", "Verify exam "];

const ForgotPassword = () => {
  const [examDetails, setExamDetails] = useState([]);
  const [examQuestions, setExamQuestions] = useState([]);

  const handleSubmitExamDetails = examDetail => {
    setExamDetails([...examDetails, examDetail]);
    console.log("Exam Detail :>> ", examDetail);
  };

  const handleSubmitExamQuestions = examQuestion => {
    setExamQuestions([...examQuestions, examQuestion]);
    console.log("Exam Question :>> ", examQuestion);
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
        return (
          <ExamQuestionsForm
            submitExamQuestions={handleSubmitExamQuestions}
            handleNext={handleNext}
          />
        );

      case 2:
        return (
          <VerifyExamQuestions
            questions={examQuestions}
            handleNext={handleNext}
          />
        );
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
                  Exam has been uploaded to database
                </Typography>
                <Typography variant="subtitle1">
                  It is available for students to be taken at specified time,
                  exams can be modified only before it starts
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
