import React from "react";
import { useForm } from "react-hook-form";
import ControlledTextField from "../components/ControlledTextField";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@material-ui/core";

const JoinClassDialog = ({ open, setOpen, handleAdd }) => {
  const { handleSubmit, errors, control } = useForm();

  const onSubmit = form => {
    handleAdd(form.classCode);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="form-dialog-title">Join a Class</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To enroll in a class, ask your professor for a classcode
          </DialogContentText>
          <Grid container spacing={2}>
            {/* Class Code */}
            <Grid item xs={12}>
              <ControlledTextField
                autoFocus={true}
                name="classCode"
                label="Class Code"
                variant="standard"
                error={errors}
                control={control}
                required={true}
                rules={{ required: "this is required" }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Join
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default JoinClassDialog;
