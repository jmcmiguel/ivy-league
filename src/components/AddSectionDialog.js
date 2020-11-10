import React from "react";
import { useForm, Controller } from "react-hook-form";
import ControlledTextField from "../components/ControlledTextField";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@material-ui/core";

const shortid = require("shortid");

const AddSectionDialog = ({ open, setOpen, handleAdd }) => {
  const { handleSubmit, errors, control } = useForm();

  const onSubmit = form => {
    handleAdd(
      form.subject.toUpperCase(),
      form.section.toUpperCase(),
      form.studentCount,
      form.desc.toUpperCase(),
      shortid.generate(),
      (form.image = `https://picsum.photos/seed/${form.subject}${form.section}/166/244`)
    );
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
        <DialogTitle id="form-dialog-title">Create new section</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new section, please enter the subject, section and
            amount of students
          </DialogContentText>

          {/* Course Code */}
          <Grid item xs={12}>
            <ControlledTextField
              name="subject"
              label="Course Code"
              variant="standard"
              error={errors}
              control={control}
              required={true}
              rules={{ required: "this is required" }}
            />
          </Grid>

          {/* Course Name */}
          <Grid item xs={12}>
            <ControlledTextField
              name="desc"
              label="Course Name"
              variant="standard"
              error={errors}
              control={control}
              required={true}
              rules={{ required: "this is required" }}
            />
          </Grid>

          {/* Section */}
          <Grid item xs={12}>
            <ControlledTextField
              name="section"
              label="Section"
              variant="standard"
              error={errors}
              control={control}
              required={true}
              rules={{ required: "this is required" }}
            />
          </Grid>

          {/* Max Students */}
          <Grid item xs={12}>
            <ControlledTextField
              name="studentCount"
              label="Max students allowed"
              variant="standard"
              type="number"
              error={errors}
              control={control}
              required={true}
              rules={{ required: "this is required" }}
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddSectionDialog;
