import React, { useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Copyright from "../components/Copyright";
import { Link as BrowserLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import ControlledTextField from "../components/ControlledTextField";
import users from "../services/users";
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
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { GoogleLogin } from "react-google-login";

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

const backdropUseStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
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

  const backdropClasses = backdropUseStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const onSubmit = formData => {
    setOpen(!open);
    users
      .signin(formData)
      .then(returnedData => {
        if (returnedData.success) {
          reset({ email: "", password: "" });
          localStorage.setItem("jwtCookie", returnedData.token);
          localStorage.setItem("email", returnedData.email);
          localStorage.setItem("isTeacher", returnedData.isTeacher);
          localStorage.setItem("lastName", returnedData.lastName);
          window.location.replace("/");
        } else {
          handleClose();
          reset({ email: "", password: "" });
          setSnackbarSeverity("error");
          setSnackbarMessage("Invalid Credentials");
          setOpenSnackbar(!openSnackbar);
        }
      })
      .catch(error => {
        console.log("Error :>> ", error);
      });
  };

  const onSuccess = res => {
    console.log(`[Login Success] Current User: ${res.profileObj}`);
  };

  const onFailure = res => {
    console.log(`[Login Failed] ${res}`);
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

      <Backdrop
        className={backdropClasses.backdrop}
        open={open}
        onClick={handleClose}>
        <CircularProgress color="secondary" />
      </Backdrop>

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

          {/* Google Sign-in */}
          <GoogleLogin
            clientId="551384499965-sq5c2de5hccm99ovllhr3ecob6d39o2h.apps.googleusercontent.com"
            buttonText="Sign in with Google"
            render={renderProps => (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                style={{ marginTop: "0" }}>
                Sign in with Google
              </Button>
            )}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
          />

          <Grid container>
            {/* Forgot Password */}
            <Grid item xs>
              <BrowserLink
                to="forgotpassword"
                style={{ textDecoration: "inherit" }}>
                Forgot password?
              </BrowserLink>
            </Grid>

            {/* Sign up */}
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
