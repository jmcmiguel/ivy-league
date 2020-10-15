import React from "react";
import { FormControl, TextField, FormHelperText } from "@material-ui/core";
import { Controller } from "react-hook-form";

const ControlledTextField = ({ name, error, label, control, rules }) => {
  return (
    <FormControl style={{ minWidth: "100%" }} error={Boolean(error[name])}>
      <Controller
        as={
          <TextField
            required
            name={name}
            label={label}
            fullWidth
            error={Boolean(error[name])}
          />
        }
        name={name}
        defaultValue={""}
        control={control}
        rules={rules}
      />
      <FormHelperText>{error[name] && error[name].message}</FormHelperText>
    </FormControl>
  );
};

export default ControlledTextField;
