import React from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import { Controller } from "react-hook-form";
import { FormControl, FormHelperText } from "@material-ui/core";

const ControlledDateTimePicker = ({
  selectedDate,
  handleDateChange,
  name,
  error,
  control,
  label,
  rules = {},
  maxDate = null,
  disableFuture = false,
  openTo = "date",
}) => {
  return (
    <FormControl style={{ width: "100%" }} error={Boolean(error[name])}>
      <Controller
        as={
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              name={name}
              label={label}
              value={selectedDate}
              onChange={handleDateChange}
              maxDate={maxDate}
              inputVariant="outlined"
              showTodayButton
              disablePast
              disableFuture={disableFuture}
              openTo={openTo}
            />
          </MuiPickersUtilsProvider>
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

export default ControlledDateTimePicker;
