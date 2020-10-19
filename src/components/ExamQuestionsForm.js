import React, { useState } from "react";
import { Button, Typography, Fab, Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useForm } from "react-hook-form";
import useStylesForgotPassword from "../components/styles/useStylesForgotPassword";
import ControlledTextField from "../components/ControlledTextField";

const ExamQuestionsForm = () => {
  const [questions, setQuestions] = useState([]);
  const { handleSubmit, errors, control } = useForm();
  const classes = useStylesForgotPassword();
  const handleAddQuestions = () => {
    setQuestions([...questions, 1]);
  };

  return (
    <React.Fragment>
      <Fab
        onClick={() => handleAddQuestions()}
        color="primary"
        aria-label="add"
        size="large"
        style={{
          margin: 0,
          top: "auto",
          right: 50,
          bottom: 40,
          left: "auto",
          position: "fixed",
        }}>
        <AddIcon />
      </Fab>
      <form className={classes.form} noValidate onSubmit={handleSubmit()}>
        <Typography variant="h6" gutterBottom>
          Question Pool
        </Typography>
        <div>
          {questions.map((question, i) => {
            return (
              <ControlledTextField
                name="examname"
                label="Exam Name"
                error={errors}
                control={control}
                required={true}
                rules={{ required: "this is required" }}
              />
            );
          })}
        </div>
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
