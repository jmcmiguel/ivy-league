import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useStylesForgotPassword from "../components/styles/useStylesForgotPassword";
import ControlledTextField from "../components/ControlledTextField";
import ControlledSelect from "./ControlledSelect";
import { Grid, Button, Typography } from "@material-ui/core";
import Section from "../server/services/sections";
import ControlledDateTimePicker from "../components/ControlledDateTimePicker";

const ForgotPasswordForm = ({ submitExamDetails, handleNext }) => {
  const { handleSubmit, errors, control } = useForm();
  const classes = useStylesForgotPassword();
  const [sections, setSections] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [examDuration, setExamDuration] = useState(0);

  const getExamDuration = formData => {
    setExamDuration(formData.examDuration);
  };

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const submitHandle = formData => {
    formData.schedule = selectedDate;
    submitExamDetails(formData);
    handleNext();
  };

  useEffect(() => {
    Section.getAllSection()
      .then(returnedData => {
        setSections(returnedData);
      })
      .catch(error => {
        console.log("Error :>> ", error);
      });
  }, []);

  return (
    <React.Fragment>
      <form
        className={classes.form}
        noValidate
        onSubmit={handleSubmit(submitHandle)}
        onChange={handleSubmit(getExamDuration)}>
        <Typography variant="h6" gutterBottom>
          Basic Exam Details
        </Typography>
        <Grid container spacing={3}>
          {/* Exam name */}
          <Grid item xs={12}>
            <ControlledTextField
              name="examname"
              label="Exam Name"
              error={errors}
              control={control}
              required={true}
              rules={{ required: "this is required" }}
            />
          </Grid>

          {/* Exam description */}
          <Grid item xs={12}>
            <ControlledTextField
              name="examdesc"
              label="Exam Description"
              error={errors}
              control={control}
              required={true}
              rules={{ required: "this is required" }}
            />
          </Grid>

          {/* Section */}
          <Grid item xs={12}>
            <ControlledSelect
              name="section"
              error={errors}
              control={control}
              label="Section"
              menu={sections}
            />
          </Grid>

          {/* Exam Date */}
          <Grid item xs={12}>
            <ControlledDateTimePicker
              selectedDate={selectedDate}
              handleDateChange={handleDateChange}
              name="schedule"
              error={errors}
              control={control}
              label="Start of Examination"
            />
          </Grid>

          {/* Exam Duration */}
          <Grid item xs={12}>
            <ControlledTextField
              name="examDuration"
              label="Exam Duration (in minutes)"
              error={errors}
              control={control}
              required={true}
              rules={{ required: "this is required" }}
              type="number"
            />
          </Grid>
        </Grid>
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

export default ForgotPasswordForm;
