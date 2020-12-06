import React from "react";
import { Button, Typography, Divider } from "@material-ui/core";
import useStylesForgotPassword from "./styles/useStylesForgotPassword";
import VerifyQuestions from "./VerifyQuestions";

const ExamQuestionsForm = ({ questions, handleNext }) => {
  const classes = useStylesForgotPassword();

  return (
    <React.Fragment>
      <form className={classes.form} noValidate>
        <Typography variant="h6" gutterBottom>
          Verify Questions
        </Typography>
        <Divider />

        <VerifyQuestions questions={questions} />

        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}>
            Next
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default ExamQuestionsForm;
