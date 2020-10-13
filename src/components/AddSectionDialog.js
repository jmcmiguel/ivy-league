import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useForm, Controller } from "react-hook-form";

const AddSectionDialog = ({ open, setOpen, handleAdd }) => {
  const { handleSubmit, control } = useForm();

  const onSubmit = form => {
    handleAdd(form.subject, form.section, form.studentCount, form.desc);
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
          <Controller
            as={TextField}
            control={control}
            defaultValue=""
            name="subject"
            autoFocus
            margin="dense"
            id="subject"
            label="Subject"
            type="text"
            placeholder="ITNW-1X3X"
            fullWidth
          />
          <Controller
            as={TextField}
            control={control}
            defaultValue=""
            name="section"
            margin="dense"
            id="section"
            label="Section"
            type="text"
            placeholder="NW3G"
            fullWidth
          />
          <Controller
            as={TextField}
            control={control}
            defaultValue=""
            name="studentCount"
            margin="dense"
            id="studentCount"
            label="Number of Students"
            type="number"
            fullWidth
          />
          <Controller
            as={TextField}
            control={control}
            defaultValue=""
            name="desc"
            margin="dense"
            id="desc"
            label="Subject Name"
            type="text"
            fullWidth
          />
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
