import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useStylesForgotPassword from "../components/styles/useStylesForgotPassword";
import ControlledTextField from "../components/ControlledTextField";
import ControlledSelect from "./ControlledSelect";
import { Grid, Button, Typography } from "@material-ui/core";
import Section from "../services/classes";
import ControlledDateTimePicker from "../components/ControlledDateTimePicker";
import DateAdd from "date-fns/add";
import DateSub from "date-fns/sub";
import IsAfter from "date-fns/isAfter";
import formatISO from "date-fns/formatISO";
import { v4 as uuidv4 } from "uuid";

const ForgotPasswordForm = ({ submitExamDetails, handleNext }) => {
  const { handleSubmit, errors, control } = useForm();
  const classes = useStylesForgotPassword();
  const [sections, setSections] = useState([]);
  const [selectedDateSched, setSelectedDateSched] = useState(
    DateAdd(new Date(), { days: 1 })
  );
  const [selectedDateDeadline, setSelectedDateDeadline] = useState(
    DateAdd(new Date(), { days: 1, hours: 1, minutes: 30 })
  );

  const handleDateChangeSched = sched => {
    setSelectedDateSched(sched);
    setSelectedDateDeadline(DateAdd(sched, { hours: 1, minutes: 30 }));
  };

  const handleDateChangeDeadline = deadline => {
    if (IsAfter(selectedDateSched, deadline)) {
      setSelectedDateDeadline(deadline);
      setSelectedDateSched(DateSub(deadline, { hours: 1, minutes: 30 }));
    } else {
      setSelectedDateDeadline(deadline);
    }
  };

  const submitHandle = formData => {
    formData.sched = formatISO(selectedDateSched);
    formData.deadline = formatISO(selectedDateDeadline);
    formData.uuid = uuidv4();

    submitExamDetails(formData);
    handleNext();
  };

  useEffect(() => {
    Section.getAllProfClasses(localStorage.getItem("email"))
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
        onSubmit={handleSubmit(submitHandle)}>
        <Typography variant="h6" gutterBottom>
          Basic Exam Details
        </Typography>
        <Grid container spacing={3}>
          {/* Exam name */}
          <Grid item xs={12}>
            <ControlledTextField
              name="examName"
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
              name="examDesc"
              label="Exam Description"
              error={errors}
              control={control}
              required={true}
              multiline={true}
              rows={3}
              rules={{ required: "this is required" }}
            />
          </Grid>

          {/* Section */}
          <Grid item xs={12}>
            <ControlledSelect
              name="classCode"
              error={errors}
              control={control}
              label="Class"
              menu={sections}
            />
          </Grid>

          {/* Exam Date */}
          <Grid item xs={12}>
            <ControlledDateTimePicker
              selectedDate={selectedDateSched}
              handleDateChange={handleDateChangeSched}
              name="sched"
              error={errors}
              control={control}
              label="Start of Examination"
              maxDate={DateAdd(new Date(), { months: 6 })}
            />
          </Grid>

          {/* Exam Deadline */}
          <Grid item xs={12}>
            <ControlledDateTimePicker
              selectedDate={selectedDateDeadline}
              handleDateChange={handleDateChangeDeadline}
              name="deadline"
              error={errors}
              control={control}
              label="Deadline of Examination"
              openTo="hours"
              maxDate={DateAdd(new Date(), { months: 6 })}
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
