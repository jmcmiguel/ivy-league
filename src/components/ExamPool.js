import React, { useState } from "react";
import ControlledTextField from "../components/ControlledTextField";
import ControlledSelect from "../components/ControlledSelect";
import { Divider } from "@material-ui/core";

const ExamPool = (question, i, errors, control) => {
  const [questions, setQuestions] = useState([]);

  switch (question.question.type) {
    case "multichoice":
      for (let i = 0; i < question.question.noitems; i++) {
        const questionItem = (
          <div key={i}>
            <ControlledTextField
              name={`Question ${i}`}
              label={`Question ${i}`}
              error={errors}
              control={control}
              required={true}
            />
            <ControlledTextField
              name={`c1`}
              label={`Choice 1`}
              error={errors}
              control={control}
              required={true}
            />
            <ControlledTextField
              name={`c2`}
              label={`Choice 2`}
              error={errors}
              control={control}
              required={true}
            />
            <ControlledTextField
              name={`c3`}
              label={`Choice 3`}
              error={errors}
              control={control}
              required={true}
            />
            <ControlledTextField
              name={`c4`}
              label={`Choice 4`}
              error={errors}
              control={control}
              required={true}
            />
            <ControlledSelect
              name={`answer`}
              label={`Answer`}
              error={errors}
              control={control}
              required={true}
              menu={["A", "B", "C", "D"]}
            />
            <Divider />
          </div>
        );
        setQuestions([...questions, questionItem]);
      }

      break;

    case "trueorfalse":
      return <div>True or False</div>;

    case "identification":
      return <div>Identification</div>;

    default:
      return <div>Nothing</div>;
  }
};

export default ExamPool;
