import React from "react";
import useStylesForgotPassword from "../components/styles/useStylesForgotPassword";
import { useForm, Controller } from "react-hook-form";
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
            <FormControl
              style={{ minWidth: "100%" }}
              error={Boolean(errors.examname)}>
              <Controller
                as={
                  <TextField
                    required
                    name="examname"
                    label="Exam Name"
                    fullWidth
                    error={Boolean(errors.examname)}
                  />
                }
                name="examname"
                defaultValue={""}
                control={control}
                rules={{ required: "this is required" }}
              />
              <FormHelperText>
                {errors.examname && errors.examname.message}
              </FormHelperText>
            </FormControl>
          </Grid>

          {/* Sample text */}
          <Grid item xs={12}>
            <FormControl
              style={{ minWidth: "100%" }}
              error={Boolean(errors.sampletext)}>
              <Controller
                as={
                  <TextField
                    required
                    name="sampletext"
                    label="sample text"
                    fullWidth
                    error={Boolean(errors.sampletext)}
                  />
                }
                name="sampletext"
                defaultValue={""}
                control={control}
                rules={{ required: "this is required" }}
              />
              <FormHelperText>
                {errors.sampletext && errors.sampletext.message}
              </FormHelperText>
            </FormControl>
          </Grid>

          {/* Section */}
          <Grid item xs={12}>
            <FormControl
              style={{ minWidth: "100%" }}
              error={Boolean(errors.section)}>
              <InputLabel id="sectionLabel">Section</InputLabel>
              <Controller
                as={
                  <Select>
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="simple">
                      Simple Words only (3-5 characters)
                    </MenuItem>
                    <MenuItem value="medium">
                      Medium Words only (5-8 characters)
                    </MenuItem>
                    <MenuItem value="complex">
                      Complex Words only (8+ characters)
                    </MenuItem>
                    <MenuItem value="allwords">
                      Randomly Select Words all across
                    </MenuItem>
                  </Select>
                }
                name="section"
                rules={{ required: "this is required" }}
                control={control}
                defaultValue=""
              />
              <FormHelperText>
                {errors.section && errors.section.message}
              </FormHelperText>
            </FormControl>
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
