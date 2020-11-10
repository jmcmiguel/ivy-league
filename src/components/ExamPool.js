import React from "react";
import ControlledTextField from "../components/ControlledTextField";
import ControlledSelect from "../components/ControlledSelect";

const ExamPool = (question, i, errors, control) => {
  switch (question.question.type) {
    case "multichoice":
      //   for (let index = 0; index < question.noitems; index++) {
      return (
        <div>
          {/* Question */}
          <ControlledTextField
            name={`Question ${i}`}
            label={`Question ${i}`}
            error={errors}
            control={control}
            required={true}
            rules={{ required: "this is required" }}
          />

          <ControlledTextField
            name={`c1`}
            label={`Choice 1`}
            error={errors}
            control={control}
            required={true}
            rules={{ required: "this is required" }}
          />

          <ControlledTextField
            name={`c2`}
            label={`Choice 2`}
            error={errors}
            control={control}
            required={true}
            rules={{ required: "this is required" }}
          />

          <ControlledTextField
            name={`c3`}
            label={`Choice 3`}
            error={errors}
            control={control}
            required={true}
            rules={{ required: "this is required" }}
          />

          <ControlledTextField
            name={`c4`}
            label={`Choice 4`}
            error={errors}
            control={control}
            required={true}
            rules={{ required: "this is required" }}
          />

          <ControlledSelect
            name={`answer`}
            label={`Answer`}
            error={errors}
            control={control}
            required={true}
            menu={["A", "B", "C", "D"]}
          />
        </div>
      );
      //   }
      break;

    case "trueorfalse":
      return <div>True or False</div>;
      break;

    case "identification":
      return <div>Identification</div>;
      break;

    default:
      return <div>Nothing</div>;
      break;
  }
};

export default ExamPool;
