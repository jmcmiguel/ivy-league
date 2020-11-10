import React, { useState } from "react";
import { Button, Typography, Fab, Divider } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useForm } from "react-hook-form";
import useStylesForgotPassword from "../components/styles/useStylesForgotPassword";
import QuestionAdderDialog from "../components/QuestionAdderDialog";
import ExamPool from "./ExamPool";

const ExamQuestionsForm = () => {
  const [questions, setQuestions] = useState([]);
  const [openQuestionAdder, setOpenQuestionAdder] = useState(false);
  const { handleSubmit, errors, control } = useForm();
  const classes = useStylesForgotPassword();
  const handleAddQuestions = () => {
    setOpenQuestionAdder(true);
  };

  const handleAdd = newQuestion => {
    setQuestions([...questions, newQuestion]);
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

      <QuestionAdderDialog
        handleAdd={handleAdd}
        open={openQuestionAdder}
        setOpen={setOpenQuestionAdder}
      />

      <form className={classes.form} noValidate onSubmit={handleSubmit()}>
        <Typography variant="h6" gutterBottom>
          Question Pool
        </Typography>
        <Divider />
        <div>
          {questions.map((question, i) => {
            return (
              <ExamPool
                key={i}
                question={question}
                index={i}
                errors={errors}
                control={control}
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
