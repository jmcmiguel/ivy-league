import React from "react";
import { FormControl, TextField, FormHelperText } from "@material-ui/core";
import { Controller } from "react-hook-form";

const ControlledTextField = ({
  name,
  error,
  label,
  control,
  rules,
  variant = "outlined",
  required = false,
  type = "text",
  InputProps = null,
  multiline = false,
  rows = null,
  autoFocus = null,
}) => {
  return (
    <FormControl style={{ minWidth: "100%" }} error={Boolean(error[name])}>
      <Controller
        as={
          <TextField
            autoFocus={autoFocus}
            type={type}
            required={required}
            name={name}
            label={label}
            fullWidth
            variant={variant}
            error={Boolean(error[name])}
            InputProps={InputProps}
            multiline={multiline}
            rows={rows}
          />
        }
        name={name}
        defaultValue={""}
        control={control}
        rules={required ? { required: `${label} is required` } : {}}
      />
      <FormHelperText>{error[name] && error[name].message}</FormHelperText>
    </FormControl>
  );
};

export default ControlledTextField;
