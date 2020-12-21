import React from "react";
import {
  FormControl,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { Controller } from "react-hook-form";

const ControlledRadioButton = ({
  error,
  control,
  name,
  label,
  required = false,
  choices,
}) => {
  const [value, setValue] = React.useState("a");

  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <FormControl error={Boolean(error[name])} component="fieldset">
      {/* <FormLabel id={`${name}Label`}>{label}</FormLabel> */}
      <Controller
        as={
          <RadioGroup required={required} value={value} onChange={handleChange}>
            {choices.map((choice, i) => {
              return (
                <FormControlLabel
                  key={i}
                  value={choice.value}
                  label={choice.label}
                  control={<Radio />}
                />
              );
            })}
          </RadioGroup>
        }
        name={name}
        rules={{ required: `${label} is required` }}
        control={control}
        defaultValue=""
      />
      <FormHelperText>{error[name] && error[name].message}</FormHelperText>
    </FormControl>
  );
};

export default ControlledRadioButton;
