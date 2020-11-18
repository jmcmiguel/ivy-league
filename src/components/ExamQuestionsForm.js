import React, { useState } from "react";
import { Button, Typography, Fab, Divider } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useForm } from "react-hook-form";
import useStylesForgotPassword from "../components/styles/useStylesForgotPassword";
import QuestionAdderDialog from "../components/QuestionAdderDialog";
import ExamPool from "./ExamPool";
import { v4 as uuidv4 } from "uuid";

const ExamQuestionsForm = ({ submitExamQuestions, handleNext }) => {
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

  const onSubmit = formData => {
    const totalItems = questions.reduce(
      (acc, question) => parseInt(acc) + parseInt(question.noitems),
      0
    );

    let transformedQuestions = [];
    let formDataClone = formData;

    console.log("formData :>> ", formData);

    for (let ii = 0; ii < totalItems; ii++) {
      let dummyObj = {};
      let choices = [];
      let dummyIndex = 0;
      let dummyI = 0;

      for (const key in formDataClone) {
        if (formDataClone.hasOwnProperty(key)) {
          outerloop: for (let index = 0; index < questions.length; index++) {
            for (let i = 1; i <= questions[index].noitems; i++) {
              // Multiple choice
              if (key === `Set${index}|Question${i}|multichoice`) {
                dummyObj.points = questions[index].points;
                dummyObj.type = "multipleChoice";
                dummyObj.question = formDataClone[key];
                dummyObj.answer =
                  formDataClone[`Set${index}|Answer${i}|Answer`];
                choices[0] = {
                  label: formDataClone[`Set${index}|Choice${i}|c1`],
                  value: "a",
                };
                choices[1] = {
                  label: formDataClone[`Set${index}|Choice${i}|c2`],
                  value: "b",
                };
                choices[2] = {
                  label: formDataClone[`Set${index}|Choice${i}|c3`],
                  value: "c",
                };
                choices[3] = {
                  label: formDataClone[`Set${index}|Choice${i}|c4`],
                  value: "d",
                };

                dummyI = i;
                dummyIndex = index;

                break outerloop;
              }
            }
          }
        }
      }

      dummyObj.uuid = uuidv4();
      dummyObj.choices = choices;
      transformedQuestions.push(dummyObj);
      delete formDataClone[`Set${dummyIndex}|Question${dummyI}|multichoice`];
      delete formDataClone[`Set${dummyIndex}|Answer${dummyI}|Answer`];
      delete formDataClone[`Set${dummyIndex}|Choice${dummyI}|c1`];
      delete formDataClone[`Set${dummyIndex}|Choice${dummyI}|c2`];
      delete formDataClone[`Set${dummyIndex}|Choice${dummyI}|c3`];
      delete formDataClone[`Set${dummyIndex}|Choice${dummyI}|c4`];
      console.log("formData :>> ", formData);
    }

    submitExamQuestions(transformedQuestions);
    handleNext();
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
          right: "2rem",
          bottom: "5rem",
          position: "fixed",
        }}>
        <AddIcon />
      </Fab>

      <QuestionAdderDialog
        handleAdd={handleAdd}
        open={openQuestionAdder}
        setOpen={setOpenQuestionAdder}
      />

      <form
        className={classes.form}
        noValidate
        onSubmit={handleSubmit(onSubmit)}>
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
                errors={errors}
                control={control}
                index={i}
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
