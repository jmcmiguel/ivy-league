import React from "react";
import { FormControl, TextField, FormHelperText } from "@material-ui/core";
import { Controller } from "react-hook-form";

const ControlledTextField = ({
  name,
  error,
  label,
  control,
  rules = null,
  variant = "outlined",
  required = false,
  type = "text",
  InputProps = null,
}) => {
  return (
    <FormControl style={{ minWidth: "100%" }} error={Boolean(error[name])}>
      <Controller
        as={
          <TextField
            type={type}
            required={required}
            name={name}
            label={label}
            fullWidth
            variant={variant}
            error={Boolean(error[name])}
            InputProps={InputProps}
          />
        }
        name={name}
        defaultValue={""}
        control={control}
        rules={required ? { required: `${label} is required` } : null}
      />
      <FormHelperText>{error[name] && error[name].message}</FormHelperText>
    </FormControl>
  );
};

export default ControlledTextField;
