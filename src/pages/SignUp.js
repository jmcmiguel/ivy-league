import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../components/Copyright";
import { Link as RouterLink } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

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
  const { control, handleSubmit } = useForm();
  const [isTeacher, setIsTeacher] = useState(false);
  const handleCheckboxChange = e => {
    setIsTeacher(!isTeacher);
    return isTeacher ? false : true;
  };
  const create = newRecord => {
    const request = axios.post("http://localhost:3001/api/signup", newRecord);
    return request.then(response => response.data);
  };
  const onSubmit = form => {
    create(form).then(returnedData => {
      console.log("success", returnedData);
    });
    console.log("form :>> ", form);
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
                as={TextField}
                control={control}
                defaultValue={""}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                placeholder="First Name"
                autoFocus
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
                label="Email Address"
                name="email"
                autoComplete="email"
                placeholder="name@email.com"
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
                type="password"
                id="password"
                autoComplete="current-password"
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
                type="password"
                id="repassword"
                autoComplete="current-password"
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
