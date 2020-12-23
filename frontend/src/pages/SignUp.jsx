import React, { useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Copyright from "../components/Copyright";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import users from "../services/users";
import ControlledTextField from "../components/ControlledTextField";
import MuiAlert from "@material-ui/lab/Alert";
import {
  Avatar,
  Button,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  makeStyles,
  Container,
  InputAdornment,
  IconButton,
  Snackbar,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const { control, handleSubmit, errors, reset } = useForm();
  const [isTeacher, setIsTeacher] = useState(false);
  const handleCheckboxChange = e => {
    setIsTeacher(!isTeacher);
    return isTeacher ? false : true;
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [showRePassword, setReShowPassword] = useState(false);
  const handleClickReShowPassword = () => setReShowPassword(!showRePassword);
  const handleMouseDownRePassword = () => setReShowPassword(!showRePassword);
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  let history = useHistory();

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const onSubmit = formData => {
    if (formData.password !== formData.repassword) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Password does not match");
      setOpenSnackbar(!openSnackbar);
    } else {
      users
        .signup(formData)
        .then(returnedData => {
          if (returnedData === "email already in use") {
            setSnackbarSeverity("error");
            setSnackbarMessage("Email is already in use");
            setOpenSnackbar(!openSnackbar);
          } else {
            reset();
            setSnackbarSeverity("success");
            setSnackbarMessage("Signed up succesfully");
            setOpenSnackbar(!openSnackbar);
            setTimeout(() => {
              history.push("signin");
            }, 1000);
          }
        })
        .catch(error => {
          console.log("Error: ", error);
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}>
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* First Name */}
            <Grid item xs={12} sm={6}>
              <ControlledTextField
                name="firstName"
                label="First Name"
                required={true}
                error={errors}
                control={control}
              />
            </Grid>

            {/* Middle Name */}
            <Grid item xs={12} sm={6}>
              <ControlledTextField
                name="middleName"
                label="Middle Name"
                error={errors}
                control={control}
              />
            </Grid>

            {/* Last Name */}
            <Grid item xs={12}>
              <ControlledTextField
                name="lastName"
                label="Last Name"
                required={true}
                error={errors}
                control={control}
              />
            </Grid>

            {/* ID Number */}
            <Grid item xs={12}>
              <ControlledTextField
                name="idNumber"
                label="ID Number"
                required={true}
                error={errors}
                control={control}
              />
            </Grid>

            {/* Email Address */}
            <Grid item xs={12}>
              <ControlledTextField
                name="email"
                label="Email Address"
                required={true}
                error={errors}
                control={control}
              />
            </Grid>

            {/* Contact Number */}
            <Grid item xs={12}>
              <ControlledTextField
                name="contactNumber"
                label="Contact Number"
                error={errors}
                control={control}
              />
            </Grid>

            {/* Password */}
            <Grid item xs={12}>
              <ControlledTextField
                name="password"
                label="Password"
                required={true}
                type={showPassword ? "text" : "password"}
                error={errors}
                control={control}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Re:Password */}
            <Grid item xs={12}>
              <ControlledTextField
                name="repassword"
                label="Retype Password"
                required={true}
                type={showRePassword ? "text" : "password"}
                error={errors}
                control={control}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickReShowPassword}
                        onMouseDown={handleMouseDownRePassword}>
                        {showRePassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Controller
                    name="isTeacher"
                    defaultValue={false}
                    render={({ onChange: onCheckChange }) => {
                      return (
                        <Checkbox
                          checked={isTeacher}
                          onChange={() => onCheckChange(handleCheckboxChange())}
                        />
                      );
                    }}
                    control={control}
                  />
                }
                key={"isTeacher"}
                label={"Sign up as teacher?"}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Sign in
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <RouterLink to="/signin" style={{ textDecoration: "inherit" }}>
                Already have an account? Sign in
              </RouterLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignUp;
