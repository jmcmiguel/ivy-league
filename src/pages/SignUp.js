import React, { useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Copyright from "../components/Copyright";
import { Link as RouterLink } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import users from "../services/users";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  makeStyles,
  Container,
  InputAdornment,
  IconButton,
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
  const { control, handleSubmit, register } = useForm();
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
  // const [firstNameError, setFirstNameError] = useState(false);

  const onSubmit = formData => {
    users
      .signup(formData)
      .then(returnedData => {
        console.log("User signed up succesfully");
      })
      .catch(error => {
        console.log("Error: ", error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
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
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstName"
                as={
                  <TextField
                    id="firstName"
                    fullWidth
                    variant="outlined"
                    autoComplete="fname"
                    label="First Name"
                    placeholder="First Name"
                    required
                    autoFocus
                    // error={firstNameError}
                    // helperText={firstNameError ? "error" : null}
                  />
                }
                defaultValue={""}
                control={control}
                inputRef={register()}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                as={TextField}
                control={control}
                defaultValue={""}
                variant="outlined"
                fullWidth
                id="middleName"
                label="Middle Name"
                name="middleName"
                autoComplete="mname"
                placeholder="Middle Name"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                as={TextField}
                control={control}
                defaultValue={""}
                variant="outlined"
                fullWidth
                required
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                placeholder="Last Name"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                as={TextField}
                control={control}
                defaultValue={""}
                variant="outlined"
                fullWidth
                required
                id="studentNumber"
                label="ID Number"
                name="studentNumber"
                autoComplete="id"
                placeholder="19-00000"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                as={TextField}
                control={control}
                defaultValue={""}
                variant="outlined"
                required
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                autoComplete="email"
                placeholder="name@email.com"
                inputRef={register()}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                as={TextField}
                control={control}
                defaultValue={""}
                variant="outlined"
                fullWidth
                id="contactNumber"
                label="Contact Number"
                name="contactNumber"
                autoComplete="contact"
                placeholder="09xxxxxxxxx"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                as={TextField}
                control={control}
                defaultValue={""}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
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
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                as={TextField}
                control={control}
                defaultValue={""}
                variant="outlined"
                required
                fullWidth
                name="repassword"
                label="Retype Password"
                id="repassword"
                autoComplete="re-password"
                type={showRePassword ? "text" : "password"}
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
                inputRef={register}
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
                inputRef={register}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Sign Up
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
