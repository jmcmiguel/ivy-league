import React, { useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Copyright from "../components/Copyright";
import { Link as BrowserLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import ControlledTextField from "../components/ControlledTextField";
import users from "../server/services/users";
import MuiAlert from "@material-ui/lab/Alert";
import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  Box,
  Typography,
  Container,
  makeStyles,
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const { control, handleSubmit, errors, reset } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const onSubmit = formData => {
    users
      .signin(formData)
      .then(returnedData => {
        console.log("returnedData :>> ", returnedData);
        if (returnedData.success) {
          reset();
          localStorage.setItem("jwtCookie", returnedData.token);
          localStorage.setItem("email", returnedData.email);
          localStorage.setItem("isTeacher", returnedData.isTeacher);
          localStorage.setItem("lastName", returnedData.lastName);
          setSnackbarSeverity("success");
          setSnackbarMessage("Sign in Success");
          setOpenSnackbar(!openSnackbar);
          window.location.replace("/");
        } else {
          reset();
          setSnackbarSeverity("error");
          setSnackbarMessage("Invalid Credentials");
          setOpenSnackbar(!openSnackbar);
        }
      })
      .catch(error => {
        console.log("Error :>> ", error);
      });
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
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ControlledTextField
                name="email"
                label="Email Address"
                required={true}
                error={errors}
                control={control}
              />
            </Grid>
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
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <BrowserLink
                to="forgotpassword"
                style={{ textDecoration: "inherit" }}>
                Forgot password?
              </BrowserLink>
            </Grid>
            <Grid item>
              <BrowserLink to="/signup" style={{ textDecoration: "inherit" }}>
                Don't have an account? Sign Up
              </BrowserLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignIn;
