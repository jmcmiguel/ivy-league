import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import { Controller } from "react-hook-form";

const ControlledSelect = ({
  error,
  control,
  name,
  label,
  menu,
  variant = "outlined",
}) => {
  return (
    <FormControl
      style={{ minWidth: "100%" }}
      error={Boolean(error[name])}
      variant={variant}>
      <InputLabel id={`${name}Label`}>{label}</InputLabel>
      <Controller
        as={
          <Select>
            <MenuItem value="">None</MenuItem>
            {menu.map((menu, i) => {
              return (
                <MenuItem key={i} value={menu.value}>
                  {menu.label}
                </MenuItem>
              );
            })}
          </Select>
        }
        name={name}
        rules={{ required: "this is required" }}
        control={control}
        defaultValue=""
      />
      <FormHelperText>{error[name] && error[name].message}</FormHelperText>
    </FormControl>
  );
};

export default ControlledSelect;
