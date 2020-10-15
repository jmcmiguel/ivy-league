import React from "react";
import useStylesForgotPassword from "../components/styles/useStylesForgotPassword";
import { useForm, Controller } from "react-hook-form";
import ControlledTextField from "../components/ControlledTextField";
import {
  Grid,
  Button,
  FormControl,
  TextField,
  Select,
  MenuItem,
  Typography,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import ControlledSelect from "./ControlledSelect";

const ForgotPasswordForm = ({ submitExamDetails, handleNext }) => {
  const { handleSubmit, errors, control } = useForm();
  const classes = useStylesForgotPassword();

  const submitHandle = formData => {
    submitExamDetails(formData);
    handleNext();
  };

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
              name="examname"
              label="Exam Name"
              error={errors}
              control={control}
              rules={{ required: "this is required" }}
            />
          </Grid>

          {/* Sample text */}
          <Grid item xs={12}>
            <ControlledTextField
              name="sampletext"
              label="Sample Text"
              error={errors}
              control={control}
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
              menu={[
                { value: "NW3D", label: "ICTC-1213 (NW3D)" },
                { value: "NW4A", label: "ITNW-1413 (NW4A)" },
                { value: "NW5D", label: "FOLA-1213 (NW5D)" },
              ]}
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
