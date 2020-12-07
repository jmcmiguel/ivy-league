import React, { useState } from "react";
import ExamDetailsForm from "../components/ExamDetailsForm";
import ExamQuestionsForm from "../components/ExamQuestionsForm";
import useStylesForgotPassword from "../components/styles/useStylesForgotPassword";
import VerifyExamQuestions from "../components/VerifyExamQuestions";
import examServices from "../server/services/exams";
import { Link } from "react-router-dom";
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
  const [examDetails, setExamDetails] = useState({});
  const [examQuestions, setExamQuestions] = useState([]);
  const classes = useStylesForgotPassword();
  const [activeStep, setActiveStep] = useState(0);

  const handleSubmitExamDetails = examDetail => {
    setExamDetails(examDetail);
  };

  const handleSubmitExamQuestions = examQuestion => {
    setExamQuestions(examQuestion);
  };

  const handleSubmitQuestions = questions => {
    const newExam = {
      uuid: examDetails.uuid,
      examName: examDetails.examName,
      examDesc: examDetails.examDesc,
      classCode: examDetails.classCode,
      sched: examDetails.sched,
      deadline: examDetails.deadline,
      submittedExam: [],
      isChecked: false,
      questions: examQuestions,
    };

    examServices
      .create(newExam)
      .then(returnedData => {
        if (returnedData !== "exam uuid already exists") {
          console.log("Exam inserted into database");
        }
      })
      .catch(error => {
        console.log("error :>> ", error);
      });
  };

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
            submitQuestions={handleSubmitQuestions}
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
                  It is available for students to be taken at specified time.
                  Exams can be modified only before it starts.{" "}
                  <Link to="/teacher">Click here to return to dashboard</Link>
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
